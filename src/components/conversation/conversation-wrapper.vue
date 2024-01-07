<script setup>
import chatReply from './chat-reply.vue'
import chatMessage from './chat-message.vue'
import { useDocument } from 'vuefire'
import { onSnapshot, query, where, collection, doc, addDoc, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'
import { useRoomStore } from '../../stores/room'
import { useChatStore } from '../../stores/chat'
import { reactive, ref, watch, defineProps } from 'vue'
import router from '../../router'

const roomStore = useRoomStore()
const user = useUserStore()
const chat = useChatStore()
let chatData = reactive([])
let chatUserIDs = ref([])
let text = ref('')
const props = defineProps(['ChatID'])
const roomExists = ref(false)
const roomID = ref('')
checkRoomExistance()

let conversationRef = doc(collection(db, 'chats'), props.ChatID)
let { data: conversation, promise } = useDocument(conversationRef)
promise.value.then(() => {
  findChatUsers()
})

watch(conversation, (newConversation, oldConversation) => {
  console.log('conversation data changed')
  findMessageData()
})

function findChatUsers() {
  for (const person in conversation.data.value.chat_users) {
    chatUserIDs.value.push(conversation.data.value.chat_users[person])
    // console.log(conversation.data.value.chat_users[person])
    // console.log(user.id)
    // if (conversation.data.value.chat_users[person] !== user.id) {
    //   useDocument(
    //     doc(collection(db, 'users'), conversation.data.value.chat_users[person])
    //   ).value.then((partner) => {
    //     Object.assign(partnerData, partner)
    //     partnerID.value = conversation.data.value.chat_users[person]
    //     // console.log(partnerData.user_nickname)
    //   })
    // }
  }
}

function findMessageData() {
  if (conversation.data.value) {
    for (const _message in conversation.data.value.chat_messages) {
      console.log(conversation.data.value.chat_messages[_message])
      const { data: message, promise } = useDocument(
        doc(collection(db, 'messages'), conversation.data.value.chat_messages[_message])
      )
      promise.value.then((message) => {
        // Check if message is already in chatData
        const messageExists = chatData.some((chatMessage) => chatMessage.id === message.id)
        // If message doesn't exist in chatData, push it
        if (!messageExists) {
          chatData.unshift(message)
        }
      })
    }
  }
}

async function sendMessage() {
  await addDoc(collection(db, 'messages'), {
    message_chat: props.ChatID,
    message_text: text.value,
    message_time: new Timestamp(new Date().getTime() / 1000, 0),
    message_user: user.id
  }).then((message) => {
    text.value = ''
    console.log(conversationRef)
    updateDoc(conversationRef, {
      chat_messages: arrayUnion(message.id)
    })
  })
  await updateDoc(conversationRef, {
    last_message: new Timestamp(new Date().getTime() / 1000, 0)
  })
  chat.sortChats()
}


function checkRoomExistance() {
  const roomsRef = collection(db, 'rooms');
  const roomQuery = query(roomsRef, where('chatID', '==', props.ChatID));

  const unsubscribe = onSnapshot(roomQuery, (snapshot) => {
    // Assume the room does not exist initially
    let exists = false;
    
    // Go through the documents returned by the query
    snapshot.forEach((doc) => {
      roomID.value = doc.id
      // If a document is found, set exists to true
      exists = true;
    });

    // Update the roomExists ref with the existence of the room
    roomExists.value = exists;

    // If you need to log the details of the room
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New room: ", change.doc.data());
      }
      if (change.type === "modified") {
        console.log("Modified room: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed room: ", change.doc.data());
      }
    });
  });

  // To stop listening to changes, you can call unsubscribe()
  // For example, when the component is unmounted
  // unsubscribe();
}

const createRoom = async () => {
  router.push('/roomCreate')
  // Update button states if needed
}

const joinRoom = async () => { 
  roomStore.roomId = roomID.value
  router.push('/roomJoin')
  // Update button states if needed
}
</script>

<template>
  <div
    class="relative shadow-sm bg-background-200 flex flex-col w-full h-[90%] mt-11 mx-auto rounded-3xl max-md:max-w-full max-md:mt-10"
  >
    <div class="flex flex-row items-center justify-between h-[10%] mt-1 pl-9 pr-6">
      <div class="text-text-900 text-xl font-semibold">
        <span>{{ conversation.chat_name }}</span>
      </div>
      <div>
        <button id="createBtn" @click="createRoom" v-if="!roomExists.valueOf()">
          Create Room
        </button>
        <button id="joinBtn" @click="joinRoom" v-if="roomExists.valueOf()">Join Room</button>
      </div>
    </div>

    <hr class="border-1 border-background-800 w-[90%] self-center" />
    <div class="flex flex-col-reverse h-[75%] overflow-scroll">
      <template v-if="chatData" v-for="(chat, index) in chatData">
        <chatMessage v-if="chat.message_user === user.id" :chat-message="chat" :key="index" />
        <chatReply v-if="chat.message_user !== user.id" :chat-message="chat" :key="index" />
      </template>
    </div>

    <div class="h-[5%] flex w-full items-start justify-between gap-5 px-6">
      <div
        class="bg-background-50 bg-opacity-90 flex w-full basis-auto items-start justify-between gap-5 px-2 py-2 rounded-xl mt-2 self-start max-md:flex-wrap max-md:px-5"
      >
        <textarea
          @keyup.enter="sendMessage"
          v-model="text"
          type="text"
          class="text-zinc-800 bg-background-50 text-sm font-light tracking-wider self-center grow basis-auto focus:outline-none"
          placeholder="Type your message here..."
        ></textarea>
        <button></button>
      </div>
    </div>
  </div>
</template>
