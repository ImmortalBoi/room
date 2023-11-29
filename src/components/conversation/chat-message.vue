<script setup>
import { defineProps } from 'vue';
const props = defineProps(['chatMessage'])
</script>
<template>
  <div class="flex w-[471px] max-w-full flex-col mt-9 self-end">
    <div
      class="flex w-full flex-col items-start gap-1 mt-9 pr-10 self-end max-md:max-w-full max-md:flex-wrap max-md:pr-5"
    >
      <div
        class="text-white text-2xl tracking-widest bg-primary-600 grow basis-auto pl-5 pr-3 py-4 rounded-3xl self-start max-md:max-w-full max-md:px-5"
      >
        {{ props.chatMessage.message_text }}
      </div>
      <div class="text-neutral-500 text-xl font-light tracking-wider mr-12 mt-1 max-md:mr-2.5">
        {{ props.chatMessage.message_time.toDate() }}
      </div>
    </div>
  </div>
</template>
