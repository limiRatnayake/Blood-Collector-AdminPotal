// jquery onclick listener  
$("#btnLogout").click(function() {
    firebase
        .auth()
        .signOut()
        .then(
            function() {
                window.location.href = BASE_URL;
            },
            function(error) {
                console.log(error);
                var errorMessage = error.message;
                window.alert("Error:" + errorMessage);
            }
        );
});