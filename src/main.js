import {createPinia} from 'pinia'
import myRouter from './router'
import {createApp} from 'vue'
import App from './App.vue'
import 'vant/es/notify/style';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(myRouter)
// app.use(Antd)
app.mount('#app')
