$(function () {
   let dataTable = $("#usersViewTable").DataTable({
      destroy: true,
      scrollX: true,
      searching: true,
   });
   //hide some columns
   dataTable.columns(1).visible(false);
   dataTable.columns(8).visible(false);

   //call the function that that add data to the rows
   dataAdd();

   function dataAdd() {
      usersRef
         .where("userRole", "==", "User")
         .onSnapshot(function (querySnapshot) {
            dataTable.clear().draw();
            let rowCount = 1;

            querySnapshot.forEach(function (doc) {
               let data = doc.data();
               let btnDisable;

               if (data.disabled) {
                  //To enable it again (disable = false)
                  btnDisable =
                     '<button id="uid"' +
                     data.uid +
                     '" type="button" class="btn btn-success btnDelete">Enable</button>';
               } else {
                  btnDisable =
                     '<button id=""' +
                     data.uid +
                     '" type="button" class="btn btn-danger btnDelete">Disable</button>';
               }

               dataTable.row
                  .add([
                     rowCount++,
                     data.uid,
                     data.firstName + " " + data.lastName,
                     data.email,
                     data.userRole,
                     data.address,
                     data.bloodGroup,
                     data.mobileNo,
                     data.disabled,
                     '<div class="buttons" id="btn-group"  role="group">' +
                        btnDisable +
                        "</div>",
                  ])
                  .draw();
            });
         });
   }

   $("#usersViewTable tbody").on("click", ".btnDelete", function () {
      console.log("press");
      var data = dataTable.row($(this).parents("tr")).data();
      var uid = data[1];
      var disabled = data[8];

      let userData = {
         uid: uid,
         disabled: disabled,
      };
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
            $.ajax({
               type: "POST",
               url: "/api/disabled",
               data: JSON.stringify(userData),
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (data) {
                  Swal.fire(
                     "User Updated!",
                     "Your file has been Updated.",
                     "success"
                  );
               },
               error: function () {
                  Swal.fire(
                     "User Updated!",
                     "The user updated failed!",
                     "error"
                  );
                  console.log("error");
               },
            });
         }
      });
   });

   //selection dropdown
   $("#adminSelect").change(function () {
      var option = $(this).find("option:selected");
      window.location.href = option.data("url");
   });
});
