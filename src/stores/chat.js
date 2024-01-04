import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore'
import { useUserStore } from './user'
import { nextTick } from 'vue'

export const useChatStore = defineStore('chat', {
  state: () => ({
    chats: [],
    user: useUserStore(),
    chatRender: true
  }),
  actions: {
    findChats() {
      const chatsRef = collection(db, 'chats')
      const q = query(
        chatsRef,
        where('chat_users', 'array-contains', this.user.id),
        orderBy('last_message', 'desc') // Order the results by 'last_message' in descending order
      )

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.chats = querySnapshot.docs.map((doc) => doc.id)
      })

      // Remember to unsubscribe when you no longer want to listen for updates
      return unsubscribe
    },
    async sortChats() {
      this.chatRender = false
      this.chats.sort((a, b) => a.last_message - b.last_message)
      await nextTick();
      this.chatRender = true
    }
  }
})
