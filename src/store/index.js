import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'notebook',
  storage: window.localStorage
})


export default new Vuex.Store({
  state: {
  	nextId: 3,
  	notes: []
  },

  getters: {},

  mutations: {
  	deleteNote (state, id) {
  		state.notes = state.notes.filter(note => note.id != id)
  	},

  	getNextId (state) {
  		state.nextId++
  	},

  	deleteTodoItem (state, options) {
  		let note = state.notes.filter(note => note.id === options.id)[0]
  		note.todoList = note.todoList.filter(todoItem => todoItem !== options.item)
  	},

  	addTodoItem (state, id) {
  		let item = {
  			checked: false,
  			text: "New Item"
  		}
  		let note = state.notes.filter(note => note.id === id)[0]
  		note.todoList.push(item)
  	},

  	addNewNote (state, note) {
  		state.notes.push(note)
  	}

  },

  actions: {
  	deleteNote (context, id) {
  		context.commit('deleteNote', id)
  	},

  	getNextId (context) {
  		context.commit('getNextId')
  	},

  	deleteTodoItem (context, options) {
  		context.commit('deleteTodoItem', options)
  	},

  	addTodoItem (context, id) {
  		context.commit('addTodoItem', id)
  	},

  	addNewNote (context, note) {
  		context.commit('addNewNote', note)
  	}

  },

  plugins: [vuexPersist.plugin]

});