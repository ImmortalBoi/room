<script setup>
import navbar from './components/navbar.vue'
import searchbar from './components/searchbar.vue'
import groupWrapper from './components/group/group-wrapper.vue'
import peopleWrapper from './components/people/people-wrapper.vue'
import conversationWrapper from './components/conversation/conversation-wrapper.vue'
import emptyConversation from './components/conversation/empty-conversation.vue'
import { onMounted } from 'vue'
import { useChatStore } from './stores/chat'
import { useUserStore } from './stores/user'

const chat = useChatStore()
const user = useUserStore()

chat.findChats();
</script>


<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <navbar />
      <div class="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full h-full max-md:ml-0">
        <div class="flex flex-col h-[90%] mt-12 max-md:max-w-full">
          <searchbar />
          <groupWrapper />
          <peopleWrapper />
        </div>
      </div>
      <div class="flex flex-col items-stretch w-[59%] h-full ml-5 max-md:w-full max-md:ml-0">
        <conversationWrapper v-if="user.currentChatID"/>
        <emptyConversation v-if="!user.currentChatID"/>
      </div>
    </div>
  </div>
</template>
