<script setup>
import { defineProps } from 'vue'
import { doc, collection, updateDoc, arrayRemove} from 'firebase/firestore'
import { useDocument } from 'vuefire'
import { db } from '../../firebase'
import { nextTick } from 'vue'
import { useUserStore } from '../../stores/user'

const props = defineProps(['friendID','userRef'])
const friendRef = doc(collection(db, 'users'), props.friendID)
const friend = useDocument(friendRef)
const user = useUserStore()

async function removeFriend(user, friendID) {
    await updateDoc(user,{
      friends: arrayRemove(friendID)
    })
}

async function deleteFriend(){
  user.renderFriends = false
  removeFriend(props.userRef,props.friendID);
  removeFriend(friendRef, props.userID);
  await nextTick()
  user.renderFriends = true
}
</script>
<template>
  <div v-if="friend" class="flex flex-row justify-between items-center gap-3 my-2 py-2 bg-background-200 px-2 rounded-lg">
    {{ friend.user_nickname }}
      <button class="bg-accent-500 p-1 hover:bg-accent-600 rounded-lg" @click="deleteFriend()">
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
</template>
