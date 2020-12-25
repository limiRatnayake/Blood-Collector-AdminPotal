$(function () {
   const today = new Date();
   const tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);

   let reqEventViewTable = $("#ReqEventViewTable").DataTable({
      destroy: true,
      scrollX: true,
      searching: false,
   });

   //hide some columns
   reqEventViewTable.columns(1).visible(false);
   reqEventViewTable.columns(2).visible(false);
   //    reqEventViewTable.columns(15).visible(false);
   // reqEventViewTable.columns(16).visible(false);

   eventsRef.onSnapshot(function (querySnapshot) {
      reqEventViewTable.clear().draw();
      let rowCount = 1;
      let approvedValue;
      querySnapshot.forEach(function (doc) {
         let data = doc.data();

         // If the category is campaign don't display data
         if (data.category == "campaign") {
            return false;
         }

         if (data.approved == false) {
            approvedValue = "No";
         } else {
            approvedValue = "Yes";
         }
         var date = data.requestClose.toDate();
         var dateString = moment(date).format("YYYY-MM-DD");

         reqEventViewTable.row
            .add([
               rowCount++,
               data.docRef,
               data.uid,
               data.bloodGroup,
               data.replacementAvailability,
               data.unitsOfBlood,
               dateString,
               data.hospitalName,
               data.hospitalAddress,
               data.hospitalLat,
               data.hospitalLng,
               data.userFName + " " + data.userLName,
               data.userPhoneNumber,
               data.notifyState,
               data.description,
               '<a data-fancybox="gallery" href="' +
                  data.imageUrl +
                  '"><img src="' +
                  data.imageUrl +
                  '" height="42"></a>',
               approvedValue,
               data.rejectReason,
               '<button type="button" class="btn btn-outline-success btn-sm btnApprove" id="btnApprove">Approve</button>' +
                  "   " +
                  '<button type="button" class="btn btn-outline-danger btn-sm btnReject">Reject</button>' +
                  "</div>",
            ])
            .draw();
      });
   });

   //toast a messae when its approved or rejected
   const Toast = Swal.mixin({
      toast: true,
      type: "success",
      position: "top-right",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
   });

   $("#ReqEventViewTable tbody").on("click", ".btnApprove", function () {
      var data = reqEventViewTable.row($(this).parents("tr")).data();
      var docRef = data[1];
      var uid = data[2];
      var bloodGroup = data[3];
      var hospitalName = data[7];
      var notifyState = data[13];
      var approved = data[16];
      var rejectedReason = data[17];

      if (approved == false && rejectedReason == "None") {
         Swal.fire({
            title: "Are you sure?",
            text: "You can always change your mind later!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            allowOutsideClick: false,
         }).then((result) => {
            if (result.value) {
               eventsRef.doc(docRef).update({
                  approved: true,
                  // rejectReason: ""
               });

               //    db.collection("notifications").add({
               //       notificationId: id,
               //       uid: uid,
               //       docRef: docRef,
               //       message: "Requesting" + bloodGroup + "in" + hospitalName,
               //       bloodGroup: bloodGroup,
               //       createdAt: today,
               //       closeOn: tomorrow,
               //    });
               const notificationRef = db.collection("notifications").doc();
               if (notifyState == true) {
                  notificationRef.set({
                     notificationId: notificationRef.id,
                     uid: uid,
                     docRef: docRef,
                     message:
                        "Your blood type" +
                        " " +
                        bloodGroup +
                        "  is urgently needed",
                     hospitalName: hospitalName,
                     bloodGroup: bloodGroup,
                     createdAt: today,
                     closeOn: tomorrow,
                  });
               }

               Toast.fire({
                  icon: "success",
                  title: "Event is Approved!",
               });
            }
         });
      } else if (approved == true) {
         Swal.fire("Approved!", "It's already been Approved !", "info");
      } else {
         Swal.fire("Rejected!", "It's already been rejected !", "warning");
      }
   });

   $("#ReqEventViewTable tbody").on("click", ".btnReject", function () {
      console.log("press");
      var data = reqEventViewTable.row($(this).parents("tr")).data();
      var docRef = data[1];
      var approved = data[16];
      var rejectedReason = data[17];

      if (rejectedReason == "None") {
         Swal.fire({
            title: "Tell us why you are rejecting!?",
            // text: "Tell us why you are rejecting!",
            input: "text",
            inputAttributes: {
               autocapitalize: "off",
               maxlength: 50,
            },
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            allowOutsideClick: false,
            preConfirm: (response) => {
               if (response == "") {
                  Swal.showValidationMessage(
                     `Request failed: Feild should not be empty`
                  );
               }
            },
         }).then((result) => {
            if (result.value) {
               var value = result.value;
               eventsRef.doc(docRef).update({
                  rejectReason: value,
                  approved: !approved,
               });
               Toast.fire({
                  icon: "success",
                  title: "Event is Rejected!",
               });
            }
         });
      } else {
         Swal.fire("Rejected!", "It's already been Rejected!", "error");
      }
   });
});
