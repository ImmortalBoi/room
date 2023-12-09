<script setup>
import peopleListing from './people-listing.vue'
import { useChatStore } from '../../stores/chat'
import { storeToRefs } from 'pinia';

const chat = useChatStore()
const { dm_chats: chats } = storeToRefs(chat)
</script>

<template>
  <div
    class="shadow-sm h-[35%] bg-background-200 self-stretch flex grow flex-col mt-9 px-2 pt-9 pb-12 rounded-3xl"
  >
    <div
      class="text-text-900 h-[10%] text-3xl ml-5 font-bold tracking-widest self-stretch whitespace-nowrap"
    >
      Direct Chats
    </div>
    <div class="h-[90%] overflow-scroll">
      <!-- {{ user.dm_chats }}
      {{ user.key }} -->
      <peopleListing v-for="dm_chat in chats" :dm_chat="dm_chat" />
    </div>
  </div>
</template>
