<script setup>
import { ref } from 'vue'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user';
import { addDoc, collection, Timestamp } from 'firebase/firestore'

const postText = ref("")
const user = useUserStore()

async function uploadPost() {
  await addDoc(collection(db, 'posts'), {
    text: postText.value,
    created_at: new Timestamp(new Date().getTime() / 1000, 0),
    dislikes: 0,
    likes:0,
    image_link: "",
    post_user: user.id,
    post_visible_users: [],
    post_visibility: -2,
  }).then((post) => {
    postText.value = ''
    console.log(post)
  })
}
</script>
<template>
  <div class="mt-4 bg-gray-50 rounded-2xl flex flex-row justify-between">
    <textarea
      v-model="postText"
      id="description"
      rows="2"
      class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300"
      placeholder="Write your thoughts"
    ></textarea>

    <button
    @click="uploadPost"
      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path
          d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z"
        />
        <path
          d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z"
        />
      </svg>
    </button>
  </div>
</template>
