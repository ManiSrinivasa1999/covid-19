import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '@/firebaseConfig';
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storage,
    firebase,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
