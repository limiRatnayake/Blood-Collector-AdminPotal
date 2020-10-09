const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const firebaseAdmin = require("./config/firebase-admin-config");
// Routes
const routes = require("./routes/index");
//Express
let app = express();
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
});
// set the view engine to ejs
// app.set("view engine", "html");
// above didn't work so,look into html friendly syntax use instead ejs
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// Convert the request in to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// set routes
app.use("/", routes);
exports.app = functions.https.onRequest(app);

//push notification
var newData;
var tokens = [];
let userId;
exports.messageTrigger = functions.firestore
   .document("notifications/{notificationId}")
   .onCreate(async (snapshot, context) => {
      const notificationData = snapshot.data();
      if (snapshot.isEmpty) {
         console.log("No devices");
         return;
      }
      // newData = snapshot.data();
      firebaseAdmin
         .firestore()
         .collection("users")
         .where("bloodGroup", "==", notificationData.bloodGroup)
         .get()
         .then(async (usersQuerySnapshot) => {
            if (usersQuerySnapshot.empty) {
               //Invited User not found in Database
               console.log("Invited User not registered");
            } else {
               usersQuerySnapshot.forEach(async (userSnapshot) => {
                  userId = userSnapshot.id;
                  const userDocRef = userSnapshot.ref;

                  const tokensQuerySnapshot = await userDocRef
                     .collection("deviceTokens")
                     .get();

                  for (var tokenData of tokensQuerySnapshot.docs) {
                     tokens.push(tokenData.data().token);
                  }
               });
            }
         });
      var payLoad = {
         notification: {
            title: "Push title",
            body: "Push body",
            sound: "default",
         },
         data: {
            click_action: "FLUTTER_NOTIFICATION_CLICK",
            message: notificationData.message,
         },
      };
      //send data to device
      try {
         const response = firebaseAdmin
            .messaging()
            .sendToDevice(tokens, payLoad);
         firebaseAdmin
            .firestore()
            .collection("users")
            .doc(userId)
            .collection("user_notification")
            .add({
               notifyBy: notificationData.uid,
               notificationId: notificationData.notificationId,
               message: notificationData.message,
            });
         console.log("Notification send successfully");
      } catch (error) {
         console.log("hey,Error sending notification");
      }
   });
