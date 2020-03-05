<template>
		<div class="note-wrapper">
		
				<div class="note-card">
  	
		  			<div class="card-sidebar">
					  		<div v-if="canUndo"
					  				 @click="onUndoButtonClick()"
					  				 class="card-sidebar-button card-sidebar-undo-button">
					  				Отменить
				  			</div>
					  		<div v-if="canRedo"
					  				 @click="onRedoButtonClick()"
					  				 class="card-sidebar-button card-sidebar-redo-button">
					  				Повторить
				  			</div>
					  		<div @click="onDeleteNoteButtonClick(note.id)" class="card-sidebar-button card-sidebar-delete-btn">Удалить заметку</div>
		  			</div>

			    	<div class="card-header">
				    		<h2 v-if="!isTitleOpenToEdit" class="card-title">{{ note.title }}</h2>
				    		<input v-if="isTitleOpenToEdit" v-model="note.title" type="text" class="card-title-input"></input>
				    		<div class="card-title-button-wrapper">
					    			<div v-if="!isTitleOpenToEdit"
					    				   @click="onEditTitleButtonClick()"
					    				   class="card-title-button card-title-edit-button">
					    				 	Изменить(Заг)
			    				 	</div>
					    			<div v-if="isTitleOpenToEdit"
					    					 @click="onConfirmTitleButtonClick()"
					    					 class="card-title-button card-title-confirm-button">
					    					Сохранить(Заг)
				    				</div>
					    			<div v-if="isTitleOpenToEdit"
					    					 @click="onCancelTitleButtonClick()"
					    					 class="card-title-button card-title-cancel-button">
					    					Отменить(Заг)
				    				</div>
				    		</div>
			    	</div>
	    
		    		<div class="card-body">
		    				<div class="card-todo-list-wrapper">
		    						<ul class="card-todo-list">
		    								<app-todo-item v-for="todoItem in note.todoList" 
		    															 :item="todoItem"
    															 		 @deleteItem="deleteTodoItem(todoItem)"
    															 		 @setStateSnapshot="setStateSnapshot($event)"
		    															 class="card-todo-item"></app-todo-item>
										</ul>
		    				</div>
		    				<div @click="onAddTodoItemButtonClick()" class="card-todo-add-item-button">Добавить(ТДИ)</div>
		    		</div>
	    
	    			<div class="card-footer">
	    					<div @click="onCancelNoteChangesButtonClick()" class="card-footer-button card-footer-cancel-button">Отменить(Зам)</div>
	    					<div @click="onConfirmNoteChangesButtonClick()" class="card-footer-button card-footer-save-button">Сохранить(Зам)</div>
	    			</div>
	  	
	  		</div>

		</div>
</template>

<script>
	import TodoItem from './TodoItem.vue'

  export default {
		props: ['noteId'],

		data () {
		  return {
		  	isTitleOpenToEdit: false,
		  	oldNoteTitle: null,
		  	isTodoItemOpenToEdit: false,
		  	oldTodoText: null,
		  	initState: null,
		  	doneChanges: [],
		  	undoneChanges: [],
		  	stateBeforeTitleUpdated: null
		  }
		},

		created () {
			this.initState = JSON.parse(JSON.stringify(this.$store.state))
		},

		computed: {
			note () {
				if (this.noteId != null) {

					return this.$store.state.notes.filter(item => item.id === this.noteId)[0]
				} else {
					let note = {
						id: 'note-' + this.getNextId(),
						title: 'New Note',
						todoList: null
					}

					return note
				}

			},

			canUndo () {		// проверка возможности отката изменения
				return this.doneChanges.length && !this.isTitleOpenToEdit && !this.isTodoItemOpenToEdit
			},

			canRedo () {		// проверка возможности возврата изменения
				return this.undoneChanges.length && !this.isTitleOpenToEdit && !this.isTodoItemOpenToEdit
			}

		},

		methods: {
			getNextId () {
				let nextId = this.$store.state.nextId
				this.$store.dispatch('getNextId')

				return nextId
			},

			onUndoButtonClick () {		// откат на одно изменение назад
				let prevState = this.doneChanges.pop()
				let nextState = JSON.parse(JSON.stringify(this.$store.state))
				this.$store.replaceState(prevState)
				this.undoneChanges.push(nextState)
			},

			onRedoButtonClick () {		// возврат изменения
				let nextState = this.undoneChanges.pop()
				let prevState = JSON.parse(JSON.stringify(this.$store.state))
				this.$store.replaceState(nextState)
				this.doneChanges.push(prevState)
			},

			onDeleteNoteButtonClick (noteId) {		// удаление заметки
				// вызвать окно с подтверждением
				this.$store.dispatch('deleteNote', noteId)
				this.$emit('showNotes')
			},

			onEditTitleButtonClick () {		// редактирование заголовка заметки
				this.stateBeforeTitleUpdated = JSON.parse(JSON.stringify(this.$store.state))
				this.isTitleOpenToEdit = true
				this.oldNoteTitle = this.note.title
			},

			onConfirmTitleButtonClick () {		// сохранение изменений заголовка заметки
				this.isTitleOpenToEdit = false
				if (this.note.title != this.oldNoteTitle) {
					this.setStateSnapshot(this.stateBeforeTitleUpdated)
				}

				this.oldNoteTitle = null
			},

			onCancelTitleButtonClick () {		// отмена изменений заголовка заметки
				this.isTitleOpenToEdit = false
				this.note.title = this.oldNoteTitle
				this.oldNoteTitle = null
			},

			deleteTodoItem (todoItem) {		// удаление элемента 'to-do' списка
				this.$store.dispatch('deleteTodoItem', {id: this.noteId, item: todoItem})
			},

			onAddTodoItemButtonClick () {		// добавить элемент в 'to-do' список
				this.setStateSnapshot();
				this.$store.dispatch('addTodoItem', this.noteId)
			},

			onConfirmNoteChangesButtonClick () {		// сохранить все изменения в заметке
				this.$emit('showNotes')
			},

			onCancelNoteChangesButtonClick () {		// отмена всех изменений в заметке
				// вызвать окно с подтверждением
				this.$store.replaceState(this.initState)
				this.$emit('showNotes')
			},

			setStateSnapshot (state) {		// сделать снимок состояния хранилища для возможности отката изменений				
				let newState = JSON.parse(JSON.stringify(this.$store.state))
				if (state) {
					newState = state
				}

				this.doneChanges.push(newState)
				this.undoneChanges = []
			}

		},

		components: {
			'app-todo-item': TodoItem
		}
  }
</script>