import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

// ... other firebase imports
// Your web app's Firebase configuration

export const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBCIcpxzM2wUmfMvliofmRQoUyTm9x0C7k',
  
    authDomain: 'room-4d562.firebaseapp.com',
  
    projectId: 'room-4d562',
  
    storageBucket: 'room-4d562.appspot.com',
  
    messagingSenderId: '1059530472742',
  
    appId: '1:1059530472742:web:18e87f1f3793e4733ed5e7'
  })

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);

