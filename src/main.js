import Vue from 'vue'
import App from './App.vue'
import undoRedoPlugin from './plugins/undoredo.js'

import store from './store'

Vue.use(undoRedoPlugin)

new Vue({
  el: '#app',
  store: store,
  render: h => h(App)
})