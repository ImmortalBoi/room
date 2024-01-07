import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

// ... other firebase imports
// Your web app's Firebase configuration

export const firebaseApp = initializeApp({
  })

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);

