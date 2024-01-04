<script setup>
import { ref } from 'vue'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import router from '../router'

const userStore = useUserStore()
const { id: id } = storeToRefs(userStore)
let email = ref('')
let password = ref('')

async function SignIn() {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      const userID = auth.currentUser.uid
      id.value = userID
      router.push('/')
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
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
            Sign in to your account
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
                class="bg-background-50 border border-background-300 text-background-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :ring-blue-500 :border-blue-500"
                placeholder="name@company.com"
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
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-background-300 rounded bg-background-50 focus:ring-3 focus:ring-primary-300 :ring-primary-600"
                    required
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-background-500">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-medium text-primary-600 hover:underline"
                >Forgot password?</a
              >
            </div>
            <button @click="SignIn()"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-700 :ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-background-500">
              Don’t have an account yet?
              <router-link to="/signup" class="font-medium text-primary-600 hover:underline"
                >Sign up</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
