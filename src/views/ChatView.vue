<script setup>
import navbar from '../components/navbar.vue'
import chatWrapper from '../components/chat/chat-wrapper.vue'
import conversationWrapper from '../components/conversation/conversation-wrapper.vue'
import emptyConversation from '../components/conversation/empty-conversation.vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ref, nextTick, watch } from 'vue'

const user = useUserStore()
const { currentChatID: currentChatID } = storeToRefs(user)
let renderComponent = ref(true)

const forceRender = async () => {
  renderComponent.value = false
  await nextTick()
  renderComponent.value = true
}

watch(user.currentChatID, () => {
  forceRender()
})
</script>

<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <navbar />
      <div class="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full h-full max-md:ml-0">
        <div class="flex flex-col h-[90%] mt-12 max-md:max-w-full">
          <chatWrapper />
        </div>
      </div>
      <div class="flex flex-col items-stretch w-[59%] h-full ml-5 max-md:w-full max-md:ml-0">
        <conversationWrapper
          v-if="renderComponent && user.currentChatID"
          :ChatID="user.currentChatID"
        />
        <emptyConversation v-if="!currentChatID" />
      </div>
    </div>
  </div>
</template>
