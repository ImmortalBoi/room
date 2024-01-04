<script setup>
import { ref } from 'vue'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc,setDoc } from 'firebase/firestore'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import router from '../router'

const userStore = useUserStore()
const {id:id} = storeToRefs(userStore) 
let email = ref('')
let username = ref('')
let password = ref('')
let confirmPassword = ref('')

async function SignUp() {
  await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const userID = auth.currentUser.uid;
      await setDoc(doc(db, "users", userID), {
          user_nickname: username.value,
          user_pfp: ''
      }).then(()=>{
        id.value = userID
        router.push('/')
      });
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      // ..
    })
}
</script>

<template>
  <section class="bg-background-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-background-900 md:text-2xl"
          >
            Create an account
          </h1>
          <div class="space-y-4 md:space-y-6" action="#">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-background-900"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-background-50 border border-background-300 text-background-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required
              />
            </div>
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-background-900"
                >Your Full Name</label
              >
              <input
                v-model="username"
                type="text"
                name="username"
                id="username"
                class="bg-background-50 border border-background-300 text-background-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-background-900"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-background-50 border border-background-300 text-background-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500"
                required
              />
            </div>
            <div>
              <label
                for="confirm-password"
                class="block mb-2 text-sm font-medium text-background-900"
                >Confirm password</label
              >
              <input
                v-model="confirmPassword"
                type="confirm-password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                class="bg-background-50 border border-background-300 text-background-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500"
                required
              />
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="w-4 h-4 border border-background-300 rounded bg-background-50 focus:ring-3 focus:ring-primary-300 :ring-primary-600"
                  required
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-background-500"
                  >I accept the
                  <a class="font-medium text-primary-600 hover:underline" href="#"
                    >Terms and Conditions</a
                  ></label
                >
              </div>
            </div>
            <button
              @click="SignUp()"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-700 :ring-primary-800"
            >
              Create an account
            </button>
            <p class="text-sm font-light text-background-500">
              Already have an account?
              <router-link to="/login" class="font-medium text-primary-600 hover:underline"
                >Login here</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
