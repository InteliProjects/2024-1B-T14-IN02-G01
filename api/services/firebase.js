const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } = require('firebase/auth');
const firebaseConfig = {
  apiKey: "AIzaSyASNPXniNYMktbQUAjOhjGWA4_dkO9uZ-Q",
  authDomain: "abandono-zero-c27b0.firebaseapp.com",
  projectId: "abandono-zero-c27b0",
  storageBucket: "abandono-zero-c27b0.appspot.com",
  messagingSenderId: "537894418550",
  appId: "1:537894418550:web:8b559db756d68868c80757",
  measurementId: "G-F2K8DE2MLD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = {
  auth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential
};