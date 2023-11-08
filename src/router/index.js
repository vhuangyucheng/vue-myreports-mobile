import {createRouter, createWebHistory} from 'vue-router'
import Blank from "../views/test/Blank.vue";
import Test from "../views/test/Test.vue";
import DataInput from "../views/dataInput/DataInput.vue";
import Home from "../views/home/Home.vue";
import InputQrcode from "../views/dataInput/qrcode/InputQrcode.vue";
import MaterialLoading from "../views/dataInput/materialLoading/MaterialLoading.vue";


const myRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home
        },
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
            component: DataInput,
            children: [
                {
                    path: 'Qrcode',
                    component: InputQrcode
                },
                {
                    path: 'MaterialLoading',
                    component: MaterialLoading
                },
            ]
        }
        ]
})

export default myRouter

