<script setup>
import chatReply from './chat-reply.vue'
import chatMessage from './chat-message.vue'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useUserStore } from '../../stores/user'
import { ref } from 'vue'

const user = useUserStore()
const conversation = useDocument(doc(collection(db, 'chats'), user.currentChatID))
const partnerID = ref()
const partner = useDocument(doc(collection(db, 'users'), partnerID))

function findPartnerName(){
  console.log(conversation.data.value.chat_users)
  for (const person in conversation.data.value.chat_users) {
    console.log(person)
    if (person !== user.id){
      partnerID.value = conversation.data.value.chat_users[person]
    }
  }
}


</script>
<template>
  <div
    class="relative shadow-sm bg-background-200 flex flex-col w-full h-[90%] mt-11 mx-auto rounded-3xl max-md:max-w-full max-md:mt-10"
  >
    <div class="self-stretch flex flex-col-reverse w-full h-[10%] pl-9 pr-6 max-md:max-w-full max-md:px-5">
      <div class="self-stretch flex w-full items-start justify-between gap-5 max-md:flex-wrap">
        <div class="self-stretch flex w-[353px] max-w-full items-start justify-between gap-5">
          <div class="self-center flex flex-col grow shrink-0 basis-auto my-auto">
            <div class="text-text-900 text-3xl font-semibold tracking-widest self-stretch">
              {{ findPartnerName(), partner.data.value.user_nickname }}
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

    <hr class="h-px my-8 bg-text-900 border-0 dark:bg-gray-700 w-[90%] self-center" />
    <div class="flex flex-col-reverse absolute inset-x-0 bottom-32 h-[75%] overflow-scroll">

      <chatMessage />
      <chatReply />

      <chatMessage />
      <chatReply />
      <chatReply />
      <chatReply />

    </div>

    <div
      class="self-stretch absolute inset-x-0 h-[7%] bottom-0 flex w-full items-start justify-between gap-5 mt-14 px-6 max-md:flex-wrap my-6"
    >
      <div
        class="bg-background-50 bg-opacity-90 flex w-full basis-auto items-start justify-between gap-5 pl-6 pr-6 py-5 rounded-3xl self-start max-md:flex-wrap max-md:px-5"
      >
          <input
            type="text"
            class="text-zinc-800 bg-background-50 text-2xl font-light tracking-wider self-center grow shrink basis-auto my-auto"
            placeholder="Type your message here..."
          />
      </div>
    </div>
  </div>
</template>
