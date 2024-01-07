<script setup>
import { defineProps } from 'vue'
import {
  doc,
  collection,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { useDocument } from 'vuefire'
import { db } from '../../firebase'

const props = defineProps(['friendID', 'userRef', 'userID', 'user'])
const friendRef = doc(collection(db, 'users'), props.friendID)
const friend = useDocument(friendRef)

async function addFriend(user, friendID) {
  await updateDoc(user, {
    friends: arrayUnion(friendID)
  })
}

async function acceptFriendRequest() {
  addFriend(props.userRef, props.friendID)
  addFriend(friendRef, props.userID)
  await updateDoc(props.userRef, {
    friend_requests: arrayRemove(props.friendID)
  })
  await addDoc(collection(db, 'chats'), {
    chat_name: friend.data.value.user_nickname + ', ' + props.user.user_nickname,
    chat_pfp: '',
    type: 'dm',
    chat_users: [props.friendID, props.userID],
    last_message: new Timestamp(new Date().getTime() / 1000, 0),
    chat_messages: []
  })

  const postsRef = collection(db, 'posts')

  const postsQuery1 = query(postsRef, where('post_user', '==', props.friendID))
  getDocs(postsQuery1)
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          post_visible_users: arrayUnion(props.userID)
        })
        console.log('updated Successfully')
      })
    })
    .catch((error) => {
      console.error('Error fetching documents: ', error)
    })

  const postsQuery2 = query(postsRef, where('post_user', '==', props.userID))
  getDocs(postsQuery2)
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          post_visible_users: arrayUnion(props.friendID)
        })
        console.log('updated Successfully')
      })
    })
    .catch((error) => {
      console.error('Error fetching documents: ', error)
    })
}

async function deleteFriendRequest() {
  await updateDoc(props.userRef, {
    friend_requests: arrayRemove(props.friendID)
  })
}
</script>
<template>
  <div
    v-if="friend"
    class="flex flex-row justify-between items-center gap-3 my-2 py-2 bg-background-200 px-2 rounded-lg"
  >
    {{ friend.user_nickname }}
    <div class="flex flex-row gap-2">
      <button
        class="bg-primary-500 p-1 hover:bg-primary-600 rounded-lg"
        @click="acceptFriendRequest()"
      >
        <svg
          class="w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      </button>

      <button
        class="bg-accent-500 p-1 hover:bg-accent-600 rounded-lg"
        @click="deleteFriendRequest()"
      >
        <svg
          class="w-6 h-6 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
