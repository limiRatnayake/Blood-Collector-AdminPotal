$(function() {
    $("#formForgetPwd").validate({
        rules: {
            txtEmail: {
                required: true,
                email: true

            },
        },
        messages: {
            txtEmail: " Enter Valid Email Address!",
        }
    });

    //toast a message when profile is updated
    const Toast = Swal.mixin({
        toast: true,
        type: "success",
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,

    })

    $('#formForgetPwd').ready(function() {
        $(document).on("click", "#btnRequest", () => {
            console.log("pressed")
            var auth = firebase.auth();
            var data = {
                email: $("#txtEmail").val(),
            };
            console.log(data)
            if ($("#formForgetPwd").valid()) {
                auth.sendPasswordResetEmail(data.email).then(function() {
                    // Email sent.
                    Toast.fire({
                        icon: 'success',
                        title: 'Email sent!',

                    })
                    $("#formForgetPwd").trigger("reset");

                }).catch(function(error) {

                    // An error happened.
                    Swal.fire(
                        'Request a Password Reset!',
                        'Your email address should be you registered email.',
                        'warning'
                    )
                });
            }
        });

    });



});