// Firebase Configuration
// Your Firebase project configuration

const firebaseConfig = {
  apiKey: "AIzaSyB17mkCGxHW0lM-SRn6jBJQTiiC-18X0bs",
  authDomain: "chemistry-flashcards-9a831.firebaseapp.com",
  projectId: "chemistry-flashcards-9a831",
  storageBucket: "chemistry-flashcards-9a831.firebasestorage.app",
  messagingSenderId: "667900108251",
  appId: "1:667900108251:web:e33bf9d91c4a76622e9bfe"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence for Firestore
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code == 'unimplemented') {
      console.log('The current browser does not support persistence.');
    }
  });

// Configure auth to persist user session
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
