$(function() {


    $("#formUpdateUserInfo").validate({
        rules: {
            updateFName: "required",
            updateLName: "required",
            updateAddress: {
                required: true,
            },
            updateAddress: {
                required: true,
            },
            updateMobileNo: {
                required: true,
                minlength: 10,
                maxlength: 10,
            },
        },
        messages: {
            updateFName: " Enter First Name",
            updateLName: " Enter Last Name",
            updateAddress: " Enter Address",
            updateMobileNo: " Enter your Phone number",
            userBloodGroupUpdate: {
                required: "Please select an option from the list!",
            },
        }
    });

    $("#formUpdateUserEmail").validate({
        rules: {
            newEmailAdd: {
                required: true,
                email: true
            },
            confirmNewEmailAdd: {
                equalTo: "#newEmailAdd"
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


        }
    });

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            db.collection(COLLECTION_USERS)
                .where("uid", "==", user.uid)
                .onSnapshot(
                    function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            let userData = doc.data();

                            document.getElementById('updateFName').value = userData.firstName;
                            document.getElementById('updateLName').value = userData.lastName;
                            document.getElementById('updateMobileNo').value = userData.mobileNo;
                            document.getElementById('updateAddress').value = userData.address;
                            document.getElementById('userBloodGroupUpdate').value = userData.bloodGroup;
                        });
                    },
                    function(error) {
                        var errorMessage = error.message;
                        window.alert("Error:" + errorMessage);
                    }
                );
            //toast a message when profile is updated
            const Toast = Swal.mixin({
                    toast: true,
                    type: "success",
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,

                })
                // User Infor Update
            $('#formUpdateUserInfo').ready(function() {
                $(document).on("click", "#btnSaveChanges", () => {
                    console.log("press")
                    var fName = $("#updateFName").val();
                    var lName = $("#updateLName").val();
                    var address = $("#updateAddress").val();
                    var bloodGroup = $("#userBloodGroupUpdate").val();
                    var mobileNo = $("#updateMobileNo").val();;

                    if ($("#formUpdateUserInfo").valid()) {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You can always change your mind later!",
                            type: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                            allowOutsideClick: false
                        }).then(result => {
                            if (result.value) {
                                usersRef
                                    .doc(user.uid)
                                    .update({
                                        firstName: fName,
                                        lastName: lName,
                                        address: address,
                                        bloodGroup: bloodGroup,
                                        mobileNo: mobileNo,
                                    });
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Your chnaged are updated!',

                                })
                            }
                        });
                    }
                });
            });

            // User Email Address Update
            $('#formUpdateUserEmail').ready(function() {
                $(document).on("click", "#btnEmailUpdate", () => {
                    console.log("press")
                    var newEmailAdd = $("#confirmNewEmailAdd").val();
                    var password = $("#getCurrentPassword").val();

                    const emailCredential = firebase.auth.EmailAuthProvider.credential(user.email, password);

                    user.reauthenticateWithCredential(emailCredential).then(function() {
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
                                allowOutsideClick: false
                            }).then(result => {
                                if (result.value) {
                                    var user = firebase.auth().currentUser;
                                    if (newEmailAdd != user.email) {
                                        user.updateEmail(newEmailAdd).then(function() {
                                            // Update successful.
                                            db
                                                .collection("users")
                                                .doc(user.uid)
                                                .update({
                                                    email: newEmailAdd,

                                                });
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'Email update successfully!',

                                            })
                                            $("#formUpdateUserEmail").trigger("reset");

                                        }).catch(function(error) {
                                            // An error happened.
                                            Swal.fire(
                                                "Update User Email Address!",
                                                "The user email update failed" + error,
                                                "warning"
                                            );
                                        });
                                    } else {
                                        Swal.fire(
                                            "This email is already exists!",
                                        );
                                    }

                                }

                            });
                        }

                    }).catch(function(error) {
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
    //clear once form is submitted
    $('#formUpdateUserEmail').ready(function() {
        $(document).on("click", "#btnEmailClear", () => {
            $("#formUpdateUserEmail").trigger("reset");
        });
    });
});