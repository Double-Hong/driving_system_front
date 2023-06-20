import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import coachMain from "@/views/CoachView/CoachMain.vue";
import StudentInfo from "@/views/CoachView/StudentInfo.vue";
import StudentHome from "@/views/StudentsView/StudentsHomeView.vue";
import CoachInfo from "@/views/CoachView/CoachInfo.vue";
import ExamInfo from "@/views/CoachView/ExamInfo.vue";
import TestQuestions from "@/views/CoachView/TestQuestions.vue";
import Test from "@/views/CoachView/Test.vue";

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
            path: '/coachMain/:peopleId',
            name: 'coachMain',
            component: coachMain,
            children: [
                {
                    path: 'studentInfo',
                    name: 'studentInfo',
                    component: StudentInfo
                },
                {
                    path: 'CoachInfo',
                    name: 'CoachInfo',
                    component: CoachInfo
                },
                {
                    path: 'examInfo',
                    name: 'examInfo',
                    component: ExamInfo
                },
                {
                    path: 'testQuestions',
                    name: 'testQuestions',
                    component: TestQuestions
                },
                {
                    path: 'test',
                    name: 'test',
                    component: Test
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
