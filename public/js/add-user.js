$(function() {

    $("#formAddUser").validate({
        rules: {
            txtFName: "required",
            txtLName: "required",
            txtEmail: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,

            },
            confirmPassword: {
                equalTo: "#password"
            },
        },
        messages: {
            txtFName: " Enter First Name",
            txtLName: " Enter Last Name",
            txtEmail: " Enter Valid Email Address!",
            password: " Enter Password",
            confirmPassword: " Enter Confirm Password Same as Password",
            userRole: {
                required: "Please select an option from the list!",
            },
        }
    });
    $('#formAddUser').ready(function() {
        $(document).on("click", "#btnRegister", () => {

            if ($("#formAddUser").valid()) {
                console.log("success!!");
                firebase.auth().createUserWithEmailAndPassword($("#txtEmail").val(), $("#password").val())
                    .then(
                        (user) => {
                            //check wether there is a user
                            if (user) {

                                var fName = $("#txtFName").val();
                                var lName = $("#txtLName").val();
                                var email = $("#txtEmail").val();
                                var userRole = $("#userRole").val();


                                db.collection(COLLECTION_USERS).add({
                                    fisrt_username: fName,
                                    last_username: lName,
                                    email: email,
                                    user_role: userRole
                                }).then(result => {

                                    alert("User is successfuly registred!");

                                    $("#formAddUser").trigger("reset");
                                });
                            }
                        }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        window.alert("Error:" + errorMessage);
                    });
            }

        });

    });

    $('#formAddUser').ready(function() {
        $(document).on("click", "#btnClear", () => {

            $("#formAddUser").trigger("reset");
        });

    });
});


// function writeUserData(uid, firstName, lastName) {

//     return db.collection(COLLECTION_USERS + uid).set({
//         fisrt_username: firstName,
//         last_username: lastName,
//     }).then(result => {
//         alert("User Sign up succesful!!");
//         window.location.href = BASE_URL;
//     });
// }