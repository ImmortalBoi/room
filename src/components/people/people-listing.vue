<script setup>
import { defineProps } from 'vue'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const props = defineProps(['dm_chat'])
const chat = useDocument(doc(collection(db, 'chats'), props.dm_chat))
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
          {{ chat.chat_name }}
        </div>
        <div
          class="text-text-700 text-base font-light tracking-wider self-stretch whitespace-nowrap mt-1.5"
        >
          You have to report it...
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-2 self-start">
      <div class="text-text-800 text-base font-light tracking-normal whitespace-nowrap self-end">
        Today, 2.40pm
      </div>
    </div>
  </div>
</template>
