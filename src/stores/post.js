import { defineStore } from 'pinia'
import { db } from '../firebase'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useUserStore } from './user'
import { nextTick } from 'vue'

export const usePostStore = defineStore('postData', {
  state: () => ({
    postsDocs: [],
    postsID: [],
    user: useUserStore(),
    postRender: true,
    unsubscribe: [] 
  }),
  actions: {
    findPosts() {
      const postsRef = collection(db, 'posts')
      const q1 = query(postsRef, where('post_visibility', '==', -2))
      const q2 = query(postsRef, where('post_visible_users', 'array-contains', this.user.id))
      const q3 = query(postsRef, where('post_user', '==', this.user.id))
      
      const unsubscribe1 = onSnapshot(q1, (querySnapshot) => {
        querySnapshot.docs.forEach(async (doc) => {
          if (!this.postsID.includes(doc.id)) {
            console.log("Passed the public Visibility")
            console.log(doc.id)
            this.postRender = false
            this.postsDocs.push(doc)
            this.postsID.push(doc.id)
            this.postsDocs.sort((a, b) => b.data().created_at - a.data().created_at)
            await nextTick()
            this.postRender = true
          }
        })
      })
      
      const unsubscribe2 = onSnapshot(q2, (querySnapshot) => {
        querySnapshot.docs.forEach(async (doc) => {
          if (!this.postsID.includes(doc.id)) {
            console.log("Passed the specific/friends visibility")
            console.log(doc.id)
            this.postRender = false
            this.postsDocs.push(doc)
            this.postsID.push(doc.id)
            this.postsDocs.sort((a, b) => b.data().created_at - a.data().created_at)
            await nextTick()
            this.postRender = true
          }
        })
      })
      
      const unsubscribe3 = onSnapshot(q3, (querySnapshot) => {
        querySnapshot.docs.forEach(async (doc) => {
          if (!this.postsID.includes(doc.id)) {
            console.log("Passed the ownership Visibility")
            console.log(doc.id)
            this.postRender = false
            this.postsDocs.push(doc)
            this.postsID.push(doc.id)
            this.postsDocs.sort((a, b) => b.data().created_at - a.data().created_at)
            await nextTick()
            this.postRender = true
          }
        })
      })
      
      // Return a function that unsubscribes from all three listeners
      this.unsubscribe = [
        unsubscribe1,
        unsubscribe2,
        unsubscribe3
      ]
    },
    unsubscribe(){
      this.unsubscribe[0]()
      this.unsubscribe[1]()
      this.unsubscribe[2]()
    }
    // async sortChats() {
    //   this.chatRender = false
    //   this.chats.sort((a, b) => a.last_message - b.last_message)
    //   await nextTick();
    //   this.chatRender = true
    // }
  }
})
