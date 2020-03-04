import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	nextId: 3,
  	notes: [
			{
				id: 0,
				title: 'Title 1',
				todoList: [
					{
						checked: true,
						text: "Todo 1-1"
					},
					{
						checked: false,
						text: "Todo 1-2"
					},
					{
						checked: false,
						text: "Todo 1-3"
					},
					{
						checked: false,
						text: "Todo 1-4"
					}
				]
			},
			{
				id: 1,
				title: 'Title 2',
				todoList: [
					{
						checked: false,
						text: "Todo 2-1"
					},
					{
						checked: false,
						text: "Todo 2-2"
					},
					{
						checked: false,
						text: "Todo 2-3"
					},
					{
						checked: false,
						text: "Todo 2-4"
					}
				]
			},
			{
				id: 2,
				title: 'Title 3',
				todoList: [
					{
						checked: true,
						text: "Todo 3-1"
					},
					{
						checked: true,
						text: "Todo 3-2"
					},
					{
						checked: false,
						text: "Todo 3-3"
					}
				]
			}
		]
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
  	}

  }

});