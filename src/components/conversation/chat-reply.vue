<script setup>
import { defineProps } from 'vue';
const props = defineProps(['chatMessage'])
print(props.chatMessage.message_time)
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
      {{ props.chatMessage.message_time.toDate() }}
    </div>
  </div>
</template>
