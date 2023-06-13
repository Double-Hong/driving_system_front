import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import AdminMain from "@/views/AdministratorView/AdminMain.vue";
import StudentInfo from "@/views/AdministratorView/StudentInfo.vue";
import StudentHome from "@/views/StudentsView/StudentsHomeView.vue";
import AdminInfo from "@/views/AdministratorView/AdminInfo.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //   path: '/',
        //   name: 'home',
        //   component: HomeView
        // },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/adminMain/:peopleId',
            name: 'adminMain',
            component: AdminMain,
            children: [
                {
                    path: 'studentInfo',
                    name: 'studentInfo',
                    component: StudentInfo
                },
                {
                    path: 'adminInfo',
                    name: 'adminInfo',
                    component: AdminInfo
                }
            ]
        },
        {
            path: '/studentHome/:peopleId',
            name: 'studentHome',
            component: StudentHome
        }
    ]
})

export default router
