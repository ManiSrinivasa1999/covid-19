import { createApp } from 'vue';
import Vuetify from 'vuetify';
import App from '../App.vue';

const app = createApp(App);
app.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#10163A',
        secondary: '#5851BE',
        accent: '#82B1FF',
        error: '#E4555B',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
