import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import coachMain from "@/views/CoachView/CoachMain.vue";
import StudentInfo from "@/views/CoachView/StudentInfo.vue";
import CoachInfo from "@/views/CoachView/CoachInfo.vue";
import ExamInfo from "@/views/CoachView/ExamInfo.vue";
import TestQuestions from "@/views/CoachView/TestQuestions.vue";
import Test from "@/views/CoachView/Test.vue";
import StudentsHomeView from "@/views/StudentsView/StudentsHomeView.vue";
import practiceAdmin from "@/views/CoachView/practiceAdmin.vue";
import StudyVideo from "@/views/CoachView/StudyVideo.vue";
import StudentCondition from "@/views/CoachView/StudentCondition.vue";

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
      path:'/',
      name:'login',
      component:LoginView
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
          path: 'practiceAdmin',
          name: 'practiceAdmin',
          component: practiceAdmin
        },
        {
          path: 'studyVideo',
          name: 'studyVideo',
          component: StudyVideo
        },
        {
          path: 'test',
          name: 'test',
          component: Test
        },
        {
          path: 'studentCondition',
          name: 'studentCondition',
          component: StudentCondition
        }
      ]
    },
    {
      path:'/students/:userid',
      name:'students',
       component:()=> import('@/views/StudentsView/StudentsHomeView.vue')
    },
    {
      path:'/personInfo/:userid',
      name:'personInfo',
      component:()=> import('@/views/StudentsView/PeronInfoView.vue')
    },
    {
      path:'/SubjectOne/:userid',
      name:'SubjectOne',
      component:()=> import('@/views/StudentsView/SubjectOneView.vue')
    },
    {
      path:'/SubjectTwo/:userid',
      name:'SubjectTwo',
      component:()=> import('@/views/StudentsView/SubjectTwoView.vue')
    },
    {
      path:'/SubjectThreeTheory/:userid',
      name:'SubjectThreeTheory',
      component:()=> import('@/views/StudentsView/SubjectThreeTheoryView.vue')
    },
    {
      path:'/SubjectThreePractice/:userid',
      name:'SubjectThreePractice',
      component:()=> import('@/views/StudentsView/SubjectThreePracticeView.vue')
    },
    {
      path:'/ExamRegistration/:userid',
      name:'ExamRegistration',
      component:()=> import('@/views/StudentsView/ExamRegistrationView.vue')
    },
    {
      path:'/Healthy/:userid',
      name:'Healthy',
      component:()=> import('@/views/StudentsView/HealthyView.vue')
    },
    {
      path:'/Exam/:userid',
      name:'Exam',
      component:()=> import('@/views/StudentsView/ExamView.vue')
    },
    {
      path:'/Examing/:userId/:examId/:examTime',
      name:'Examing',
      component:()=> import('@/views/StudentsView/ExamIngView.vue')
    },
    {
      path:'/ExamTest/:userId',
      name:'ExamTest',
      component:()=> import('@/views/StudentsView/ExamTestView.vue')
    },
    {
      path:'/video/:userid',
      name:'video',
      component:()=> import('@/views/StudentsView/VideoView.vue')
    }

  ]
})

export default router
