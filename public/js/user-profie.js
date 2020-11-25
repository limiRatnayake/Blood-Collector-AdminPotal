$(function () {
   $("#formUpdateUserInfo").validate({
      errorClass: "errors",
      rules: {
         updateFName: "required",
         updateLName: "required",
         updateAddress: {
            required: true,
         },
         // updateAddress: {
         //     required: true,
         // },
         updateMobileNo: {
            required: true,
            minlength: 10,
            maxlength: 10,
         },
      },
      messages: {
         updateFName: " Enter First Name",
         updateLName: " Enter Last Name",
         // updateAddress: " Enter Address",
         updateMobileNo: " Enter your Phone number",
         userBloodGroupUpdate: {
            required: "Please select an option from the list!",
         },
      },
   });

   $("#formUpdateUserEmail").validate({
      errorClass: "errors",
      rules: {
         newEmailAdd: {
            required: true,
            email: true,
         },
         confirmNewEmailAdd: {
            equalTo: "#newEmailAdd",
         },
         getCurrentPassword: {
            required: true,
            minlength: 6,
         },
      },
      messages: {
         newEmailAdd: " Enter Valid Email Address!",
         confirmNewEmailAdd: " Enter the same email address",
         getCurrentPassword: " Enter Password",
      },
   });

   $("#formUpdateUserPwd").validate({
      errorClass: "errors",
      rules: {
         CurrentPassword: {
            required: true,
            minlength: 6,
         },
         newPassword: {
            required: true,
            minlength: 6,
         },
         confirmNewPassword: {
            equalTo: "#newPassword",
         },
      },
      messages: {
         CurrentPassword: " Enter Your current Password",
         newPassword: "Enter a new password",
         confirmNewPassword: " Enter the same Password as before",
      },
   });

   firebase.auth().onAuthStateChanged(function (user) {
      //display user data on fields
      if (user) {
         db.collection(COLLECTION_USERS)
            .where("uid", "==", user.uid)
            .onSnapshot(
               function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                     let userData = doc.data();

                     document.getElementById("updateFName").value =
                        userData.firstName;
                     document.getElementById("updateLName").value =
                        userData.lastName;
                     document.getElementById("updateMobileNo").value =
                        userData.mobileNo;
                     // document.getElementById('updateAddress').value = userData.address;
                     document.getElementById("userBloodGroupUpdate").value =
                        userData.bloodGroup;
                  });
               },
               function (error) {
                  var errorMessage = error.message;
                  window.alert("Error:" + errorMessage);
               }
            );
         //toast a message when profile is updated
         const Toast = Swal.mixin({
            toast: true,
            type: "success",
            position: "top-right",
            showConfirmButton: false,
            timer: 3000,
         });
         // User Infor Update
         $("#formUpdateUserInfo").ready(function () {
            $(document).on("click", "#btnSaveChanges", () => {
               console.log("press");
               var fName = $("#updateFName").val();
               var lName = $("#updateLName").val();
               // var address = $("#updateAddress").val();
               var bloodGroup = $("#userBloodGroupUpdate").val();
               var mobileNo = $("#updateMobileNo").val();

               if ($("#formUpdateUserInfo").valid()) {
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
                        usersRef.doc(user.uid).update({
                           firstName: fName,
                           lastName: lName,
                           bloodGroup: bloodGroup,
                           mobileNo: mobileNo,
                        });
                        Toast.fire({
                           icon: "success",
                           title: "Your chnaged are updated!",
                        });
                     }
                  });
               }
            });
         });

         // User Email Address Update
         $("#formUpdateUserEmail").ready(function () {
            $(document).on("click", "#btnEmailUpdate", () => {
               console.log("press");
               var newEmailAdd = $("#confirmNewEmailAdd").val();
               var password = $("#getCurrentPassword").val();

               const emailCredential = firebase.auth.EmailAuthProvider.credential(
                  user.email,
                  password
               );

               user
                  .reauthenticateWithCredential(emailCredential)
                  .then(function () {
                     // User re-authenticated.
                     if ($("#formUpdateUserEmail").valid()) {
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
                              var user = firebase.auth().currentUser;
                              if (newEmailAdd != user.email) {
                                 user
                                    .updateEmail(newEmailAdd)
                                    .then(function () {
                                       // Update successful.

                                       db.collection("users")
                                          .doc(user.uid)
                                          .update({
                                             email: newEmailAdd,
                                          });
                                       user.sendEmailVerification();
                                       Swal.fire(
                                          "Update User Email Address!",
                                          "Before signin please verify your email",
                                          "success"
                                       ).then((result) => {
                                          firebase
                                             .auth()
                                             .signOut()
                                             .then((result) => {
                                                window.location.href = BASE_URL;
                                             })
                                             .catch(function (error) {
                                                // Handle Errors here.
                                                var errorCode = error.code;
                                                var errorMessage =
                                                   error.message;

                                                window.alert(
                                                   "Error:" + errorMessage
                                                );
                                             });
                                       });
                                       $("#formUpdateUserEmail").trigger(
                                          "reset"
                                       );
                                    })
                                    .catch(function (error) {
                                       // An error happened.
                                       Swal.fire(
                                          "Update User Email Address!",
                                          "The user email update failed" +
                                             error,
                                          "warning"
                                       );
                                    });
                              } else {
                                 Swal.fire("This email is already exists!");
                              }
                           }
                        });
                     }
                  })
                  .catch(function (error) {
                     // An error happened.
                     // window.alert("Error:" + error);
                     Swal.fire(
                        "Re-authentication!",
                        "The user re-authentication failed!" + error,
                        "warning"
                     );
                  });
            });
         });

         // User Password Update
         $("#formUpdateUserPwd").ready(function () {
            $(document).on("click", "#btnPwdUpdate", () => {
               console.log("press");
               var newPassword = $("#newPassword").val();
               var password = $("#CurrentPassword").val();

               const emailCredential = firebase.auth.EmailAuthProvider.credential(
                  user.email,
                  password
               );

               user
                  .reauthenticateWithCredential(emailCredential)
                  .then(function () {
                     // User re-authenticated.
                     if ($("#formUpdateUserPwd").valid()) {
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
                              var user = firebase.auth().currentUser;
                              if (newPassword != password) {
                                 user
                                    .updatePassword(newPassword)
                                    .then(function () {
                                       // Update successful.

                                       Toast.fire({
                                          icon: "success",
                                          title:
                                             "Password update successfully!",
                                       });
                                       $("#formUpdateUserPwd").trigger("reset");
                                    })
                                    .catch(function (error) {
                                       // An error happened.
                                       Swal.fire(
                                          "Update User Email Address!",
                                          "The user email update failed" +
                                             error,
                                          "warning"
                                       );
                                    });
                              } else {
                                 Swal.fire(
                                    "This password is your old password!"
                                 );
                              }
                           }
                        });
                     }
                  })
                  .catch(function (error) {
                     // An error happened.
                     // window.alert("Error:" + error);
                     Swal.fire(
                        "Reauthentication!",
                        "The user reauthentication failed!" + error,
                        "warning"
                     );
                  });
            });
         });
      }
   });
   //clear once Email form is submitted
   $("#formUpdateUserEmail").ready(function () {
      $(document).on("click", "#btnEmailClear", () => {
         $("#formUpdateUserEmail").trigger("reset");
      });
   });
   //clear once Passowrd form is submitted
   $("#formUpdateUserPwd").ready(function () {
      $(document).on("click", "#btnPwdClear", () => {
         $("#formUpdateUserPwd").trigger("reset");
      });
   });
});
