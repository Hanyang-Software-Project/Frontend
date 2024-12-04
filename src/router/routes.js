import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Notifications from "@/pages/Notifications.vue";
import Devices from "../pages/Devices.vue";
import Login from "@/pages/Login.vue";
import Signin from "@/pages/Signin.vue";
import TestRecording from "../pages/Recording.vue";

const routes = [
  { path: "/", redirect: {name: 'loginPage'}, name: 'root'},
  { path: "/login", component: Login, name: 'loginPage'},
  { path: "/signin", component: Signin, name: 'signinPage'},
  { path: "/recording", component: TestRecording, name: 'recording'},
  {
    path: "/app",
    component: DashboardLayout,
    redirect: "/app/dashboard",
    name: "dashboardLayout",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {requiresAuth: true}
      },
      {
        path: "household",
        name: "household",
        component: UserProfile,
        meta: {requiresAuth: true}
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        meta: {requiresAuth: true}
      },
      {
        path: "devices",
        name: "devices",
        component: Devices,
        meta: {requiresAuth: true}
      },
    ],
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
