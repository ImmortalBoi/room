import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '../views/ChatView.vue'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/loginView.vue'
import ProfileView from '../views/ProfileView.vue'
import { useUserStore } from '../stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/chat', component: ChatView },
    { path: '/signup', component: SignUpView },
    { path: '/login', component: LoginView },
    { path: '/profile', component: ProfileView },
  ] 
})

router.beforeEach(async (to) => {
  const user = useUserStore() 
  if (
    // make sure the user is authenticated
    user.id == '' &&
    // ❗️ Avoid an infinite redirect
    (to.path !== '/login' && to.path !== '/signup')
  ) {
    // redirect the user to the login page
    return { path: '/login' }
  }
})

export default router
