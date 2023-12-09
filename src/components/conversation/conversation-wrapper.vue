<script setup>
import chatReply from './chat-reply.vue'
import chatMessage from './chat-message.vue'
import { useDocument } from 'vuefire'
import { collection, doc, addDoc, Timestamp, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'
import { reactive, ref, watch } from 'vue'

const user = useUserStore()
let partnerData = reactive({})
let chatData = reactive([])
let partnerID = ref('')
let text = ref('')

let conversationRef = doc(collection(db, 'chats'), user.currentChatID)
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
    for (const _message in conversation.data.value.chat_messages.slice(0,-1)) {
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
    message_chat: user.currentChatID,
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
}
</script>
<template>
  <div
    class="relative shadow-sm bg-background-200 flex flex-col w-full h-[90%] mt-11 mx-auto rounded-3xl max-md:max-w-full max-md:mt-10"
  >
    <div
      class="self-stretch flex flex-col-reverse w-full h-[10%] mt-1 pl-9 pr-6 max-md:max-w-full max-md:px-5"
    >
      <div class="self-stretch flex w-full items-start justify-between gap-5 max-md:flex-wrap">
        <div class="self-stretch flex w-[353px] max-w-full items-start justify-between gap-5">
          <div class="self-center flex flex-col grow shrink-0 basis-auto my-auto">
            <div class="text-text-900 text-3xl font-semibold tracking-widest self-stretch">
              <span v-if="partnerData !== ''">{{ partnerData.user_nickname }}</span>
            </div>
            <div class="text-text-800 text-xl font-light tracking-wider self-stretch mt-3.5">
              Online - Last seen, 2.02pm
            </div>
          </div>
        </div>
        <div
          class="self-center flex w-[193px] max-w-full items-start justify-between gap-5 my-auto max-md:justify-center"
        ></div>
      </div>
    </div>

    <hr class="h-px mt-3 border-1 border-background-800 w-[90%] self-center" />
    <div class="flex flex-col-reverse absolute inset-x-0 bottom-32 h-[75%] overflow-scroll">
      <template v-if="chatData" v-for="(chat,index) in chatData">
        <chatMessage v-if="chat.message_user === user.id" :chat-message="chat" :key="index" />
        <chatReply v-if="chat.message_user === partnerID" :chat-message="chat" :key="index"/>
      </template>
    </div>

    <div
      class="self-stretch absolute inset-x-0 h-[7%] bottom-6 flex w-full items-start justify-between gap-5 mt-14 px-6 max-md:flex-wrap my-6"
    >
      <div
        class="bg-background-50 bg-opacity-90 flex w-full basis-auto items-start justify-between gap-5 pl-6 pr-6 py-5 rounded-3xl self-start max-md:flex-wrap max-md:px-5"
      >
        <textarea
          @keyup.enter="sendMessage"
          v-model="text"
          type="text"
          class="text-zinc-800 bg-background-50 text-2xl font-light tracking-wider self-center grow basis-auto my-auto focus:outline-none"
          placeholder="Type your message here..."
        ></textarea>
      </div>
    </div>
  </div>
</template>
