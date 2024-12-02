import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import DashboardView from '../views/DashboardView.vue'
import LandingPage from '../components/LandingPage.vue'
import RequestView from '../views/RequestView.vue'

const routes = [
  { path: '/', name: 'home', component: LandingPage },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/items', name: 'items', component: ItemView },
  { path: '/users', name: 'users', component: UserView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/request', name: 'request', component: RequestView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
