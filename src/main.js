import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxiosPlugin from 'vue-axios-plugin'
import 'wot-design/lib/theme-default/index.css'
import wotui from './wotui'
import vueTouch from 'kim-vue-touch'
import vshare from 'vshare'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


Vue.use(vshare)

Vue.use(vueTouch)
Vue.use(wotui)

Vue.config.productionTip = false

Vue.use(VueAxiosPlugin, {
  // 请求拦截处理
  reqHandleFunc: config => config,
  reqErrorFunc: error => Promise.reject(error),
  // 响应拦截处理
  resHandleFunc: response => response,
  resErrorFunc: error => Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
