$(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            Cookies.set("__session", user._lat);
            window.location.href = window.location.origin + "/main/events";
        }
    });

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
        }
    });



    $(document).on("click", "#btnLogin", () => {
        if ($("#formSignIn").valid()) {
            firebase.auth().signInWithEmailAndPassword($("#txtEmail").val(), $("#txtPassword").val())
                .then(result => {
                    // Cookies.set("session", result.user._lat);
                    window.location.href = window.location.origin + "/main/events";
                }).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    window.alert("Error:" + errorMessage);
                });



        }
    });

});