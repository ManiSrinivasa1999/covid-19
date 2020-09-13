import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressBook,
  faHandshakeSlash,
  faHeadSideMask,
  faHome,
  faPhoneAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import {
  faStaylinked,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

library.add(
  faBars,
  faHome,
  faPhoneAlt,
  faHeadSideMask,
  faHandshakeSlash,
  faAddressBook,
  faStaylinked,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
