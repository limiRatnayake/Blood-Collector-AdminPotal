$(function () {
   var totalUsers = [];
   var totalCampaigns = [];
   var totalBloodRequests = [];

   db.collection("users")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var users = doc.data();
            let uid = users.uid;
            totalUsers.push(uid);
            $("#totalUsers").html(totalUsers.length);
         });
      });
   db.collection("events")
      .where("category", "==", "campaign")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var events = doc.data();

            totalCampaigns.push(events);
            $("#totalCampaigns").html(totalCampaigns.length);
         });
      });
   db.collection("events")
      .where("category", "==", "request")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var events = doc.data();

            totalBloodRequests.push(events);
            $("#totalBloodRequests").html(totalBloodRequests.length);
         });
      });
});
