<template>
  <div id="app">
    
  	<app-notelist></app-notelist>
  	<app-modal></app-modal>

  </div>
</template>

<script>
	import Note from './components/Note.vue'
	import NoteList from './components/NoteList.vue'
	import ModalWindow from './components/ModalWindow.vue'

	export default {
	  name: 'app',
	  data () {
	    return {
	      
	    }
	  },
	  components: {
	  	'app-note': Note,
	  	'app-notelist': NoteList,
	  	'app-modal': ModalWindow
	  }
}
</script>