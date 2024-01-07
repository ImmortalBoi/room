<script setup>
import chatListing from './chat-listing.vue'
import { onMounted, watch, ref, nextTick } from 'vue'
import { useChatStore } from '../../stores/chat'
import { addDoc, collection, Timestamp, doc, getDoc } from 'firebase/firestore'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../stores/user'
import { db } from '../../firebase'

const user = useUserStore()
const friends = ref([])
const toggleSettings = ref(false)
const tagCheckboxes = ref([])
const friendIDs = ref([])
const gcName = ref('')
getFriends()

async function getFriends() {
  friendIDs.value = (await getDoc(doc(collection(db, 'users'), user.id))).data().friends
  for (const friend in friendIDs.value) {
    const res = (await getDoc(doc(collection(db, 'users'), friendIDs.value[friend]))).data()
    friends.value.push(res)
  }
  tagCheckboxes.value = Array.from({ length: friends.value.length }, () => false)
}

async function createNewGC(){
  chatRender.value = false
  const gc_users = friendIDs.value.filter((value, index) => tagCheckboxes.value[index])
  gc_users.push(user.id.valueOf())
  // console.log(gc_users)
  await addDoc(collection(db, 'chats'), {
    chat_name: gcName.value,
    chat_pfp: '',
    type: 'gm',
    chat_users: gc_users,
    last_message: new Timestamp(new Date().getTime() / 1000, 0),
    chat_messages: []
  })
  chatRender.value = true
  toggleSettings.value = false
}

const chatStore = useChatStore()
const { chats: chats, chatRender: chatRender } = storeToRefs(chatStore)
onMounted(chatStore.findChats)
</script>
<template>
  <div
    class="shadow-sm h-full bg-background-200 self-stretch flex flex-col w-full px-5 py-4 rounded-3xl max-md:max-w-full max-md:px-5"
  >
    <div class="flex flex-col">
      <div
        class="text-zinc-800 border-b border-primary-500 text-xl font-bold flex flex-row items-center justify-between"
      >
        <span>Chats</span>
        <button
          v-if="!toggleSettings.valueOf()"
          @click="toggleSettings = !toggleSettings.valueOf()"
          class="bg-primary-600 hover:bg-primary-700 px-2 rounded text-white"
        >
          +
        </button>
        <div v-if="toggleSettings.valueOf()">
          <button
            @click="createNewGC()"
            class="bg-primary-600 hover:bg-primary-700 px-2 rounded text-white font-light"
          >
            Create
          </button>
          <button
            @click="toggleSettings = !toggleSettings.valueOf()"
            class="bg-accent-600 hover:bg-accent-700 px-2 rounded text-white font-light"
          >
            x
          </button>
        </div>
      </div>
      <div v-if="toggleSettings.valueOf()" class="flex flex-col px-2">
        <input v-model="gcName" placeholder="Groupchat Name"/>
        <div class="my-2">New Groupchat People</div>
        <div class="flex items-center mb-4 pl-1" v-if="friends" v-for="(friend, index) in friends">
          <input
            v-model="tagCheckboxes[index]"
            :id="'default-checkbox' + index"
            type="checkbox"
            value=""
            class="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
          />
          <label :for="'default-checkbox' + index" class="ms-2 text-sm font-medium text-gray-900">{{
            friend.user_nickname
          }}</label>
        </div>
      </div>
    </div>
    <div class="h-[90%] overflow-scroll">
      <chatListing v-if="chatRender" v-for="(chat, index) in chats" :chat="chat" :key="index" />
    </div>
  </div>
</template>
