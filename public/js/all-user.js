$(function () {
   const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   var birthDate = new Date();
   var dd = String(birthDate.getDate()).padStart(2, "0");
   // var mm = monthNames[birthDate.getMonth()]; //January is 0!
   var mm = String(birthDate.getMonth() + 1).padStart(2, "0"); //January is 0!
   var yyyy = birthDate.getFullYear();

   let dataTable = $("#allUserViewTable").DataTable({
      destroy: true,
      scrollX: true,
      searching: false,
   });

   //hide some columns
   dataTable.columns(1).visible(false);
   dataTable.columns(8).visible(false);

   $("#formAddUser").validate({
      rules: {
         txtFName: "required",
         txtLName: "required",
         txtEmail: {
            required: true,
            email: true,
         },
         txtmobileNo: {
            required: true,
            minlength: 10,
            maxlength: 10,
         },
         password: {
            required: true,
            minlength: 6,
         },
         confirmPassword: {
            equalTo: "#password",
         },
      },
      messages: {
         txtFName: " Enter First Name",
         txtLName: " Enter Last Name",
         txtEmail: " Enter Valid Email Address!",
         txtmobileNo: "Check your phone number again",
         password: " Enter Password",
         confirmPassword: " Enter Confirm Password Same as Password",
         userRole: {
            required: "Please select an option from the list!",
         },
         userBloodGroup: {
            required: "Please select an option from the list!",
         },
         userGender: {
            required: "Please select an option from the list!",
         },
      },
   });

   $("#formAddUser").ready(function () {
      $(document).on("click", "#btnRegister", () => {
         birthDate = yyyy + "-" + mm + "-" + dd;

         if ($("#formAddUser").valid()) {
            console.log("press");
            var auth = firebase.auth();

            var fName = $("#txtFName").val();
            var lName = $("#txtLName").val();
            var email = $("#txtEmail").val();
            var passsword = $("#password").val();
            var userRole = $("#userRole").val();
            var bloodGroup = $("#userBloodGroup").val();
            var gender = $("#userGender").val();
            var mobileNo = $("#txtmobileNo").val();
            var proPicUrl =
               "https://firebasestorage.googleapis.com/v0/b/final-year-project-a89ff.appspot.com/o/profile_picture%2Fblank_proPic.jpg?alt=media&token=b42aaeec-4118-4b8c-abe2-6636a347003e";
            birthDate = yyyy + "-" + mm + "-" + dd;

            let userData = {
               bloodGroup: bloodGroup,
               disabled: false,
               email: email,
               address: "",
               passsword: passsword,
               firstName: fName,
               lastName: lName,
               gender: gender,
               mobileNo: mobileNo,
               userRole: userRole,
               proPicUrl: proPicUrl,
               birthDate: birthDate,
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
                     url: "/api/add-admin-user",
                     data: JSON.stringify(userData),
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: function (data) {
                        console.log(data.code);

                        if (data.code != 200) {
                           Swal.fire(
                              "User Created!",
                              "The email address is already in use by another account",
                              "error"
                           );
                        } else {
                           auth.sendPasswordResetEmail(email).then(function () {
                              // Email sent.
                              Swal.fire(
                                 "User Created!",
                                 "User will get an password resend email",
                                 "success"
                              );
                           });
                        }
                     },
                     error: function (error) {
                        Swal.fire(
                           "User Created!",
                           "The user creating failed!",
                           "error"
                        );
                        console.log(error);
                     },
                  });
               }
               $("#formAddUser").trigger("reset");
            });
         }
      });
   });

   //clear once form is submitted
   $("#formAddUser").ready(function () {
      $(document).on("click", "#btnClear", () => {
         $("#formAddUser").trigger("reset");
      });
   });

   //call the function that that add data to the rows
   dataAdd();

   function dataAdd() {
      usersRef.onSnapshot(function (querySnapshot) {
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

   $("#allUserViewTable tbody").on("click", ".btnDelete", function () {
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

   $("#select").change(function () {
      var option = $(this).find("option:selected");
      window.location.href = option.data("url");
   });
});
