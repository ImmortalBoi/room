<script setup>
import chatReply from './chat-reply.vue'
import chatMessage from './chat-message.vue'
import { useDocument } from 'vuefire'
import { collection, doc, addDoc, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'
import { useChatStore } from '../../stores/chat'
import { reactive, ref, watch, defineProps } from 'vue'

const user = useUserStore()
const chat = useChatStore()
let partnerData = reactive({})
let chatData = reactive([])
let partnerID = ref('')
let text = ref('')
const props = defineProps(['ChatID'])

let conversationRef = doc(collection(db, 'chats'), props.ChatID)
let { data: conversation, promise } = useDocument(conversationRef)
promise.value.then((conversation) => {
  console.log('changed')
  findPartnerData()
  findMessageData()
})

watch(conversation, (newConversation, oldConversation) => {
  console.log('conversation data changed')
  findPartnerData()
  findMessageData()
})


function findPartnerData() {
  if (conversation.data.value) {
    for (const person in conversation.data.value.chat_users) {
      // console.log(conversation.data.value.chat_users[person])
      // console.log(user.id)
      if (conversation.data.value.chat_users[person] !== user.id) {
        const { data: partner, promise } = useDocument(
          doc(collection(db, 'users'), conversation.data.value.chat_users[person])
        )
        promise.value.then((partner) => {
          Object.assign(partnerData, partner)
          partnerID.value = conversation.data.value.chat_users[person]
          // console.log(partnerData.user_nickname)
        })
      }
    }
  }
}

function findMessageData() {
  if(conversation.data.value){
    for (const _message in conversation.data.value.chat_messages) {
      console.log(conversation.data.value.chat_messages[_message])
      const { data: message, promise } = useDocument(
        doc(collection(db, 'messages'), conversation.data.value.chat_messages[_message])
      )
      promise.value.then((message) => {
        // Check if message is already in chatData
        const messageExists = chatData.some(chatMessage => chatMessage.id === message.id);
        // If message doesn't exist in chatData, push it
        if (!messageExists) {
          chatData.unshift(message);
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
  await updateDoc(conversationRef,{
    last_message: new Timestamp(new Date().getTime() / 1000, 0)
  })
  chat.sortChats()
}
</script>

<template>
  <div
    class="relative shadow-sm bg-background-200 flex flex-col w-full h-[90%] mt-11 mx-auto rounded-3xl max-md:max-w-full max-md:mt-10"
  >
    <div
      class="flex flex-row items-center h-[10%] mt-1 pl-9 pr-6"
    >
            <div class="text-text-900 text-xl font-semibold ">
              <span v-if="partnerData !== ''">{{ conversation.chat_name }}</span>
            </div>
    </div>

    <hr class="border-1 border-background-800 w-[90%] self-center" />
    <div class="flex flex-col-reverse h-[75%] overflow-scroll">
      <template v-if="chatData" v-for="(chat,index) in chatData">
        <chatMessage v-if="chat.message_user === user.id" :chat-message="chat" :key="index" />
        <chatReply v-if="chat.message_user === partnerID" :chat-message="chat" :key="index"/>
      </template>
    </div>

    <div
      class="h-[5%] flex w-full items-start justify-between gap-5 px-6"
    >
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
      </div>
    </div>
  </div>
</template>
