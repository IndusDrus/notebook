<template>
  <div id="app">
    
  	<app-notelist v-if="showNoteList" @openNote="openNote($event)" @openNewNote="openNewNote()"></app-notelist>
  	<app-note v-if="showNote" :noteId="noteId" @showNotes="showNotes()"></app-note>

  </div>
</template>

<script>
	import Note from './components/Note.vue'
	import NoteList from './components/NoteList.vue'

	export default {
	  name: 'app',

	  data () {
	    return {
	      noteId: null,
	      showNoteList: true,
	      showNote: false
	    }
	  },

	  methods: {
	  	openNote (noteId) {
	  		this.noteId = noteId
	  		this.showNoteList = false
	  		this.showNote = true
	  	},

	  	openNewNote () {
	  		this.noteId = null
	  		this.showNoteList = false
	  		this.showNote = true
	  	},

	  	showNotes () {
	  		this.noteId = null
	  		this.showNoteList = true
	  		this.showNote = false
	  	}
	  },

	  components: {
	  	'app-note': Note,
	  	'app-notelist': NoteList
	  }
}
</script>