$(function() {

    $("#btnLogout").click(function() {
        console.log("btn clicked!!!");
        firebase
            .auth()
            .signOut()
            .then(
                result => {
                    window.location.href = BASE_URL;
                }).catch(
                function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    window.alert("Error:" + errorMessage);
                }


            );
    });

});