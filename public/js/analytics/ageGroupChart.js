$(function () {
   var ctx = document.getElementById("ageGroupChart").getContext("2d");

   var eighteenToTwentyFour = 0;
   var twentyFiveToThirtyFour = 0;
   var thirtyFiveToFortyFour = 0;
   var fortyFiveToFiftyFour = 0;
   var fiftyFiveToSixty = 0;
   var ageLabel = [];
   var ageValue = [];

   db.collection("users")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var users = doc.data();
            var getBirthDate = users.birthDate;
            var convertToDate = Date.parse(getBirthDate);
            var birthDate = new Date(convertToDate);
            var today = new Date();
            var age = today.getFullYear() - birthDate.getFullYear();

            if (age >= 18 && age <= 24) {
               eighteenToTwentyFour = eighteenToTwentyFour + 1;
            } else if (age >= 25 && age <= 34) {
               twentyFiveToThirtyFour = twentyFiveToThirtyFour + 1;
            } else if (age >= 35 && age <= 44) {
               thirtyFiveToFortyFour = thirtyFiveToFortyFour + 1;
            } else if (age >= 45 && age <= 54) {
               fortyFiveToFiftyFour = fortyFiveToFiftyFour + 1;
            } else if (age >= 55 && age <= 60) {
               fiftyFiveToSixty = fiftyFiveToSixty + 1;
            }
         });
         var ageArray = [
            {
               label: "18-24",
               value: eighteenToTwentyFour,
            },
            {
               label: "25-34",
               value: twentyFiveToThirtyFour,
            },
            {
               label: "34-44",
               value: thirtyFiveToFortyFour,
            },
            {
               label: "45-54",
               value: fortyFiveToFiftyFour,
            },
            {
               label: "55-60",
               value: fiftyFiveToSixty,
            },
         ];
         for (let i = 0; i < ageArray.length; i++) {
            ageLabel.push(ageArray[i].label);
            ageValue.push(ageArray[i].value);
         }

         var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "horizontalBar",

            // The data for our dataset
            data: {
               labels: ageLabel,
               datasets: [
                  {
                     label: "Blood Group",
                     backgroundColor: [
                        "#ffbf80",
                        "#ffb366",
                        "#ffa64d",
                        "#ff9933",
                        "#ff8c1a",
                     ],
                     //  borderColor: "rgb(255, 99, 132)",
                     data: ageValue,
                  },
               ],
            },

            //     // Configuration options go here
            options: {},
         });
      });
});
