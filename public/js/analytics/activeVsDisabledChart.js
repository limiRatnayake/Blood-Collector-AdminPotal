$(function () {
   var ctx = document.getElementById("activeVsDisabledUsers").getContext("2d");

   var activeUsers = 0;
   var disabledUsers = 0;

   var label = [];
   var value = [];

   db.collection("users")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var users = doc.data();
            var disabled = users.disabled;
            if (disabled != true) {
               activeUsers = activeUsers + 1;
            } else {
               disabledUsers = disabledUsers + 1;
            }
         });

         var activeVsDisabled = [
            {
               label: "Active",
               value: activeUsers,
            },
            {
               label: "Disabled",
               value: disabledUsers,
            },
         ];
         for (let i = 0; i < activeVsDisabled.length; i++) {
            label.push(activeVsDisabled[i].label);
            value.push(activeVsDisabled[i].value);
         }
         var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: "pie",

            // The data for our dataset
            data: {
               labels: label,
               datasets: [
                  {
                     label: "Active Vs Disable Users",
                     backgroundColor: ["#ffcc99", "#ff8000"],
                     //  borderColor: "rgb(255, 99, 132)",
                     data: value,
                  },
               ],
            },

            //     // Configuration options go here
            options: {},
         });
      });
});
