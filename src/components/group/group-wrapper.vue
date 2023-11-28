<script setup>
import groupListing from './group-listing.vue'
</script>
<template>
  <div
    class="shadow-sm h-[35%] bg-background-200 self-stretch flex flex-col w-full mt-9 px-8 py-7 rounded-3xl max-md:max-w-full max-md:px-5"
  >
    <div
      class="text-zinc-800 h-[10%] text-3xl font-bold tracking-widest self-stretch whitespace-nowrap max-md:max-w-full"
    >
      Group Chats
    </div>
    <div class="h-[90%] overflow-scroll">
      <groupListing />
      <groupListing />
      <groupListing />
      <groupListing />
      <groupListing />
      <groupListing />
      <groupListing />

    </div>
  </div>
</template>
