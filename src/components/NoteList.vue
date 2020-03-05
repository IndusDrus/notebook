<template>
  	<div class="notes-container">
	    		
				<div v-for="note in notes" class="note-list-card">
  	
		  			<div class="card-header">
				    		<h2 class="card-title">{{ note.title }}</h2>
			    	</div>
	    
		    		<div class="card-body">
		    				<div class="card-todo-list-wrapper">
		    						<ul class="card-todo-list">
		    								<li v-for="todoItem in note.todoList" class="card-todo-list-item">
		    										<input class="todo-checkbox" type="checkbox" v-model="todoItem.checked"></input>
		    										<span class="todo-text">{{ todoItem.text }}</span>
							    			</li>
							    	</ul>
		    				</div>
		    		</div>
	    
	    			<div class="card-footer">
	    					<div @click="onChangeButtonClick(note.id)" class="card-footer-button card-footer-change-button">Изменить</div>
	    					<div @click="onDeleteButtonClick(note.id)" class="card-footer-button card-footer-delete-button">Удалить</div>
	    			</div>
	  	
	  		</div>

				<div @click="onAddButtonClick()" class="note-add-button">Добавить заметку</div>

				<app-dialog v-if="isDialogVisible"
										:dialogProps="dialogProps"
										@confirm="deleteNote()"
										@cancel="closeModal()"></app-dialog>

  	</div>
</template>

<script>
	import DialogWindow from './DialogWindow.vue'

	export default {
	  data () {
	    return {
	      dialogProps: null,
	      isDialogVisible: false,
	      currentNoteId: null
	    }
	  },
	  computed: {
	  	notes () {
	  		return this.$store.state.notes
	  	}
	  },
	  methods: {

	  	onAddButtonClick () {		// добавить новую заметку
	  		this.$emit('openNewNote')
	  	},

	  	onChangeButtonClick (noteId) {		// переход к редактированию определенной заметки
	  		this.$emit('openNote', noteId)
	  	},

	  	onDeleteButtonClick (noteId) {		// удаление определенной заметки
	  		this.dialogProps = {
	  			title: 'Удалить заметку?',
	  			cancelText: 'Отмена',
	  			confirmText: 'Удалить'
	  		}
	  		this.currentNoteId = noteId
	  		this.isDialogVisible = true
	  	},

	  	closeModal () {
	  		this.dialogProps = null
	  		this.isDialogVisible = false
	  		this.currentNoteId = null
	  	},

	  	deleteNote () {
	  		this.$store.dispatch('deleteNote', this.currentNoteId)
	  		this.closeModal()
	  	}
	  },
	  components: {
	  	'app-dialog': DialogWindow
	  }
	}
</script>