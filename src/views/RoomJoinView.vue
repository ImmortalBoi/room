<script setup>
import { ref, onMounted } from 'vue'

import { useRoomStore } from '../stores/room'
import { storeToRefs } from 'pinia'
import router from '../router'
import navbar from '../components/navbar.vue'

const roomStore = useRoomStore()
const {
  peerConnection: peerConnection,
  localStream: localStream,
  remoteStream: remoteStream,
  roomDialog: roomDialog,
  roomId: roomId,
  currentRoom: currentRoom
} = storeToRefs(roomStore)

onMounted(async () => {
  await roomStore.openUserMedia()
  await roomStore.joinRoomById(roomId.value)
  localVideo.value.srcObject = localStream.value
  remoteVideo.value.srcObject = remoteStream.value
  // Update button states based on the store state or desired behavior
  isCameraDisabled.value = true
  isHangupDisabled.value = false
})
const isCameraDisabled = ref(false)
const isHangupDisabled = ref(true)
const localVideo = ref(null)
const remoteVideo = ref(null)

// // Define methods that call the store actions and update button states
// const openUserMedia = async () => {
  
//   localVideo.value.srcObject = localStream.value
//   remoteVideo.value.srcObject = remoteStream.value
//   // Update button states based on the store state or desired behavior
//   isCameraDisabled.value = true
//   isHangupDisabled.value = false
// }

const hangUp = async () => {
  await roomStore.hangUp(localVideo.value)
  router.push('/chat')
  // Reset button states
  isCameraDisabled.value = false
  isHangupDisabled.value = true
  localVideo.value.srcObject = null
  remoteVideo.value.srcObject = null
}
// You can define additional methods for joinRoomById and other logic as needed
</script>
<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <div class="bg-background-200 w-[90%] rounded-lg overflow-scroll px-4 flex flex-col items-center">
        {{ currentRoom }}
        <div class="flex flex-row p-2">
          <video ref="localVideo" muted autoplay playsinline class="mx-2"></video>
          <video ref="remoteVideo" autoplay playsinline></video>
        </div>

        <div class="flex flex-row items-center">
          <button
            id="cameraBtn"
            class="bg-primary-600 p-2 rounded"
            @click="openUserMedia"
            :disabled="isCameraDisabled"
          >
            <svg
              class="w-6 h-6 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              />
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"
              />
            </svg>
          </button>
          <button
            id="hangupBtn"
            class="bg-primary-600 mx-2 p-2 rounded text-white"
            @click="hangUp"
            :disabled="isHangupDisabled"
          >
            Hang Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
