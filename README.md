# Room - Social Media App 

A web app for chatting, calling and interactions between friends and groups. Using WebRTC for video calling, firestore for the real time chat and post updates, alongside sharing,tagging and group chat functionalities with auth. Made with Vue and Pinia.

# Screenshots

## Home Tab
![Home Tab](readme/"Home Tab.png")

## Chat Tab
![Chat Tab](readme/"Home Tab.png")

## Friends Tab
![Friends Tab](readme/"Home Tab.png")

# Setup

Follow these steps to set up and run the project on your local machine.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/ImmortalBoi/room-up.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Additional steps...

## Configuration

In ./src create a firebase.js file and use this template

    ```javascript
    import { initializeApp } from 'firebase/app'
    import { getFirestore } from 'firebase/firestore'
    import { getAuth } from "firebase/auth";

    export const firebaseApp = initializeApp({
    // Put your API information here
    })

    // used for the firestore refs
    export const db = getFirestore(firebaseApp)
    export const auth = getAuth(firebaseApp);
    ```

Enable Authentication and Firestore in your firebase Application
