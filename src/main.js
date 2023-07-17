import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import Vuelidate from 'vuelidate';
import Toast, { TYPE } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// helpers
import permissions from '@/helpers/permissions';
// i18n
import { VueI18n, i18n } from '@/plugins/i18n';
import { getBySomebody } from '@/mixins/reusable.methods';
// filters
import relativesFilter from '@/filters/relativesFilter';
import planNumberFilter from '@/filters/planNumberFilter';
import firstLetterUppercaseFilter from '@/filters/firstLetterUppercaseFilter';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(VueI18n);
Vue.prototype.$can = permissions;
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
Vue.mixin({
  methods: {
    getBySomebody,
  },
});
Vue.use(Toast, options);

Vue.filter('relativesFilter', relativesFilter);
Vue.filter('firstLetterUppercaseFilter', firstLetterUppercaseFilter);
Vue.filter('planNumberFilter', planNumberFilter);

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
