<script setup>
import navbar from '../components/navbar.vue'
import postWrapper from '../components/post/post-wrapper.vue';
import postAdder from '../components/post/post-adder.vue'
// import searchbar from './components/searchbar.vue'
// import { useUserStore } from './stores/user'
// import { storeToRefs } from 'pinia'
// import { ref, nextTick, watch } from 'vue'

// const user = useUserStore()
</script>

<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <navbar />
      <div class="bg-background-200 w-[90%] rounded-lg overflow-scroll px-4">
        <postAdder />
        <postWrapper />
      </div>
    </div>
  </div>
</template>
