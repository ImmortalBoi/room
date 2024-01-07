import { defineStore } from 'pinia'
import { db } from '../firebase'
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  setDoc,
  deleteDoc,
  where,
  updateDoc
} from 'firebase/firestore'

import { watchEffect } from 'vue'
import { nextTick } from 'vue'

export const useRoomStore = defineStore('room', {
  state: () => ({
    peerConnection: null,
    localStream: null,
    remoteStream: null,
    roomDialog: null,
    roomId: null,
    currentRoom: null,
    configuration: {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
      ],
      iceCandidatePoolSize: 10
    }
  }),

  actions: {
    init() {
      this.roomDialog = new mdc.dialog.MDCDialog(document.querySelector('#room-dialog'))
    },

    async createRoom(chatID) {
      const roomRef = doc(collection(db, 'rooms'))
      console.log('Create this.peerConnection with this.configuration: ', this.configuration)
      this.peerConnection = new RTCPeerConnection(this.configuration)

      this.registerPeerConnectionListeners()

      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
        console.log("Track being added: ", track)
      });
    
      // Code for collecting ICE candidates below
      const callerCandidatesCollection = collection(roomRef, 'callerCandidates')

      this.peerConnection.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!')
          return
        }
        console.log('Got candidate: ', event.candidate)
        addDoc(callerCandidatesCollection, event.candidate.toJSON())
      })
      // Code for collecting ICE candidates above

      // Code for creating a room below
      const offer = await this.peerConnection.createOffer()
      await this.peerConnection.setLocalDescription(offer)
      console.log('Created offer:', offer)

      const roomWithOffer = { offer: { type: offer.type, sdp: offer.sdp }, chatID: chatID }
      await setDoc(roomRef, roomWithOffer)
      this.roomId = roomRef.id
      console.log(`New room created with SDP offer. Room ID: ${this.roomId}`)
      // Code for creating a room above

      this.peerConnection.addEventListener('track', (event) => {
        console.log('Got remote track:', event.streams[0])
        event.streams[0].getTracks().forEach((track) => {
          console.log('Add a track to the remoteStream:', track)
          this.remoteStream.addTrack(track)
        })
      })

      // Listening for remote session description below
      onSnapshot(roomRef, async (snapshot) => {
        const data = snapshot.data()
        if (!this.peerConnection.currentRemoteDescription && data && data.answer) {
          console.log('Got remote description: ', data.answer)
          const rtcSessionDescription = new RTCSessionDescription(data.answer)
          await this.peerConnection.setRemoteDescription(rtcSessionDescription)
        }
      })
      // Listening for remote session description above

      // Listen for remote ICE candidates below
      const calleeCandidatesQuery = query(collection(roomRef, 'calleeCandidates'))
      onSnapshot(calleeCandidatesQuery, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            let data = change.doc.data()
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
          }
        })
      })
      // Listen for remote ICE candidates above
    },

    // async joinRoom() {
    //   ;async () => {
    //     // this.roomId = document.querySelector('#room-id').value
    //     console.log('Join room: ', this.roomId)
    //     document.querySelector(
    //       '#currentRoom'
    //     ).innerText = `Current room is ${roomId} - You are the callee!`
    //     await joinRoomById(this.roomId)
    //   },
    //     { once: true }
    //   this.roomDialog.open()
    // },
    // ...existing state and actions...

    // ...existing actions...

    async joinRoomById(roomId) {
      const roomRef = doc(collection(db, 'rooms'), roomId)
      const roomSnapshot = await getDoc(roomRef)
      console.log('Got room:', roomSnapshot.exists())

      if (roomSnapshot.exists()) {
        console.log('Create this.peerConnection with this.configuration: ', this.configuration)
        this.peerConnection = new RTCPeerConnection(this.configuration)
        this.registerPeerConnectionListeners(this.peerConnection)
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection.addTrack(track, this.localStream)
          console.log("Track being added: ", track)
        })

        // Code for collecting ICE candidates below
        const calleeCandidatesCollection = collection(roomRef, 'calleeCandidates')

        this.peerConnection.addEventListener('icecandidate', (event) => {
          if (!event.candidate) {
            console.log('Got final candidate!')
            return
          }
          console.log('Got candidate: ', event.candidate)

          addDoc(calleeCandidatesCollection, event.candidate.toJSON())
        })

        this.peerConnection.addEventListener('track', (event) => {
          console.log('Got remote track:', event.streams[0])
          event.streams[0].getTracks().forEach((track) => {
            console.log('Add a track to the remoteStream:', track)
            this.remoteStream.addTrack(track)
          })
        })

        // Code for creating SDP answer below
        const offer = roomSnapshot.data().offer
        console.log('Got offer:', offer)
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await this.peerConnection.createAnswer()
        console.log('Created answer:', answer)
        await this.peerConnection.setLocalDescription(answer)

        const roomWithAnswer = {
          answer: {
            type: answer.type,
            sdp: answer.sdp
          }
        }
        await updateDoc(roomRef, roomWithAnswer)
        // Code for creating SDP answer above

        // Listening for remote ICE candidates below
        const callerCandidatesQuery = query(collection(roomRef, 'callerCandidates'))
        onSnapshot(callerCandidatesQuery, (snapshot) => {
          snapshot.docChanges().forEach(async (change) => {
            if (change.type === 'added') {
              const data = change.doc.data()
              console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
              await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
            }
          })
        })
        // Listening for remote ICE candidates above
      }
    },

    async openUserMedia() {
      const stream = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .catch((error) => {
          console.error("can't connect mediadevices")
        })
      this.localStream = stream
      this.remoteStream = new MediaStream()

      console.log('Stream:', stream)
    },

    async hangUp(localVideoRef) {
      const tracks = localVideoRef.srcObject.getTracks()
      tracks.forEach((track) => {
        track.stop()
      })

      if (this.remoteStream) {
        this.remoteStream.getTracks().forEach((track) => track.stop())
      }

      if (this.peerConnection) {
        this.peerConnection.close()
      }

      // Delete room on hangup
      if (this.roomId) {
        const roomRef = doc(collection(db, 'rooms'), `${this.roomId}`)
        const calleeCandidatesSnapshot = await getDocs(collection(roomRef, 'calleeCandidates'))
        const callerCandidatesSnapshot = await getDocs(collection(roomRef, 'callerCandidates'))

        calleeCandidatesSnapshot.forEach(async (candidate) => {
          await deleteDoc(candidate.ref)
        })

        callerCandidatesSnapshot.forEach(async (candidate) => {
          await deleteDoc(candidate.ref)
        })

        await deleteDoc(roomRef)
      }

      location.reload(true)
    },

    registerPeerConnectionListeners() {
      this.peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(`ICE gathering state changed: ${this.peerConnection.iceGatheringState}`)
      })

      this.peerConnection.addEventListener('connectionstatechange', () => {
        console.log(`Connection state change: ${this.peerConnection.connectionState}`)
      })

      this.peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${this.peerConnection.signalingState}`)
      })

      this.peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(`ICE connection state change: ${this.peerConnection.iceConnectionState}`)
      })
    }
  }
})
