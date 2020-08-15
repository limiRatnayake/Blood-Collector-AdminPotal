//create the right corner desktop bar
$(function () {
   // var user = firebase.auth().currentUser;
   // console.log(user)
   firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
         db.collection(COLLECTION_USERS)
            .where("uid", "==", user.uid)
            .onSnapshot(
               function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                     let userData = doc.data();
                     console.log(userData);
                     $("#headerUserEmail").html(userData.email);
                     $("#accDropdownUserName").html(
                        "User Name: " +
                           userData.firstName +
                           " " +
                           userData.lastName
                     );
                     $("#accDropdownUserRole").html(
                        "User Role: " + userData.userRole
                     );
                  });
               },
               function (error) {
                  var errorMessage = error.message;
                  window.alert("Error:" + errorMessage);
               }
            );
      } else {
         // No user is signed in.
      }
   });
});
