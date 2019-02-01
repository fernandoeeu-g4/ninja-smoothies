import Vue from 'vue'
import Vuex from 'vuex'

import db from '@/firebase/init'

Vue.use(Vuex)
Vue.config.devtools = true

export const store = new Vuex.Store({
  state: {
    smoothies: []
  },
  mutations: {
    ADD_SMOOTHIE: (state, smoothie) => {
      state.smoothies.push(smoothie)
    },
    REMOVE_SMOOTHIE: (state, id) => {
      // delete doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        state.smoothies = state.smoothies.filter(smoothie => {
          return smoothie.id !== id;
        })
      })

    },
    CLEAR_SMOOTHIE: (state) => {
      state.smoothies = []
    }
  },
  getters: {
    smoothies: state => state.smoothies
  }
})
