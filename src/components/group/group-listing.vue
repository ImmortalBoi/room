<script setup>
import { defineProps, ref } from 'vue'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'

const user = useUserStore()
const props = defineProps(['gm_chat'])
const group_chat = useDocument(doc(collection(db, 'chats'), props.gm_chat))
</script>
<template>
  <div @click="user.setChat(props.gm_chat)"
    class="self-stretch flex w-full items-start justify-between gap-5 mt-5 max-md:flex-wrap max-md:justify-center hover:bg-secondary-100 rounded-lg px-3 hover:cursor-pointer"
  >
    <div class="flex flex-col my-auto">
      <div
        class="text-text-950 text-xl font-semibold tracking-wider self-stretch whitespace-nowrap"
      >
      {{ group_chat.chat_name }}
      </div>
    </div>
  </div>
</template>
