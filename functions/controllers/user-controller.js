// const userModel = require("../models/user-model");
// const responseHelper = require("../helpers/response-helper");

// const userController = {};

// userController.createAdmin = (req, res) => {
//     let data = {
//         //body holds parameters that are sent up from the client as part of a POST request
//         ...req.body
//     };

//     userModel.createAccount(data).then(
//         result => {
//             res.send(
//                 responseHelper.sendResponse(
//                     true,
//                     result,
//                     "User account creation successful",
//                     null
//                 )
//             );
//         },

//         error => {
//             res.send(
//                 responseHelper.sendResponse(
//                     false,
//                     null,
//                     "User account creation failed",
//                     error
//                 )
//             );
//         }
//     );

// };

// module.exports = userController;