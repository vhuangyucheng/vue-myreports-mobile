import { createRouter, createWebHistory } from 'vue-router'
import Blank from "../views/test/Blank.vue";
import Test from "../views/test/Test.vue";
import DataInput from "../views/dataInput/DataInput.vue";


const myRouter = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Blank',
      name: 'Blank',
      component: Blank
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/DataInput',
      name: 'DataInput',
      component: DataInput
    },
  ]
})

export default myRouter

