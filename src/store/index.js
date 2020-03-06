import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	nextId: 0,
  	notes: []
  },

  getters: {},

  mutations: {
  	
  	/**
  	 * Получить ID для новой заметки
  	 */
  	getNextId (state) {
  		state.nextId++
  	},

		/**
		 * Добавить новую заметку в хранилище
		 * 
		 * @param {Object} 	note 		Новая заметка
		 */
  	addNewNote (state, note) { 
  		state.notes.push(note)
  	},

  	/**
  	 * Добавить новый элемент списка задач в заметку
  	 * 
  	 * @param {Number}	id 			ID заметки
  	 */
  	addTodoItem (state, id) {
  		let item = {
  			checked: false,
  			text: "New Item"
  		}

  		let note = state.notes.filter(note => note.id === id)[0]
  		note.todoList.push(item)
  	},

  	/**
  	 * Удалить заметку из хранилища
  	 * 
  	 * @param {Number}	id 			ID заметки
  	 */
  	deleteNote (state, id) {
  		state.notes = state.notes.filter(note => note.id != id)
  	},

  	/**
  	 * Удалить элемент списка задач из заметки
  	 * 
  	 * @param {Object} 	options		Объект, содержащий в себе ID заметки и элемент, подлежащий удалению
  	 */
  	deleteTodoItem (state, options) {
  		let note = state.notes.filter(note => note.id === options.id)[0]
  		note.todoList = note.todoList.filter(todoItem => todoItem !== options.item)
  	}

  },

  actions: {

  	/**
  	 *	Инициация мутации получения ID для новой заметки
  	 */
  	getNextId (context) {
  		context.commit('getNextId')
  	},

		/**
		 * Инициация мутации добавления новой заметки в хранилище
		 * 
		 * @param {Object} 	note 		Новая заметка
		 */
  	addNewNote (context, note) {
  		context.commit('addNewNote', note)
  	},

  	/**
  	 * Инициация мутации добавления нового элемента списка задач в заметку
  	 * 
  	 * @param {Number}	id 			ID заметки
  	 */
  	addTodoItem (context, id) {
  		context.commit('addTodoItem', id)
  	},

  	/**
  	 * Инициация мутации удаления заметки из хранилища
  	 * 
  	 * @param {Number}	id 			ID заметки
  	 */
  	deleteNote (context, id) {
  		context.commit('deleteNote', id)
  	},

  	/**
  	 * Инициация мутации удаления элемента списка задач из заметки
  	 * 
  	 * @param {Object} 	options		Объект, содержащий в себе ID заметки и элемент, подлежащий удалению
  	 */
  	deleteTodoItem (context, options) {
  		context.commit('deleteTodoItem', options)
  	}

  }

})