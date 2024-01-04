<script setup>
import chatListing from './chat-listing.vue'
import { onMounted, watch } from 'vue'
import { useChatStore } from '../../stores/chat'
import { storeToRefs } from 'pinia'

const chatStore = useChatStore()
// const {chatCollection: chatCollection} = storeToRefs(chatStore)
const { chats: chats, chatRender: chatRender } = storeToRefs(chatStore)
// const chats = ref([]);
watch(chats, (newChats) => {
  newChats.forEach((chat) => {
    console.log(chat)
  })
})
onMounted(chatStore.findChats)
</script>
<template>
  <div
    class="shadow-sm h-[90%] bg-background-200 self-stretch flex flex-col w-full mt-9 px-5 py-4 rounded-3xl max-md:max-w-full max-md:px-5"
  >
    <div
      class="text-zinc-800 h-[5%] text-xl font-bold flex flex-row justify-between tracking-widest self-stretch whitespace-nowrap max-md:max-w-full"
    >
      Chats
      <button @click="chatStore.sortChats"
        class="flex items-center px-4 py-2 font-medium tracking-wide text-zinc-800 capitalize transition-colors duration-300 transform bg-background-600 rounded-lg hover:bg-background-500 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
      >
        <svg
          class="w-5 h-5 mx-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
    <div class="h-[90%] overflow-scroll">
      <chatListing v-if="chatRender" v-for="(chat,index) in chats" :chat="chat" :key = "index"/>
    </div>
  </div>
</template>
