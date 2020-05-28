$(function() {
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


    $(document).on("click", "#btnLogin", () => {
        if ($("#formSignIn").valid()) {
            firebase.auth().signInWithEmailAndPassword($("#txtEmail").val(), $("#txtPassword").val())
                .then(result => {
                    alert("You have successfully login!!")
                    window.location.href = window.location.origin + "/main/events";
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    window.alert("Error:" + errorMessage);
                });



        }
    });


});