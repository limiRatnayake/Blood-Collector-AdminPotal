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

    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //user is sign-in
            window.location.href = window.location.origin + "/main/events";

        }

    });

    // $.validator.addMethod('email',
    //     function(value) {
    //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
    //     }, 'Please enter a valif email'
    // );



    $(document).on("click", "#btnLogin", () => {
        if ($("#formSignIn").valid()) {
            firebase.auth().signInWithEmailAndPassword($("#txtEmail").val(), $("#txtPassword").val())
                .then(result => {
                    try {
                        alert("You have successfully login!!")
                        window.location.href = window.location.origin + "/main/events";


                    } catch (error) {
                        var errorMessage = error.message;
                        window.alert("Error:" + errorMessage);
                    }

                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    window.alert("Error:" + errorMessage);
                });



        } else {
            alert("Only admin users can log in")
        }
    });


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