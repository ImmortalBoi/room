import { defineStore } from 'pinia'
import { db } from '../firebase'
import { useDocument } from 'vuefire'
import { collection, doc } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: 'TD6vm3X0klMCMQmN7Hde',
    userInfo: useDocument(doc(collection(db, 'users'), 'TD6vm3X0klMCMQmN7Hde')),
    currentChatID: '',
    key: 0
  }),
  actions: {
    reRender() {
      this.key += 1
      console.log(this.key)
    },
    setChat(id) {
      console.log('chat ID set: ', id)
      this.currentChatID = id
    }
  }
})
