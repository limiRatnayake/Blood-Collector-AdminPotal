$(function () {
   $(document).ready(function () {
      $("#addClusterBankBtn").click(function () {
         $("#bloodBankModal").modal({});
      });
   });

   let dataTable = $("#hospitalViewTable").DataTable({
      destroy: true,
      scrollX: true,
      searching: true,
   });

   dataTable.columns(1).visible(false);

   $("#formAddBloodBank").validate({
      errorClass: "errors",
      rules: {
         txtBloodBankName: "required",
         txtBloodBankAddress: "required",
         txtDescription: "required",
         hospitalLatitude: "required",
         hospitalLongitude: "required",
      },
      messages: {
         txtBloodBankName: " Enter Blood Bank Name",
         txtBloodBankAddress: " Enter Blood Bank Address",
         hospitalLatitude: " Enter the Latitude value",
         hospitalLongitude: " Enter the Longitude value",
      },
   });
   $("#formEditBloodBank").validate({
      errorClass: "errors",
      rules: {
         editTxtBloodBankName: "required",
         editTxtBloodBankAddress: "required",
         editTxtDescription: "required",
         editHospitalLatitude: "required",
         editHospitalLongitude: "required",
      },
      messages: {
         editTxtBloodBankName: " Enter Blood Bank Name",
         editTxtBloodBankAddress: " Enter Blood Bank Address",
         editTxtDescription: " Enter description",
         editHospitalLatitude: " Enter Latitude",
         editHospitalLongitude: " Enter Longitude",
      },
   });

   $("#formAddBloodBank").ready(function () {
      $(document).on("click", "#btnSaveDetails", () => {
         if ($("#formAddBloodBank").valid()) {
            console.log("success!!");

            var bloodBankName = $("#txtBloodBankName").val();
            console.log(bloodBankName);
            var bloodBankAddress = $("#txtBloodBankAddress").val();
            var description = $("#txtDescription").val();
            var hospitalLatitude = $("#hospitalLatitude").val();
            var hospitalLongitude = $("#hospitalLongitude").val();

            var hospitalRef = db.collection(COLLECTION_HOSPITALS).doc();
            hospitalRef
               .set({
                  bloodBankId: hospitalRef.id,
                  bloodBankName: bloodBankName,
                  bloodBankAddress: bloodBankAddress,
                  description: description,
                  hospitalLatitude: hospitalLatitude,
                  hospitalLongitude: hospitalLongitude,
               })
               .then(function (docRef) {
                  Swal.fire(
                     "Hospital Details Added!",
                     "Your file has been uploaded.",
                     "success"
                  );
                  $("#formAddBloodBank").trigger("reset");
               })
               .catch(function (error) {
                  Swal.fire(
                     "Hospital Details Added!",
                     "Error occurred: " + error,
                     "success"
                  );
                  console.error("Error adding document: ", error);
               });
         }
      });
   });
   //clear once form is submitted
   $("#formAddBloodBank").ready(function () {
      $(document).on("click", "#btnCancel", () => {
         $("#formAddBloodBank").trigger("reset");
      });
   });

   //add hospital data to a table
   hospitalListRef.onSnapshot(function (querySnapshot) {
      dataTable.clear().draw();
      let rowCount = 1;

      querySnapshot.forEach(function (doc) {
         let data = doc.data();

         dataTable.row
            .add([
               rowCount++,
               data.bloodBankId,
               data.bloodBankName,
               data.bloodBankAddress,
               data.description,
               data.hospitalLatitude,
               data.hospitalLongitude,
               '<button type="button" class="btn btn-outline-success btn-sm btnEdit">Edit</button>' +
                  "   " +
                  '<button type="button" class="btn btn-outline-danger btn-sm btnDelete">Delete</button>' +
                  "</div>",
            ])
            .draw();
      });
   });
   //toast a message when profile is updated
   const Toast = Swal.mixin({
      toast: true,
      type: "success",
      position: "top-right",
      showConfirmButton: false,
      timer: 3000,
   });
   $("#hospitalViewTable tbody").on("click", ".btnEdit", function () {
      var data = dataTable.row($(this).parents("tr")).data();
      var hospitalId = data[1];
      $("#editBloodBankModal").modal({});
      //show the previous values
      db.collection(COLLECTION_HOSPITALS)
         .where("bloodBankId", "==", hospitalId)
         .onSnapshot(
            function (querySnapshot) {
               querySnapshot.forEach(function (doc) {
                  let hospitalData = doc.data();
                  console.log(hospitalData);

                  document.getElementById("editTxtBloodBankName").value =
                     hospitalData.bloodBankName;
                  document.getElementById("editTxtBloodBankAddress").value =
                     hospitalData.bloodBankAddress;
                  document.getElementById("editTxtDescription").value =
                     hospitalData.description;
                  document.getElementById("editHospitalLatitude").value =
                     hospitalData.hospitalLatitude;
                  document.getElementById("editHospitalLongitude").value =
                     hospitalData.hospitalLongitude;
               });
            },
            function (error) {
               var errorMessage = error.message;
               window.alert("Error:" + errorMessage);
            }
         );

      // update those values
      $("#formEditBloodBank").ready(function () {
         $(document).on("click", "#editBtnSaveDetails", () => {
            var bloodBankName = $("#editTxtBloodBankName").val();
            var bloodBankAddress = $("#editTxtBloodBankAddress").val();
            var description = $("#editTxtDescription").val();
            var bloodBankLat = $("#editHospitalLatitude").val();
            var bloodBankLng = $("#editHospitalLongitude").val();

            if ($("#formEditBloodBank").valid()) {
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
                     hospitalListRef.doc(hospitalId).update({
                        bloodBankName: bloodBankName,
                        bloodBankAddress: bloodBankAddress,
                        description: description,
                        hospitalLatitude: bloodBankLat,
                        hospitalLongitude: bloodBankLng,
                     });
                     Toast.fire({
                        icon: "success",
                        title: "Your changed are updated!",
                     });
                  }
               });
            }
         });
      });
   });

   $("#hospitalViewTable tbody").on("click", ".btnDelete", function () {
      var data = dataTable.row($(this).parents("tr")).data();
      var hospitalId = data[1];

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
            hospitalListRef.doc(hospitalId).delete();
            Toast.fire({
               icon: "success",
               title: "Your changed are updated!",
            });
         }
      });
   });
});
