// const firebase = require("../config/firebase-config");

// const db = firebase.firestore();
// const userModel = {};

// const COLLECTION_USERS = "users";

// userModel.createAccount = data => {
//     return new Promise((resolve, reject) => {
//         firebase
//             .auth()
//             .createUserWithEmailAndPassword(data.email, data.password)
//             .then(result => {
//                 try {
//                     let user = result.user;

//                     _setUserData("", user.uid, data).then(
//                         result => {
//                             resolve(result);
//                         },
//                         error => {
//                             console.log(error);
//                             reject(error);
//                         }
//                     )
//                 } catch (error) {
//                     console.log(error);
//                     reject(error);
//                 }
//             })
//     })
// }

// module.exports = userModel;