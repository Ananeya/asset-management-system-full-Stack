import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ItemView from "../views/ItemView.vue";
import UserView from "../views/UserView.vue";
import DashboardView from "../views/DashboardView.vue";
import LandingPage from "../components/LandingPage.vue";
import RequestView from "../views/RequestView.vue";
import ItemManagement from "../components/ItemManagement.vue";
import UpdateItem from "../components/UpdateItem.vue";
import DeleteItem from "../components/DeleteItem.vue";
import AssignedItems from "../components/AssignedItems.vue";
import ReportIssue from "../components/ReportIssue.vue";
import RequestItem from "../components/RequestItem.vue";
import ManageItems from '../components/ManageItems.vue';

const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Check if the token exists
};

const routes = [
  { path: "/", name: "home", component: LandingPage },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/items", name: "items", component: ItemView },
  { path: "/users", name: "users", component: UserView },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
  { path: "/request", name: "request", component: RequestView },
  {
    path: "/item-management",
    name: "item-management",
    component: ItemManagement,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next(); // Allow access if authenticated
      } else {
        next({ name: "login" }); // Redirect to login if not authenticated
      }
    },
  },
  { path: "/update-item", name: "update-item", component: UpdateItem },
  { path: "/delete-item", name: "delete-item", component: DeleteItem },
  { path: "/assigned-items", name: "assigned-items", component: AssignedItems },
  { path: "/report-issue", name: "report-issue", component: ReportIssue },
  { path: "/request-item", name: "request-item", component: RequestItem },
  { path: "/manage-items", name: "manage-items", component: ManageItems },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
