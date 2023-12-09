import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useUserStore } from './user'

export const useChatStore = defineStore('chat', {
  state: () => ({
    dm_chats: [],
    gm_chats: [],
    user: useUserStore(),
  }),
  actions: {
    async findChats(id) {
      const chatsRef = collection(db, 'chats')
      const q = query(chatsRef, where('chat_users', 'array-contains', this.user.id))
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach((docu) => {
          console.log(docu.data())
          if (docu.data().type == 'dm') {
            console.log(this.dm_chats.values)
            this.dm_chats.push(docu.id)
          } else {
            this.gm_chats.push(docu.id)
          }
        })
      })
    }
  }
})
