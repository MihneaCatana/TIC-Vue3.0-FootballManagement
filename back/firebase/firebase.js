const dotenv = require('dotenv')
const {getFirestore} = require("firebase/firestore")
const {initializeApp} = require("firebase/app");

dotenv.config()

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APP_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};
initializeApp(firebaseConfig);

const db = getFirestore()

module.exports= {firebaseConfig, db}