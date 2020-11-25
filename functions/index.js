const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
const firebaseAdmin = require("./config/firebase-admin-config");
const db = firebaseAdmin.firestore();
const FieldValue = require("./config/firebase-admin-config").firestore
   .FieldValue;
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
var tokens;

exports.messageTrigger = functions.firestore
   .document("notifications/{notificationId}")
   .onCreate(async (snapshot, context) => {
      const notificationData = snapshot.data();

      const userRef = await db
         .collection("users")
         .where("bloodGroup", "==", notificationData.bloodGroup)
         .get();
      let userList = [];
      userRef.forEach(async (userSnapshot) => {
         // userId = userSnapshot.id;
         userList.push(userSnapshot.id);
      });
      console.log(userList);
      for (var userId of userList) {
         const tokensQuerySnapshot = await db
            .collection("users")
            .doc(userId)
            .collection("deviceTokens")
            .get();

         //(for/of )loops through the values of an iterable object
         for (var tokenData of tokensQuerySnapshot.docs) {
            tokens = [];
            tokens.push(tokenData.data().token);
         }

         var payLoad = {
            notification: {
               title: "Request to Donate Blood",
               body: "Click to see more",
               sound: "default",
            },

            data: {
               click_action: "FLUTTER_NOTIFICATION_CLICK",
               message: notificationData.message,
               title: "Your title",
               body: "Your body",
            },
         };
         //send data to device
         try {
            const response = firebaseAdmin
               .messaging()
               .sendToDevice(tokens, payLoad);

            var userNotifyRef = db
               .collection("users")
               .doc(userId)
               .collection("user_notification")
               .doc();

            userNotifyRef.set({
               notifyId: userNotifyRef.id,
               docRef: notificationData.docRef,
               notifyBy: notificationData.uid,
               notificationId: notificationData.notificationId,
               message: notificationData.message,
               hospitalName: notificationData.hospitalName,
            });

            var userNotificationRef = db.collection("users").doc(userId);
            var eventRef = db.collection("events").doc(notificationData.docRef);

            //add a count when a user get new notification
            userNotificationRef.update({
               notificationCount: FieldValue.increment(1),
            });
            //get the total notification sent
            eventRef.update({
               notifyCount: userRef.size,
            });

            console.log("Notification send successfully");
         } catch (error) {
            console.log(error);
         }
      }
      // for (var tokenData of tokensQuerySnapshot.docs) {
      //    tokens = [];
      //    tokens.push(tokenData.data().token);
      // }
   });

exports.sendThankYouMessage = functions.firestore
   .document("events/{docRef}")
   .onUpdate(async (snapshot) => {
      /*onUpdate has two properties, before and after
      DataSnapshot objects describe the contents of the database before and after the change that triggered the function.
       */
      const beforeSubmitListStatus = snapshot.before
         ? snapshot.before.get("submitListStatus")
         : "";
      const afterSubmitListStatus = snapshot.after
         ? snapshot.after.get("submitListStatus")
         : "";
      const eventDetail = snapshot.after.data(); //DataSnapshot after the change
      if (
         afterSubmitListStatus == "submitted" &&
         beforeSubmitListStatus != "submitted"
      ) {
         const participantRef = await db
            .collection("participants")
            .where("participatedStatus", "==", "Donated")
            .get();
         let participantsList = [];
         participantRef.forEach(async (participantSnapshot) => {
            participantsList.push(participantSnapshot.data().uid);
         });
         console.log(participantsList);

         for (var userId of participantsList) {
            const tokensQuerySnapshot = await db
               .collection("users")
               .doc(userId)
               .collection("deviceTokens")
               .get();

            for (var tokenData of tokensQuerySnapshot.docs) {
               console.log(tokenData);
               tokens = [];
               tokens.push(tokenData.data().token);
            }

            var payLoad = {
               notification: {
                  title: "You are a Life Saver",
                  body: "We are grateful for your blood donation. Thank You!",
                  sound: "default",
               },

               data: {
                  click_action: "FLUTTER_NOTIFICATION_CLICK",
                  message: "Thank You",
                  title: "Your title",
                  body: "Your body",
               },
            };

            //send data to device
            try {
               const response = firebaseAdmin
                  .messaging()
                  .sendToDevice(tokens, payLoad);

               var userNotificationRef = db.collection("users").doc(userId);

               var userNotifyRef = db
                  .collection("users")
                  .doc(userId)
                  .collection("user_notification")
                  .doc();

               userNotifyRef.set({
                  notifyId: userNotifyRef.id,
                  docRef: eventDetail.docRef,
                  // participantId: eventDetail.participantId,
                  notifyBy: eventDetail.uid,
                  message:
                     "We are grateful for your blood donation. Thank You!",
                  organizersName: eventDetail.nameOftheOrganizer,
                  eventHeldOn: eventDetail.pickUpStartDate,
                  hospitalName: eventDetail.hospitalName,
               });

               //add a count when a user get new notification
               userNotificationRef.update({
                  notificationCount: FieldValue.increment(1),
               });

               console.log("Thank you message send successfully");
            } catch (error) {
               console.log(error);
            }
         }
      }
   });

// exports.messageTrigger = functions.firestore
// .document("notifications/{notificationId}")
// .onCreate(async (snapshot, context) => {
//    const notificationData = snapshot.data();

//    const userRef = await db
//       .collection("users")
//       .where("bloodGroup", "==", notificationData.bloodGroup)
//       .get();

//    userRef.forEach(async (userSnapshot) => {
//       userId = userSnapshot.id;
//    });

//    const tokensQuerySnapshot = await db
//       .collection("users")
//       .doc(userId)
//       .collection("deviceTokens")
//       .get();

//    for (var tokenData of tokensQuerySnapshot.docs) {
//       tokens = [];
//       tokens.push(tokenData.data().token);
//    }

//    var payLoad = {
//       notification: {
//          title: "Request to Donate Blood",
//          body: "Click to see more",
//          sound: "default",
//       },

//       data: {
//          click_action: "FLUTTER_NOTIFICATION_CLICK",
//          message: notificationData.message,
//          title: "Your title",
//          body: "Your body",
//       },
//    };
//    //send data to device
//    try {
//       const response = firebaseAdmin
//          .messaging()
//          .sendToDevice(tokens, payLoad);

//       var userNotifyRef = db
//          .collection("users")

//          .doc(userId)
//          .collection("user_notification")
//          .doc();

//       userNotifyRef.set({
//          notifyId: userNotifyRef.id,
//          docRef: notificationData.docRef,
//          notifyBy: notificationData.uid,
//          notificationId: notificationData.notificationId,
//          message: notificationData.message,
//          hospitalName: notificationData.hospitalName,
//       });

//       var userNotificationRef = db.collection("users").doc(userId);
//       var eventRef = db.collection("events").doc(notificationData.docRef);

//       //add a count when a user get new notification
//       userNotificationRef.update({
//          notificationCount: FieldValue.increment(1),
//       });
//       //get the total notification sent
//       eventRef.update({
//          notifyCount: userRef.size,
//       });

//       console.log("Notification send successfully");
//    } catch (error) {
//       console.log(error);
//    }
// });
