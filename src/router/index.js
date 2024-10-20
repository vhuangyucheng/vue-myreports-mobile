import {createRouter, createWebHistory} from 'vue-router'
import Blank from "../views/test/Blank.vue";
import Setting from "../views/setting/Setting.vue";
import Wip from "../views/setting/Wip/Wip.vue";
import Test from "../views/test/Test.vue";
import DataInput from "../views/dataInput/DataInput.vue";
import SaveTicket from "../views/ticket/SaveTicket.vue";
import ListTicket from "../views/ticket/ListTicket.vue";
import Home from "../views/home/Home.vue";
import InputQrcode from "../views/dataInput/qrcode/InputQrcode.vue";
import MaterialLoading from "../views/dataInput/materialLoading/MaterialLoading.vue";
import Stringer from "../views/dataInput/Stringer/Stringer.vue";
import Bussing from "../views/dataInput/bussing/Bussing.vue";
import FirstEL from "../views/dataInput/firstEL/FirstEL.vue";
import FrontLeader from "../views/dataInput/frontLeader/FrontLeader.vue";
import Lamination from "../views/dataInput/lamination/Lamination.vue";
import Framing from "../views/dataInput/framing/Framing.vue";
import SecondEL from "../views/dataInput/secondEL/SecondEL.vue";
import BackLeader from "../views/dataInput/backLeader/Backleader.vue";
import Packing from "../views/dataInput/packing/Packing.vue";
import equipmentComment from "../views/home/equipmentComment/equipmentComment.vue";
import shiftComment from "../views/home/shiftComment/shiftComment.vue";
import qcComment from "../views/home/qcComment/QCComment.vue";
import planningComment from "../views/home/planningComment/PlanningComment.vue";
import Wo from "../views/setting/wo/Wo.vue";


const myRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/comment',
            component: Home,
            children:[
                {
                    path: 'equipmentComment',
                    component: equipmentComment
                },
                {
                    path: 'shiftComment',
                    component: shiftComment
                },
                {
                    path: 'qcComment',
                    component: qcComment
                },
                {
                    path: 'planningComment',
                    component: planningComment
                },
            ]
        },
        {
            path: '/Blank',
            name: 'Blank',
            component: Blank
        },
        {
            path: '/setting',
            name: 'setting',
            component: Setting,
            children: [
                {
                    path: 'wip',
                    component: Wip
                },
                {
                    path: 'wo',
                    component: Wo
                },
            ]
        },
        {
            path: '/Test',
            name: 'Test',
            component: Test
        },
        {
            path: '/SaveTicket',
            name: 'SaveTicket',
            component: SaveTicket
        },
        {
            path: '/ListTicket',
            name: 'ListTicket',
            component: ListTicket
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
                {
                    path: 'Stringer',
                    component: Stringer
                },
                {
                    path: 'Bussing',
                    component: Bussing
                },
                {
                    path: 'FirstEL',
                    component: FirstEL
                },
                {
                    path: 'FrontLeader',
                    component: FrontLeader
                },
                {
                    path: 'Lamination',
                    component: Lamination
                },
                {
                    path: 'Framing',
                    component: Framing
                },
                {
                    path: 'SecondEL',
                    component: SecondEL
                },
                {
                    path: 'BackLeader',
                    component: BackLeader
                },
                {
                    path: 'Packing',
                    component: Packing
                },
            ]
        }
    ]
})

export default myRouter

