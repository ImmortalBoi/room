import { defineStore } from 'pinia'
import { db } from '../firebase'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'
import { nextTick } from 'vue'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    currentChatID: '',
  }),

  actions: {
    async setChat(id) {
      console.log('chat ID set: ', id)
      this.currentChatID = '';
      await nextTick()
      this.currentChatID = id
    }
  }
})
