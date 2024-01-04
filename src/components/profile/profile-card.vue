<script setup>
import friendListing from './friend-listing.vue'
import requestListing from './request-listing.vue'
import { useUserStore } from '../../stores/user'
import { storeToRefs } from 'pinia'
import { useDocument } from 'vuefire'
import { doc, collection, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ref } from 'vue'

const userStore = useUserStore()
const { id: id, renderFriends:renderFriends, renderRequests: renderRequests } = storeToRefs(userStore)
const userRef = doc(collection(db, 'users'), id.value)
const user = useDocument(userRef).data
const updateToggle = ref(false)
const newNickname = ref('')

async function updateNickname(params) {
  await updateDoc(userRef,{
    user_nickname: newNickname.value
  })
  updateToggle.value = false
}
</script>
<template>
  <div class="bg-background-50 rounded-lg overflow-scroll shadow-lg w-[30%]" v-if="user">
    <div class="border-b px-4 pb-6">
      <div class="text-center my-4">
        <img
          class="h-32 w-32 rounded-full border-4 border-background-100 mx-auto my-4"
          alt=""
          :src="
            user.user_pfp == ''
              ? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
              : user.user_pfp
          "
        />
      </div>
      <div class="py-2 flex flex-row justify-center">
        <h3 v-if="!updateToggle.valueOf()" class="font-bold text-2xl text-gray-800 mb-1 text-center">{{ user.user_nickname }}</h3>
        <input v-if="updateToggle.valueOf()"  v-model="newNickname" class="font-bold text-2xl text-gray-800 mb-1 text-center" :placeholder="user.user_nickname">
      </div>
      <div class="flex gap-2 px-2">
        <button v-if="updateToggle.valueOf()" @click="updateToggle = false"
          class="flex-1 rounded-full bg-accent-600 text-background-100 antialiased font-bold hover:bg-accent-800 px-4 py-2"
        >
          Cancel
        </button>
        <button v-if="!updateToggle.valueOf()" @click="deleteDoc()"
          class="flex-1 rounded-full bg-accent-600 text-background-100 antialiased font-bold hover:bg-accent-800 px-4 py-2"
        >
          Delete
        </button>
        <button v-if="!updateToggle.valueOf()" @click="updateToggle = true"
          class="flex-1 rounded-full border-2 border-gray-400 font-semibold text-black px-4 py-2"
        >
          Update
        </button>
        <button v-if="updateToggle.valueOf()" @click="updateNickname"
          class="flex-1 rounded-full border-2 border-gray-400 font-semibold text-black px-4 py-2"
        >
          Update
        </button>
      </div>
    </div>
    <div class="px-4 py-4">
      <div class="flex gap-2 items-center text-gray-800 mb-4">
        <svg
          class="h-6 w-6 text-gray-600"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            class=""
            d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
          />
        </svg>
        <span>Friend Requests</span>
      </div>
      <requestListing v-if="renderRequests" v-for="friendRequest in user.friend_requests" :friendID="friendRequest" :userRef="userRef" :userID="id" :user="user"/>
    </div>
    <div class="px-4 py-4 border-t">
      <div class="flex gap-2 items-center text-gray-800 mb-4">
        <svg
          class="h-6 w-6 text-gray-600"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            class=""
            d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
          />
        </svg>
        <span>Friends</span>
      </div>
      <friendListing v-if="renderFriends" v-for="friend in user.friends" :friendID="friend" :userRef="userRef" />
    </div>
  </div>
</template>
