<script setup>
import { defineProps, ref } from 'vue'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const props = defineProps(['dm_chat'])
const user_chat= useDocument(doc(collection(db, 'chats'), props.dm_chat))
</script>

<template>
  <div @click="user.setChat(props.dm_chat)"
    class="flex w-full items-start justify-between gap-5 mt-3 py-2 self-start max-md:flex-wrap hover:bg-secondary-100 rounded-lg px-3 hover:cursor-pointer"
  >
    <div class="flex max-w-full items-start justify-between gap-5 self-start">
      <div class="self-center flex flex-col my-auto">
        <div
          class="text-text-950 text-xl font-semibold tracking-wider self-stretch whitespace-nowrap"
        >
          {{ user_chat.chat_name }}
        </div>
      </div>
    </div>
  </div>
</template>
