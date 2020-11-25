// const firebaseAdmin = require("../config/firebase-admin-config");

// const db = firebaseAdmin.firestore();

// module.exports = async (req, res) => {
//    try {
//       // var data = await _getUserData(req.body);
//       var data = req.body;
//       console.log(data.uid);
//       var creationTime;
//       //   console.log(disabled);
//       var userRecord = await firebaseAdmin
//          .auth()
//          .getUser(data.uid)
//          .then((users) => {
//             creationTime = users.metadata.creationTime;
//             console.log(users.metadata.creationTime);
//          });

//       res.send({
//          code: 200,
//          data: creationTime,
//       });
//    } catch (err) {
//       console.log("Errors:", err);
//       if (err) {
//          res.send({
//             code: 400,
//             errors: err.errors,
//          });
//       } else {
//          res.send({
//             code: 400,
//             errors: [err],
//          });
//       }
//    }
// };
