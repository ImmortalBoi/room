<script setup>
import { defineProps } from 'vue';
import { doc, collection, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase';
import { ref } from 'vue'
const props = defineProps(['user','id'])

const friendRef = doc(collection(db,'users'),props.user.id)
const toggleAdd = ref(false)
checkIfAdded()
async function checkIfAdded() {
    props.user.friend_requests.forEach(element => {
        if (element == props.id){
            toggleAdd.value = true
        }
    });
}
async function requestFriend() {
    await updateDoc(friendRef,{
        friend_requests: arrayUnion(props.id)
    })
    toggleAdd.value = true
}
</script>
<template>
  <div v-if="props.user"
    class="bg-background-200 border-b border-primary-500 my-1 mx-1 rounded p-3 flex flex-row items-center justify-between"
  >
    <span>{{props.user.user_nickname}}</span>
    <div class="flex flex-row items-center">
        <span v-if="toggleAdd.valueOf()">Already Requested!</span>
        <button :disabled="toggleAdd.valueOf()" class="bg-primary-500 hover:bg-primary-600 p-2 rounded" @click="requestFriend()">
          <svg
            class="w-6 h-6 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path
              d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"
            />
          </svg>
        </button>
    </div>
  </div>
</template>
