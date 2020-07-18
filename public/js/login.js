$(function() {
    $("#formSignIn").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true

            },
            txtPassword: {
                required: true,
                minlength: 6,
            }
        },
        messages: {
            txtEmail: " Enter Valid Email Address!",
            txtPassword: " Enter Password",
        }
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //user is sign-in
            db.collection(COLLECTION_USERS)
                .where("uid", "==", user.uid)
                .onSnapshot(
                    function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            let userData = doc.data();
                            console.log(userData.userRole)
                            var userRole = userData.userRole
                            if (userRole == 'Admin') {
                                // alert("You have successfully login!!");
                                Swal.fire(
                                    "Update User Email Address!",
                                    "The user email update failed" + error,
                                    "warning"
                                );
                                window.location.href = window.location.origin + "/main/events";

                            } else {
                                // alert("Not")
                            }
                        });
                    },
                    function(error) {
                        var errorMessage = error.message;
                        window.alert("Error:" + errorMessage);
                    }
                );
            // window.location.href = window.location.origin + "/main/events";

        }

    });

    // $.validator.addMethod('email',
    //     function(value) {
    //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    //     }, 'Please enter a valif email'
    // );

    // const currentUser = firebase.auth().currentUser;
    $('#formSignIn').ready(function() {
        $(document).on("click", "#btnLogin", () => {
            var data = {
                email: $("#txtEmail").val(),
                password: $("#txtPassword").val()
            };
            if ($("#formSignIn").valid()) {
                // try {
                firebase.auth().signInWithEmailAndPassword(data.email, data.password)
                    .then(result => {
                        let user = result.user;
                        db.collection(COLLECTION_USERS)
                            .where("uid", "==", user.uid)
                            .onSnapshot(
                                function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                        let userData = doc.data();
                                        console.log(userData.userRole)
                                        var userRole = userData.userRole
                                        if (userRole == 'Admin') {
                                            alert("You have successfully login!!");
                                            window.location.href = window.location.origin + "/main/events";
                                        } else {
                                            alert("Not")
                                        }
                                    });
                                },
                                function(error) {
                                    var errorMessage = error.message;
                                    window.alert("Error:" + errorMessage);
                                }
                            );
                        // console.log()
                        // if (document.get('userRole') != 'User') {
                        //     alert("You have successfully login!!")
                        // } else {
                        //     alert("Not")
                        // }
                        // try {

                        //     alert("You have successfully login!!")
                        //     window.location.href = window.location.origin + "/main/events";


                        // } catch (error) {
                        //     var errorMessage = error.message;
                        //     window.alert("Error:" + errorMessage);
                        // }

                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        window.alert("Error:" + errorMessage);
                    });

                // } catch (error) {
                //     var errorMessage = error.message;
                //     window.alert("Error:" + errorMessage);
                // }

            }
            // else {
            //     alert("Form is not valid!")
            // }
        });

    });

    // $(document).on("click", "#btnLogin", () => {
    //     if ($("#formSignIn").valid()) {
    //         try {
    //             firebase.auth().signInWithEmailAndPassword($("#txtEmail").val(), $("#txtPassword").val())
    //                 .then(result => {
    //                     try {

    //                         alert("You have successfully login!!")
    //                         window.location.href = window.location.origin + "/main/events";


    //                     } catch (error) {
    //                         var errorMessage = error.message;
    //                         window.alert("Error:" + errorMessage);
    //                     }

    //                 })
    //                 .catch(function(error) {
    //                     // Handle Errors here.
    //                     var errorCode = error.code;
    //                     var errorMessage = error.message;

    //                     window.alert("Error:" + errorMessage);
    //                 });

    //         } catch (error) {
    //             var errorMessage = error.message;
    //             window.alert("Error:" + errorMessage);
    //         }

    //     } else {
    //         alert("Form is not valid!")
    //     }
    // });


    // // jquery onclick listener  
    // $("#btnLogout").click(function() {
    //     console.log("btn clicked!!!");
    //     firebase
    //         .auth()
    //         .signOut()
    //         .then(
    //             result => {
    //                 window.location.href = BASE_URL;
    //             }).catch(
    //             function(error) {
    //                 // Handle Errors here.
    //                 var errorCode = error.code;
    //                 var errorMessage = error.message;

    //                 window.alert("Error:" + errorMessage);
    //             }

    //             // function() {
    //             //     window.location.href = BASE_URL;
    //             // },
    //             // function(error) {
    //             //     console.log(error);
    //             //     var errorMessage = error.message;
    //             //     window.alert("Error:" + errorMessage);
    //             // }
    //         );
    // });

});