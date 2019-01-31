import Vue from 'vue'
import Vuex from 'vuex'

import db from '@/firebase/init'

Vue.use(Vuex)

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

    }
  },
  getters: {
    smoothies: state => state.smoothies
  }
})
