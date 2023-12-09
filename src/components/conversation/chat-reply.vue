<script setup>
import { defineProps } from 'vue';
const props = defineProps(['chatMessage'])

function formatDate(date) {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Convert date to MM/DD format
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = month + '/' + day;

    // Convert time to HH:MM am/pm format
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'pm' : 'am';
    const timeStr = ((hours + 11) % 12 + 1) + ':' + minutes + ' ' + ampm;

    if (dateStr === (today.getMonth() + 1) + '/' + today.getDate()) {
        return 'Today at ' + timeStr;
    } else if (dateStr === (yesterday.getMonth() + 1) + '/' + yesterday.getDate()) {
        return 'Yesterday at ' + timeStr;
    } else {
        return dateStr + ' at ' + timeStr;
    }
}
</script>
<template>
  <div
    class="flex w-[596px] max-w-full items-start flex-col gap-0 mt-14 self-start max-md:flex-wrap max-md:mt-10 ml-10"
  >
    <div
      class="text-zinc-800 text-2xl tracking-widest bg-secondary-300 grow basis-auto pl-5 pr-3 py-5 rounded-3xl self-start max-md:max-w-full max-md:px-5"
    >
      {{ props.chatMessage.message_text }}
    </div>
    <div class="text-text-800 text-xl font-light tracking-wider mt-2 max-md:ml-2.5">
      {{ formatDate(new Date(props.chatMessage.message_time.seconds * 1000)) }}
    </div>
  </div>
</template>
