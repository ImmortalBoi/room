<script setup>
import { defineProps, ref } from 'vue'
import { useDocument } from 'vuefire'
import { doc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
const props = defineProps(['chatMessage'])
const nickname = ref('')
function getNickname() {
  useDocument(doc(collection(db, 'users'), props.chatMessage.message_user)).promise.value.then(
    (doc) => {
      nickname.value = doc.user_nickname
    }
  )
}

getNickname()
function formatDate(date) {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // Convert date to MM/DD format
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dateStr = month + '/' + day

  // Convert time to HH:MM am/pm format
  const hours = date.getHours()
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const ampm = hours >= 12 ? 'pm' : 'am'
  const timeStr = ((hours + 11) % 12) + 1 + ':' + minutes + ' ' + ampm

  if (dateStr === today.getMonth() + 1 + '/' + today.getDate()) {
    return 'Today at ' + timeStr
  } else if (dateStr === yesterday.getMonth() + 1 + '/' + yesterday.getDate()) {
    return 'Yesterday at ' + timeStr
  } else {
    return dateStr + ' at ' + timeStr
  }
}
</script>
<template>
  <div class="flex flex-col self-end">
    <div class="text-primary-600 text-xs font-light self-end pr-10 tracking-wider mt-1">
      {{ nickname }}
    </div>
    <div
      class="flex w-full flex-col items-start gap-1 mt-2 pl-10 pr-10 self-end max-md:flex-wrap max-md:pr-5"
    >
      <div
        class="text-white text-sm self-end tracking-widest bg-primary-600 grow basis-auto pl-3 pr-2 pt-3 pb-2 rounded-xl max-md:max-w-full max-md:px-5"
      >
        {{ props.chatMessage.message_text }}
      </div>
      <div class="text-neutral-500 text-xs font-light tracking-wider mt-1">
        {{ formatDate(new Date(props.chatMessage.message_time.seconds * 1000)) }}
      </div>
    </div>
  </div>
</template>
