<script setup>
import { ref, defineProps, nextTick } from 'vue'
import { db } from '../../firebase'
import { doc, collection, updateDoc, deleteDoc } from 'firebase/firestore'
import { useDocument } from 'vuefire'
import { useUserStore } from '../../stores/user'
import { usePostStore } from '../../stores/post'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const postStore = usePostStore()
const { postsDocs: postsDocs, postRender: postRender } = storeToRefs(postStore)
const props = defineProps(['post'])
const postData = props.post.data()
const postID = props.post.id
const postRef = doc(collection(db, 'posts'), postID)
const user = useDocument(doc(collection(db, 'users'), postData.post_user)).data

const likeValue = ref(postData.likes)
const dislikeValue = ref(postData.dislikes)
const likeToggleValue = ref(false)
const dislikeToggleValue = ref(false)

function like() {
  likeToggleValue.value = true
  likeValue.value += 1
  updateDoc(postRef, {
    likes: likeValue.value
  })
}

function unlike() {
  likeToggleValue.value = false
  likeValue.value -= 1
  updateDoc(postRef, {
    likes: likeValue.value
  })
}

function dislike() {
  dislikeToggleValue.value = true
  dislikeValue.value += 1
  updateDoc(postRef, {
    dislikes: likeValue.value
  })
}

function undislike() {
  dislikeToggleValue.value = false
  dislikeValue.value -= 1
  updateDoc(postRef, {
    dislikes: likeValue.value
  })
}

async function deletePost() {
  await deleteDoc(postRef);
  postRender.value = false;
  const index = postsDocs.value.indexOf(props.post);
  if (index > -1) { // only splice array when item is found
    postsDocs.value.splice(index, 1); // 2nd parameter means remove one item only
  }
  await nextTick()
  postRender.value = true;
}
</script>
<template>
  <div class="bg-white border border-gray-200 rounded-lg shadow my-4">
    <a href="#">
      <img class="rounded-t-lg" :src="props.post.image_url" alt="" />
    </a>
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        <span v-if="user" class="text-primary-600">{{ user.user_nickname }}</span>
      </h5>
      <p class="mb-3 font-normal text-gray-700">
        {{ postData.text }}
      </p>
      <div class="flex flex-row items-center">
        <button
          @click="dislikeToggleValue.valueOf() ? undislike() : dislike()"
          :disabled="likeToggleValue.valueOf()"
          class="inline-flex items-center px-3 py-2 font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
        >
          <span class="text-lg mx-2">{{ dislikeValue }}</span>
          <svg
            v-if="dislikeToggleValue.valueOf() == true"
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path
              d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z"
            />
          </svg>
          <svg
            v-if="dislikeToggleValue.valueOf() == false"
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"
            />
          </svg>
        </button>
        <button
          @click="likeToggleValue.valueOf() ? unlike() : like()"
          :disabled="dislikeToggleValue.valueOf()"
          class="inline-flex items-center pl-2 pr-3 py-2 mx-2 text-sm font-medium text-center text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
        >
          <span class="text-lg mx-2">{{ likeValue }}</span>
          <svg
            v-if="likeToggleValue.valueOf() == true"
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 18"
          >
            <path
              d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"
            />
          </svg>
          <svg
            v-if="likeToggleValue.valueOf() == false"
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"
            />
          </svg>
        </button>
        <button
          v-if="userStore.id == postData.post_user"
          @click="deletePost()"
          class="inline-flex items-center px-3 py-3 text-sm font-medium text-center text-white bg-accent-600 rounded-lg hover:bg-accent-700 focus:ring-4 focus:outline-none focus:ring-accent-300"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path
              d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
