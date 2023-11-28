import { defineStore } from 'pinia'
import { db } from '../firebase'
import { useDocument } from 'vuefire'
import { collection, query, where, getDocs, doc } from 'firebase/firestore'
import { ref } from 'vue'

export const useUserStore = defineStore('counter', () => {
  const id = 'TD6vm3X0klMCMQmN7Hde'
  const userInfo = ref(useDocument(doc(collection(db, 'users'), id)))
  const currentChatID = ref('')
  const dm_chats = ref([])
  const gm_chats = ref([])

  function findChats() {
    const chatsRef = collection(db, 'chats')
    // const userRef = doc(db, "users", this.id);
    const q = query(chatsRef, where('chat_users', 'array-contains', id))
    getDocs(q).then((querySnapshot) => {
        console.log(querySnapshot.empty)
      querySnapshot.forEach((docu) => {
          console.log(docu)
        if (docu.data().type == 'dm') {
          this.dm_chats.push(docu.id)
        } else {
          this.gm_chats.push(docu.id)
        }
      })
    })
  }

  function setChat(id){
    console.log("chat ID set: ", id)
    this.currentChatID = id
  }

  return {id , userInfo, dm_chats, gm_chats, findChats, setChat, currentChatID}
})
