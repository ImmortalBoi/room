<script setup>
import { defineProps, ref } from 'vue'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const props = defineProps(['chat'])
const chat = useDocument(doc(collection(db, 'chats'), props.chat)) 
console.log(chat)
</script>
<template>
  <div @click="user.setChat(props.chat)"
    class="self-stretch flex w-full items-start justify-between gap-5 mt-5 py-2 max-md:flex-wrap max-md:justify-center bg-primary-600 hover:bg-primary-700 rounded-lg px-3 hover:cursor-pointer"
  >
    <div class="flex flex-col my-auto">
      <div v-if="chat"
        class="text-white text-md  tracking-wider self-stretch whitespace-nowrap"
      >
        {{ chat.chat_name }}
      </div>
    </div>
  </div>
</template>
