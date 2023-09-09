// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4vgGjAcr79vvezvEIU3CjQpB6zeA7DeA",
  authDomain: "fire-trips.firebaseapp.com",
  projectId: "fire-trips",
  storageBucket: "fire-trips.appspot.com",
  messagingSenderId: "607629025921",
  appId: "1:607629025921:web:d662ef2b88272e05d62380",
}

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig)

export const db = getFirestore(fireApp)