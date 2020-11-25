$(function () {
   var ctx = document.getElementById("genderChart").getContext("2d");

   var male = 0;
   var female = 0;

   var genderLabel = [];
   var genderValue = [];

   db.collection("users")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var users = doc.data();
            var userGender = users.gender;
            switch (userGender) {
               case "Male":
                  {
                     male = male + 1;
                  }
                  break;
               case "Female":
                  {
                     female = female + 1;
                  }
                  break;
               default:
            }
         });
         var genderList = [
            {
               label: "Male",
               value: male,
            },
            {
               label: "Female",
               value: female,
            },
         ];
         for (let i = 0; i < genderList.length; i++) {
            genderLabel.push(genderList[i].label);
            genderValue.push(genderList[i].value);
         }
         var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "doughnut",

            // The data for our dataset
            data: {
               labels: genderLabel,
               datasets: [
                  {
                     label: "Blood Group",
                     backgroundColor: ["#ffcc99", "#ff8000"],
                     //  borderColor: "rgb(255, 99, 132)",
                     data: genderValue,
                  },
               ],
            },

            //     // Configuration options go here
            options: {},
         });
      });
});
