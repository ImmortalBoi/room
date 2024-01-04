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
const user = useDocument(userRef).promise.value.then((user)=>{
    console.log(user.friends)
    excludedUsers.value = [id.value, ...user.friends, ...user.friend_requests]
})
const filteredUsers = ref([])
const users = useCollection(collection(db, 'users')).promise.value.then(users=>{
    console.log(users)
    filteredUsers.value = users.filter(user => !excludedUsers.value.includes(user.id))
})
</script>
<template>
  <div
    class="bg-background-50 border-primary-500 border-b flex flex-col w-[65%] rounded overflow-scroll"
  >
    <div class="p-3 font-bold text-xl">Add friend</div>
    <personListing v-if="filteredUsers" v-for="user in filteredUsers" :user="user" :id="id"/>
  </div>
</template>
