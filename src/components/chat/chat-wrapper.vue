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
    class="shadow-sm h-full bg-background-200 self-stretch flex flex-col w-full px-5 py-4 rounded-3xl max-md:max-w-full max-md:px-5"
  >
    <div
      class="text-zinc-800 h-[5%] border-b border-primary-500 pb-9 text-xl font-bold flex flex-row justify-between tracking-widest self-stretch whitespace-nowrap max-md:max-w-full"
    >
      Chats
    </div>
    <div class="h-[90%] overflow-scroll">
      <chatListing v-if="chatRender" v-for="(chat,index) in chats" :chat="chat" :key = "index"/>
    </div>
  </div>
</template>
