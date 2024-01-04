<script setup>
import navbar from '../components/navbar.vue'
import friendAdder from '../components/profile/friend-adder.vue';
import profileCard from '../components/profile/profile-card.vue'
// import { useUserStore } from './stores/user'
// import { storeToRefs } from 'pinia'
// import { ref, nextTick, watch } from 'vue'

// const user = useUserStore()
</script>

<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-row items-stretch">
      <navbar />
      <profileCard />
      <friendAdder />
    </div>
  </div>
</template>
