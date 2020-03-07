<template>
  <div id="app" class="container">
    
  	<app-notelist v-if="showNoteList"
  								@openNote="openNote($event)"
  								@openNewNote="openNewNote()"
  								@saveToLocalStorage="saveToLocalStorage()"></app-notelist>

  	<app-note v-if="showNote"
  						:noteId="noteId"
  						@showNotes="showNotes()"
							@saveToLocalStorage="saveToLocalStorage()"></app-note>

  </div>
</template>

<script>
	import Note from './components/Note.vue'
	import NoteList from './components/NoteList.vue'

	export default {
	  name: 'app',

	  data () {
	    return {
	      noteId: null,				// ID выбранной заметки
	      showNoteList: true,	// флаг открытия списка заметок
	      showNote: false			// флаг открытия выбранной заметки
	    }
	  },

	  created () {

	  	/**
	  	 * Заполнение заметок из локального хранилища, если оно не пустое
	  	 */
	  	if (window.localStorage['notebook']) {
	  		this.$store.replaceState(JSON.parse(window.localStorage.getItem('notebook')))
	  	}
	  },

	  methods: {
	  	
	  	/**
	  	 * Открыть выбранную заметку
	  	 * 
	  	 * @param  {Number}	noteId	ID выбранной заметки
	  	 */
	  	openNote (noteId) {
	  		this.noteId = noteId
	  		this.showNoteList = false
	  		this.showNote = true
	  	},

			/**
			 * Открыть новую заметку
			 */
	  	openNewNote () {
	  		this.noteId = null
	  		this.showNoteList = false
	  		this.showNote = true
	  	},

	  	/**
	  	 * Показать список заметок
	  	 */
	  	showNotes () {
	  		this.noteId = null
	  		this.showNoteList = true
	  		this.showNote = false
	  	},

	  	/**
	  	 * Сохранить состояние хранилища в локальное хранилище
	  	 */
	  	saveToLocalStorage () {
	  		window.localStorage.setItem('notebook', JSON.stringify(this.$store.state))
	  	}

	  },

	  components: {
	  	'app-note': Note,
	  	'app-notelist': NoteList
	  }
}
</script>