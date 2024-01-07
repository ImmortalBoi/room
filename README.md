# Room - Social Media App 

A web app for chatting, calling and interactions between friends and groups. Using WebRTC for video calling, firestore for the real time chat and post updates, alongside image posting, sharing, tagging and group chat functionalities with auth. Made with Vue, Pinia and Tailwind.

# Demo
<a href="https://room-4d562.web.app/">Link to Demo</a>

# Screenshots

## Home Tab
![Home Tab](https://github.com/ImmortalBoi/room-up/blob/main/readme/Home%20Tab.png?raw=true)

## Chat Tab
![Chat Tab](https://github.com/ImmortalBoi/room-up/blob/main/readme/Chat%20Tab.png?raw=true)

## Friends Tab
![Friends Tab](https://github.com/ImmortalBoi/room-up/blob/main/readme/Friends%20Tab.png?raw=true)

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

```js
import { initializeApp } from 'firebase/app'
<<<<<<< Updated upstream
=======
import { getStorage } from "firebase/storage";
>>>>>>> Stashed changes
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
// Put your API information here
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp);
<<<<<<< Updated upstream
=======
export const storage = getStorage(firebaseApp)
>>>>>>> Stashed changes
```

Enable Storage, Authentication and Firestore in your firebase Application
