// let formSignIn = $("#formSignIn");

// let txtPassword = $("#txtPassword");
// let txtEmail = $("#txtEmail");

$("#formSignIn").validate({
    rules: {
        txtEmail: {
            required: true,
            email: true
        },
        txtPassword: {
            required: true,
            minlength: 6
        }
    }
});


$(document).on("click", "#btnLogin", () => {
    if ($("#formSignIn").valid()) {
        alert("Valid: ");
        $("#txtEmail").val(),
            $("#txtPassword").val()
            // window.location.href = window.location.origin + "/main/events";
    }
});