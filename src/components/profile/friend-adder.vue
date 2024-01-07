<script setup>
import personListing from './person-listing.vue'
import { useUserStore } from '../../stores/user'
import { storeToRefs } from 'pinia'
import { useDocument, useCollection } from 'vuefire'
import { doc, collection } from 'firebase/firestore'
import { db } from '../../firebase'
import { ref } from 'vue'

const userStore = useUserStore()
const { id: id } = storeToRefs(userStore)
const userRef = doc(collection(db, 'users'), id.value)
const excludedUsers = ref([])
const filteredUsers = ref([])
const render = ref(false)
const user = useDocument(userRef)
  .promise.value.then((user) => {
    console.log(user.friends)
    excludedUsers.value = [id.value, ...user.friends, ...user.friend_requests]
  })
  .then(() => {
    useCollection(collection(db, 'users'))
      .promise.value.then((users) => {
        console.log(users)
        filteredUsers.value = users.filter((user) => !excludedUsers.value.includes(user.id))
      })
      .then(() => (render.value = true))
  })
</script>
<template>
  <div
    class="bg-background-50 border-primary-500 border-b flex flex-col w-[65%] rounded overflow-scroll"
  >
    <div class="p-3 font-bold text-xl">Add friend</div>
    <personListing v-if="render.valueOf()" v-for="user in filteredUsers" :user="user" :id="id" />
  </div>
</template>
