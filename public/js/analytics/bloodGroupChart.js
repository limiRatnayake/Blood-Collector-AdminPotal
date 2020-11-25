$(function () {
   var ctx = document.getElementById("bloodGroupChart").getContext("2d");

   var bloodGroupAPlus = 0;
   var bloodGroupBPlus = 0;
   var bloodGroupABPlus = 0;
   var bloodGroupOPlus = 0;
   var bloodGroupANegative = 0;
   var bloodGroupBNegative = 0;
   var bloodGroupABNegative = 0;
   var bloodGroupONegative = 0;
   var bloodGroupLabel = [];
   var bloodGroupValue = [];

   db.collection("users")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var users = doc.data();
            var bloodGroup = users.bloodGroup;

            switch (bloodGroup) {
               case "A+":
                  {
                     bloodGroupAPlus = bloodGroupAPlus + 1;
                  }
                  break;
               case "B+":
                  {
                     bloodGroupBPlus = bloodGroupBPlus + 1;
                  }
                  break;
               case "AB+":
                  {
                     bloodGroupABPlus = bloodGroupABPlus + 1;
                  }
                  break;
               case "O+":
                  {
                     bloodGroupOPlus = bloodGroupOPlus + 1;
                  }
                  break;
               case "A-":
                  {
                     bloodGroupANegative = bloodGroupANegative + 1;
                  }
                  break;
               case "B-":
                  {
                     bloodGroupBNegative = bloodGroupBNegative + 1;
                  }
                  break;
               case "AB-":
                  {
                     bloodGroupABNegative = bloodGroupABNegative + 1;
                  }
                  break;
               case "O-":
                  {
                     bloodGroupONegative = bloodGroupONegative + 1;
                  }
                  break;

               default:
                  {
                     print("No Data");
                  }
                  break;
            }
         });

         var bloodGroups = [
            {
               label: "A+",
               value: bloodGroupAPlus,
            },
            {
               label: "B+",
               value: bloodGroupBPlus,
            },
            {
               label: "AB+",
               value: bloodGroupABPlus,
            },
            {
               label: "O+",
               value: bloodGroupOPlus,
            },
            {
               label: "A-",
               value: bloodGroupANegative,
            },
            {
               label: "B-",
               value: bloodGroupBNegative,
            },
            {
               label: "AB-",
               value: bloodGroupABNegative,
            },
            {
               label: "O-",
               value: bloodGroupONegative,
            },
         ];

         for (let index = 0; index < bloodGroups.length; index++) {
            bloodGroupLabel.push(bloodGroups[index].label);
            bloodGroupValue.push(bloodGroups[index].value);
         }
         var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "bar",

            // The data for our dataset
            data: {
               labels: bloodGroupLabel,
               datasets: [
                  {
                     label: "Blood Group",
                     backgroundColor: [
                        "#ffe6cc",
                        "#ffd9b3",
                        "#ffcc99",
                        "#ffbf80",
                        "#ffb366",
                        "#ffa64d",
                        "#ff9933",
                        "#ff8c1a",
                        // "#ffcccc",
                        // "#ffb3b3",
                        // "#ff9999",
                        // "#ff8080",
                        // "#ff6666",
                        // "#ff4d4d",
                        // "#ff3333",
                        // "#ff1a1a",
                     ],
                     //  borderColor: "rgb(255, 99, 132)",
                     data: bloodGroupValue,
                  },
               ],
            },

            // Configuration options go here
            options: {},
         });
      });
});
