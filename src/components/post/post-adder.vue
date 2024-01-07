<script setup>
import { ref } from 'vue'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'
import { addDoc, collection, Timestamp, doc, getDoc } from 'firebase/firestore'

const postText = ref('')
const user = useUserStore()
const toggleSettings = ref(false)
const visibility = ref(-2)
const friends = ref([])
const tagCheckboxes = ref([])
const shareCheckboxes = ref([])
const friendIDs = ref([])
getFriends()

async function getFriends(){
  friendIDs.value = (await getDoc(doc(collection(db,'users'),user.id))).data().friends
  for (const friend in friendIDs.value) {
    console.log(friend)
    const res = (await getDoc(doc(collection(db,'users'),friendIDs.value[friend]))).data()
    console.log(res)
    friends.value.push(res)
  }
  tagCheckboxes.value = Array.from({length: friends.value.length}, () => false);
  shareCheckboxes.value = Array.from({length: friends.value.length}, () => false);
}

async function uploadPost() {
  let visible_users = []
  if(visibility.value == -1){
    visible_users = friendIDs.value
  }
  else if (visibility.value>0){
    visible_users = friendIDs.value.filter((value, index) => shareCheckboxes.value[index])
  }
  
  const tagged_users = friendIDs.value.filter((value, index) => tagCheckboxes.value[index])

  console.log(visible_users)
  await addDoc(collection(db, 'posts'), {
    text: postText.value,
    created_at: new Timestamp(new Date().getTime() / 1000, 0),
    dislikes: 0,
    likes: 0,
    image_link: '',
    post_user: user.id,
    post_tagged_users:tagged_users,
    post_visible_users: visible_users,
    post_visibility: visibility.value,
    post_shared_by: ''
  }).then((post) => {
    postText.value = ''
    console.log(post)
  })
}

function toggleSettingsFn() {
  toggleSettings.value = !toggleSettings.value
}
</script>
<template>
    <div class="flex-col">
      <div class="mt-4 bg-background-50 rounded-2xl flex flex-row justify-between">
        <textarea
          v-model="postText"
          id="description"
          rows="2"
          class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300"
          placeholder="Write your thoughts"
        ></textarea>
  
        <div class="flex flex-row">
          <button class="px-2 group" @click="toggleSettingsFn()">
            <svg
              class="w-6 h-6 text-text-900 group-hover:text-text-700 transition"
              :style="{ transform: toggleSettings ? 'rotate(0deg)' : 'rotate(180deg)' }"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
              />
            </svg>
          </button>
          <button
            @click="uploadPost"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
          >
            <svg
              class="w-6 h-6 text-white"
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
      </div>
      <div
        class="flex-row justify-between flex bg-background-50 p-2 rounded transition"
        v-if="toggleSettings.valueOf()"
      >
        <div class="border-r border-background-600 w-1/2">
          <div class="my-2">Visibility</div>
          <div class="flex items-center mb-4" @click="visibility = -2">
            <input
              checked
              id="visibility-radio-1"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <label for="visibility-radio-1" class="ms-2 text-sm font-medium text-gray-900"
              >Public</label
            >
          </div>
          <div class="flex items-center mb-4" @click="visibility = -1">
            <input
              id="visibility-radio-2"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <label for="visibility-radio-2" class="ms-2 text-sm font-medium text-gray-900"
              >Friends Only</label
            >
          </div>
          <div class="flex items-center mb-4" @click="visibility = 0">
            <input
              id="visibility-radio-4"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <label for="visibility-radio-4" class="ms-2 text-sm font-medium text-gray-900">Private</label>
          </div>
          <div class="flex items-center mb-4" @click="visibility = 1">
            <input
              id="visibility-radio-3"
              type="radio"
              value=""
              name="default-radio"
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
            />
            <label for="visibility-radio-3" class="ms-2 text-sm font-medium text-gray-900">Specific People</label>
          </div>
          <div class="flex items-center mb-4 pl-4" v-if="visibility > 0" v-for="(friend,index) in friends">
            <input
              v-model="shareCheckboxes[index]"
              :id="'default-checkbox'+index"
              type="checkbox"
              value=""
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label :for="'default-checkbox'+index" class="ms-2 text-sm font-medium text-gray-900"
              >{{ friend.user_nickname }}</label
            >
          </div>
        </div>
        <div class="w-1/2 flex flex-col px-2">
          <div class="my-2">Tag</div>
          <div class="flex items-center mb-4 pl-1" v-if="friends" v-for="(friend,index) in friends">
            <input
              v-model="tagCheckboxes[index]"
              :id="'default-checkbox'+index"
              type="checkbox"
              value=""
              class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
            />
            <label :for="'default-checkbox'+index" class="ms-2 text-sm font-medium text-gray-900"
              >{{ friend.user_nickname }}</label
            >
          </div>
        </div>
      </div>
    </div>
</template>
