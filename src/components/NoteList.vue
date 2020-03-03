<template>
  	<div class="notes-container">
    		
			<app-note></app-note>
			<app-note></app-note>
			<app-note></app-note>

			<div class="note-add-button"></div>

  	</div>
</template>

<script>
	import Note from './Note.vue'

	export default {
	  data () {
	    return {
	      
	    }
	  },
	  computed: {
	  	
	  },
	  components: {
	  	'app-note': Note
	  }
	}
</script>