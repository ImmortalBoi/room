<script setup>
import { usePostStore } from '../../stores/post'
import postListing from './post-listing.vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const postStore = usePostStore()
const { postsDocs: posts, postRender: postRender } = storeToRefs(postStore)

postStore.findPosts()
</script>
<template>
  <!-- {{ posts }} -->
  <div class="flex flex-col">
    <postListing v-if="posts && postRender" v-for="(post,index) in posts" :post="post" :key="index"/>
  </div>
</template>
