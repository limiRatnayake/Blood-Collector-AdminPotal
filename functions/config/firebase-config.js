const firebase = require("firebase/app");

// Firebase products that use
require("firebase/auth");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyDTvCus3v71DPEsKzQzVooJbV5e9L_mJqs",
    authDomain: "final-year-project-a89ff.firebaseapp.com",
    databaseURL: "https://final-year-project-a89ff.firebaseio.com",
    projectId: "final-year-project-a89ff",
    storageBucket: "final-year-project-a89ff.appspot.com",
    messagingSenderId: "707195683377",
    appId: "1:707195683377:web:157a808faf5a4c78e8cb10"

});

module.exports = firebase;