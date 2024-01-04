<script setup>
import navbar from '../components/navbar.vue'
// import searchbar from './components/searchbar.vue'
// import { useUserStore } from './stores/user'
// import { storeToRefs } from 'pinia'
// import { ref, nextTick, watch } from 'vue'

// const user = useUserStore()
</script>

<template>
  <div class="bg-background-100 p-9 max-md:px-5 font-mono h-screen">
    <div class="gap-5 h-full flex max-md:flex-col max-md:items-stretch max-md:gap-0">
      <navbar />
      <div class="bg-background-200 w-[90%] rounded-lg overflow-scroll px-4">
          <!-- Card start -->
          <div
            class="max-w-sm mx-auto bg-background-100  rounded-lg overflow-hidden shadow-lg"
          >
            <div class="border-b px-4 pb-6">
              <div class="text-center my-4">
                <img
                  class="h-32 w-32 rounded-full border-4 border-background-100  mx-auto my-4"
                  src="https://randomuser.me/api/portraits/women/21.jpg"
                  alt=""
                />
                <div class="py-2">
                  <h3 class="font-bold text-2xl text-gray-800  mb-1">
                    Cait Genevieve
                  </h3>
                  <div class="inline-flex text-gray-700  items-center">
                    <svg
                      class="h-5 w-5 text-gray-400  mr-1"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        class=""
                        d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                      />
                    </svg>
                    New York, NY
                  </div>
                </div>
              </div>
              <div class="flex gap-2 px-2">
                <button
                  class="flex-1 rounded-full bg-primary-600  text-background-100  antialiased font-bold hover:bg-primary-800 :bg-primary-900 px-4 py-2"
                >
                  Follow
                </button>
                <button
                  class="flex-1 rounded-full border-2 border-gray-400  font-semibold text-black  px-4 py-2"
                >
                  Message
                </button>
              </div>
            </div>
            <div class="px-4 py-4">
              <div class="flex gap-2 items-center text-gray-800  mb-4">
                <svg
                  class="h-6 w-6 text-gray-600 "
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    class=""
                    d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"
                  />
                </svg>
                <span
                  ><strong class="text-black ">12</strong> Followers you know</span
                >
              </div>
              <div class="flex">
                <div class="flex justify-end mr-2">
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt=""
                  />
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/women/31.jpg"
                    alt=""
                  />
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/men/33.jpg"
                    alt=""
                  />
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/women/32.jpg"
                    alt=""
                  />
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt=""
                  />
                  <img
                    class="border-2 border-background-100  rounded-full h-10 w-10 -mr-2"
                    src="https://randomuser.me/api/portraits/women/42.jpg"
                    alt=""
                  />
                  <span
                    class="flex items-center justify-center bg-background-100  text-sm text-gray-800  font-semibold border-2 border-gray-200  rounded-full h-10 w-10"
                  >
                    +999
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- Card end -->
        </div>
      </div>
    </div>
</template>
