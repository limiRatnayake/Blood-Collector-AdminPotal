const BASE_URL = window.location.origin;
const COLLECTION_USERS = "users";
const COLLECTION_EVENTS = "events";
const COLLECTION_HOSPITALS = "hospitals";

//use to configure my app to use firebase
var firebaseConfig = {
   apiKey: "AIzaSyDTvCus3v71DPEsKzQzVooJbV5e9L_mJqs",
   authDomain: "final-year-project-a89ff.firebaseapp.com",
   databaseURL: "https://final-year-project-a89ff.firebaseio.com",
   projectId: "final-year-project-a89ff",
   storageBucket: "final-year-project-a89ff.appspot.com",
   messagingSenderId: "707195683377",
   appId: "1:707195683377:web:157a808faf5a4c78e8cb10",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let usersRef = db.collection(COLLECTION_USERS);
let eventsRef = db.collection(COLLECTION_EVENTS);
let hospitalListRef = db.collection(COLLECTION_HOSPITALS);
