$(function () {
   const container = document.getElementById("districtsList");
   var colomboValue = 0;
   var kandyValue = 0;
   var galleValue = 0;
   var amparaValue = 0;
   var anuradhapuraValue = 0;
   var badullaValue = 0;
   var batticaloaValue = 0;
   var gampahaValue = 0;
   var hambantotaValue = 0;
   var jaffnaValue = 0;
   var kalutaraValue = 0;
   var kegalleValue = 0;
   var kilinochchiValue = 0;
   var kurunegalaValue = 0;
   var mannarValue = 0;
   var mataraValue = 0;
   var monaragalaValue = 0;
   var mullativuValue = 0;
   var nuwaraEliyaValue = 0;
   var polonnaruwaValue = 0;
   var puttalamValue = 0;
   var ratnapuraValue = 0;
   var trincomaleeValue = 0;
   var vavuniyaValue = 0;

   db.collection("events")
      .where("category", "==", "campaign")
      .get()
      .then((snapshot) => {
         snapshot.docs.forEach((doc) => {
            var events = doc.data();
            var districts = events.districts;

            switch (districts) {
               case "Colombo":
                  {
                     colomboValue = colomboValue + 1;
                  }
                  break;
               case "Kandy":
                  {
                     kandyValue = kandyValue + 1;
                  }
                  break;
               case "Galle":
                  {
                     galleValue = galleValue + 1;
                  }
                  break;
               case "Ampara":
                  {
                     amparaValue = amparaValue + 1;
                  }
                  break;
               case "Anuradhapura":
                  {
                     anuradhapuraValue = anuradhapuraValue + 1;
                  }
                  break;
               case "Badulla":
                  {
                     badullaValue = badullaValue + 1;
                  }
                  break;
               case "Batticaloa":
                  {
                     batticaloaValue = batticaloaValue + 1;
                  }
                  break;
               case "Gampaha":
                  {
                     gampahaValue = gampahaValue + 1;
                  }
                  break;
               case "Hambantota":
                  {
                     hambantotaValue = hambantotaValue + 1;
                  }
                  break;
               case "Jaffna":
                  {
                     jaffnaValue = jaffnaValue + 1;
                  }
                  break;
               case "Kalutara":
                  {
                     kalutaraValue = kalutaraValue + 1;
                  }
                  break;
               case "Kegalle":
                  {
                     kegalleValue = kegalleValue + 1;
                  }
                  break;
               case "Kilinochchi":
                  {
                     kilinochchiValue = kilinochchiValue + 1;
                  }
                  break;
               case "Kurunegala":
                  {
                     kurunegalaValue = kurunegalaValue + 1;
                  }
                  break;
               case "Mannar":
                  {
                     mannarValue = mannarValue + 1;
                  }
                  break;
               case "Matara":
                  {
                     mataraValue = mataraValue + 1;
                  }
                  break;
               case "Monaragala":
                  {
                     monaragalaValue = monaragalaValue + 1;
                  }
                  break;
               case "Mullativu":
                  {
                     mullativuValue = mullativuValue + 1;
                  }
                  break;
               case "Nuwara Eliya":
                  {
                     nuwaraEliyaValue = nuwaraEliyaValue + 1;
                  }
                  break;
               case "Polonnaruwa":
                  {
                     polonnaruwaValue = polonnaruwaValue + 1;
                  }
                  break;
               case "Puttalam":
                  {
                     puttalamValue = puttalamValue + 1;
                  }
                  break;
               case "Ratnapura":
                  {
                     ratnapuraValue = ratnapuraValue + 1;
                  }
                  break;
               case "Trincomalee":
                  {
                     trincomaleeValue = trincomaleeValue + 1;
                  }
                  break;
               case "Vavuniya":
                  {
                     vavuniyaValue = vavuniyaValue + 1;
                  }
                  break;

               default:
                  {
                     print("No Data");
                  }
                  break;
            }
         });
         var districtsList = [
            {
               label: "Colombo",
               value: colomboValue,
            },
            {
               label: "Kandy",
               value: kandyValue,
            },
            {
               label: "Galle",
               value: galleValue,
            },
            {
               label: "Ampara",
               value: amparaValue,
            },
            {
               label: "Anuradhapura",
               value: anuradhapuraValue,
            },
            {
               label: "Badulla",
               value: badullaValue,
            },
            {
               label: "Batticaloa",
               value: batticaloaValue,
            },
            {
               label: "Gampaha",
               value: gampahaValue,
            },
            {
               label: "Hambantota",
               value: hambantotaValue,
            },
            {
               label: "Jaffna",
               value: jaffnaValue,
            },
            {
               label: "Kalutara",
               value: kalutaraValue,
            },
            {
               label: "Kegalle",
               value: kegalleValue,
            },
            {
               label: "Kilinochchi",
               value: kilinochchiValue,
            },
            {
               label: "Kurunegala",
               value: kurunegalaValue,
            },
            {
               label: "Mannar",
               value: mannarValue,
            },
            {
               label: "Matara",
               value: mataraValue,
            },
            {
               label: "Monaragala",
               value: monaragalaValue,
            },
            {
               label: "Mullativu",
               value: mullativuValue,
            },
            {
               label: "Nuwara Eliya",
               value: nuwaraEliyaValue,
            },
            {
               label: "Polonnaruwa",
               value: polonnaruwaValue,
            },
            {
               label: "Puttalam",
               value: puttalamValue,
            },
            {
               label: "Ratnapura",
               value: ratnapuraValue,
            },
            {
               label: "Trincomalee",
               value: trincomaleeValue,
            },
            {
               label: "Vavuniya",
               value: vavuniyaValue,
            },
         ];
         districtsList.forEach((result, index) => {
            // Create ul element
            const ul = document.createElement("ul");
            ul.classList = "list-group list-group-flush";

            // Construct ul content
            const content = `
              <ul class="list-group list-group-flush" >
                  <li class="list-group-item d-flex justify-content-between align-items-center " id="collapse-${index}" >
                      ${result.label}
                      <span class="badge badge-warning badge-pill"id="collapse-${index}" >${result.value}</span>
                  </li>
              </ul>
                 `;

            // Append newly created ul element to the div
            container.innerHTML += content;
         });
      });
});
