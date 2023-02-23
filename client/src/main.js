import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './assets/main.css'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { createPinia} from "pinia"
import {router} from './common/router';
import axios from 'axios';
import { AdminStore } from './stores/AdminStore'
/* 
axios
pinia
sass
vue-router (npm install vue-router@4)
naive-ui  (npm i -D vfonts  npm i -D naive-ui)
wangeditor  (npm install @wangeditor/editor-for-vue@next --save)
*/
//category/list
// 服务端地址
axios.defaults.baseURL = 'http://localhost:8080'
// 独立API
const { message, notification, dialog } = createDiscreteApi(["message", "dialog", "notification"])

const app = createApp(App)
// 全局提供属性
app.provide("axios",axios)
app.provide("message", message)
app.provide("notification", notification)
app.provide("dialog", dialog)
app.provide("server_url", axios.defaults.baseURL )

app.use(naive)
app.use(router)
app.use(createPinia())

const adminStore = AdminStore()
// axios拦截器
axios.interceptors.request.use((config)=>{
  //每次请求都在headers中添加token
  config.headers.token = adminStore.token
  return config
})


app.mount('#app')