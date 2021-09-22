import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import Toast, { TYPE } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// https://fonts.google.com/specimen/Quicksand?query=Quicksand
Vue.config.productionTip = false;
Vue.use(Vuelidate);

// vue-toastification options
const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: false,
    },
    [TYPE.SUCCESS]: {
      timeout: 5000,
    },
  },
};

Vue.use(Toast, options);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
