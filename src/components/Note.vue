<template>
		<div class="note-wrapper">
		
				<div class="note-card">
  	
		  			<div class="note-card__sidebar">
					  		<div v-if="canUndo"
					  				 @click="onUndoButtonClick()"
					  				 data-tooltip="Отменить"
					  				 class="note-card__sidebar-button_undo">
					  				Отменить
				  			</div>
					  		<div v-if="canRedo"
					  				 @click="onRedoButtonClick()"
					  				 data-tooltip="Повторить"
					  				 class="note-card__sidebar-button_redo">
					  				Повторить
				  			</div>
					  		<div @click="onDeleteNoteButtonClick()"
					  				 data-tooltip="Удалить заметку"
					  				 class="note-card__sidebar-button_delete">
					  				Удалить заметку
				  			</div>
		  			</div>

			    	<div class="note-card__header">
				    		<h2 v-if="!isTitleOpenToEdit" class="note-card__title">{{ note.title }}</h2>
				    		<input v-if="isTitleOpenToEdit" v-model="note.title" type="text" class="note-card__title-input"></input>
				    		<div class="note-card__title-button-wrapper">
					    			<div v-if="!isTitleOpenToEdit"
					    				   @click="onEditTitleButtonClick()"
					    				   data-tooltip="Изменить заголовок"
					    				   class="note-card__title-button_edit">
					    				 	Изменить(Заг)
			    				 	</div>
					    			<div v-if="isTitleOpenToEdit"
					    					 @click="onConfirmTitleButtonClick()"
					    					 data-tooltip="Сохранить изменения"
					    					 class="note-card__title-button_confirm">
					    					Сохранить(Заг)
				    				</div>
					    			<div v-if="isTitleOpenToEdit"
					    					 @click="onCancelTitleButtonClick()"
					    					 data-tooltip="Отменить изменения"
					    					 class="note-card__title-button_cancel">
					    					Отменить(Заг)
				    				</div>
				    		</div>
			    	</div>
	    
		    		<div class="note-card__body">
		    				<ul class="note-card__todo-list">
    								<app-todo-item v-for="todoItem in note.todoList" 
    															 :item="todoItem"
															 		 @deleteItem="deleteTodoItem(todoItem)"
															 		 @setStateSnapshot="setStateSnapshot($event)"></app-todo-item>
								</ul>
		    				<div @click="onAddTodoItemButtonClick()"
		    						 data-tooltip="Добавить задачу"
		    						 class="note-card__todo-add-item-button">
		    						Добавить(ТДИ)
	    					</div>
		    		</div>
	    
	    			<div class="note-card__footer">
	    					<div @click="onCancelNoteChangesButtonClick()"
	    							 data-tooltip="Отменить изменения"
	    							 class="note-card__footer-button_cancel">
	    							Отменить(Зам)
    						</div>
	    					<div @click="onConfirmNoteChangesButtonClick()"
	    							 data-tooltip="Сохранить изменения"
	    							 class="note-card__footer-button_save">
	    							Сохранить(Зам)
    						</div>
	    			</div>
	  	
	  		</div>

	  		<app-dialog v-if="isDialogVisible"
	  								:dialogProps="dialogProps"
	  								@confirm="answerIsConfirm()"
	  								@cancel="closeModal()"></app-dialog>

		</div>
</template>

<script>
	import TodoItem from './TodoItem.vue'
	import DialogWindow from './DialogWindow.vue'

  export default {
		props: ['noteId'],

		data () {
		  return {
	      currentNoteId: this.noteId,			// ID открытой заметки
		  	isTitleOpenToEdit: false,				// флаг редактирования заголовка заметки
		  	isTodoItemOpenToEdit: false,		// флаг редактирования элемента списка задач
	      isDialogVisible: false,					// флаг видимости диалогового окна
		  	oldNoteTitle: null,							// заголовок заметки до изменения
		  	oldTodoText: null,							// текст элемента списка задач до изменения
		  	initState: null,								// состояние хранилища до внесения каких-либо изменений в заметке
		  	doneChanges: [],								// массив состояний хранилищ для возможности отмены изменений
		  	undoneChanges: [],							// массив состояний хранилищ для возможности восстановления отмененных изменений
		  	stateBeforeTitleUpdated: null,	// состояние хранилища до изменения заголовка заметки
		  	dialogProps: null								// объект с информацией для диалогового окна
		  }
		},

		created () {
			/**
			 * Сохраняем изначальное состояние хранилища для возможности отката изменений при нажатии на кнопку отмены
			 */
			this.initState = JSON.parse(JSON.stringify(this.$store.state))
		},

		computed: {

			/**
			 * Получение объекта текущей заметки
			 * 
			 * @return {Object} note 	Объект текущей заметки
			 */
			note () {
				/**
				 * this.currentNoteId равна null только в случае создания новой заметки
				 * Следовательно, нужно добавить данную заметку в хранилище
				 */
				if (this.currentNoteId === null) {
					let newNote = {
						id: this.getNextId(),
						title: 'New Note',
						todoList: []
					}

					this.$store.dispatch('addNewNote', newNote)
					this.currentNoteId = newNote.id
				}

				let note = this.$store.state.notes.filter(item => item.id === this.currentNoteId)[0]

				return note

			},

			/**
			 * Проверка возможности отмены действия
			 * 
			 * @return {Boolean} canUndo	Флаг возможности отмены действия
			 */
			canUndo () {
				let canUndo = this.doneChanges.length && !this.isTitleOpenToEdit && !this.isTodoItemOpenToEdit

				return canUndo 
			},

			/**
			 * Проверка возможности возврата отмененного действия
			 * 
			 * @return {Boolean} canRedo	Флаг возможности возврата отмененного действия
			 */
			canRedo () {
				let canRedo = this.undoneChanges.length && !this.isTitleOpenToEdit && !this.isTodoItemOpenToEdit
				
				return canRedo
			}

		},

		methods: {
			
			/**
			 * Получить ID для новой заметки
			 * 
			 * @return {Number} nextId 	ID новой заметки
			 */
			getNextId () {
				let nextId = this.$store.state.nextId
				this.$store.dispatch('getNextId')

				return nextId
			},

			/**
			 * Сделать снимок состояния хранилища для возможности отмены внесенного изменения
			 * 
			 * @param {Object} state	Объект предыдущего состояния хранилища
			 */
			setStateSnapshot (state) {
				let newState = JSON.parse(JSON.stringify(this.$store.state))
				if (state) {
					newState = state
				}

				this.doneChanges.push(newState)
				this.undoneChanges = []
			},

			/**
			 * Удалить элемент из списка задач
			 * 
			 * @param  {Object} todoItem	Удаляемый элемент списка задач
			 */
			deleteTodoItem (todoItem) {
				this.$store.dispatch('deleteTodoItem', {id: this.currentNoteId, item: todoItem})
			},

			/**
			 * Удалить текущую заметку
			 */
			deleteNote () {
				this.$store.dispatch('deleteNote', this.currentNoteId)
				this.$emit('saveToLocalStorage')
				this.$emit('showNotes')
			},

			/**
			 * Обработка положительных ответов от диалоговых окон
			 */
			answerIsConfirm () {
				if (this.dialogProps.type === 'deleteNote') {
					this.deleteNote()
				} else if (this.dialogProps.type === 'cancelNoteChanges') {
					this.cancelNoteChanges()
				}

				this.closeModal()
			},

			/**
			 * Закрыть диалоговое окно
			 */
			closeModal () {
				this.dialogProps = null
				this.isDialogVisible = false
			},

			/**
			 * Отмена всех внесенных изменений
			 */
			cancelNoteChanges () {
				this.$store.replaceState(this.initState)
				this.$emit('showNotes')
			},

			/**
			 * Обработка нажатия на кнопку отмены действия
			 */
			onUndoButtonClick () {
				let prevState = this.doneChanges.pop()
				let nextState = JSON.parse(JSON.stringify(this.$store.state))
				this.$store.replaceState(prevState)
				this.undoneChanges.push(nextState)
			},

			/**
			 * Обработка нажатия на кнопку возврата отмененного действия
			 */
			onRedoButtonClick () {
				let nextState = this.undoneChanges.pop()
				let prevState = JSON.parse(JSON.stringify(this.$store.state))
				this.$store.replaceState(nextState)
				this.doneChanges.push(prevState)
			},

			/**
			 * Обработка нажатия на кнопку удаления заметки
			 */
			onDeleteNoteButtonClick () {
				this.dialogProps = {
	  			title: 'Удалить заметку?',
	  			cancelText: 'Отмена',
	  			confirmText: 'Удалить',
	  			type: 'deleteNote'
	  		}
	  		this.isDialogVisible = true
			},

			/**
			 * Обработка нажатия на кнопку сохранения всех изменений в заметке
			 */
			onConfirmNoteChangesButtonClick () {
				this.$emit('saveToLocalStorage')
				this.$emit('showNotes')
			},

			/**
			 * Обработка нажатия на кнопку отмены всех изменений в заметке
			 */
			onCancelNoteChangesButtonClick () {
				this.dialogProps = {
	  			title: 'Отменить внесенные изменения?',
	  			cancelText: 'Нет',
	  			confirmText: 'Да',
	  			type: 'cancelNoteChanges'
	  		}
	  		this.isDialogVisible = true
			},

			/**
			 * Обработка нажатия на кнопку изменения заголовка заметки
			 */
			onEditTitleButtonClick () {
				this.stateBeforeTitleUpdated = JSON.parse(JSON.stringify(this.$store.state))
				this.isTitleOpenToEdit = true
				this.oldNoteTitle = this.note.title
			},

			/**
			 * Обработка нажатия на кнопку сохранения изменений заголовка заметки
			 */
			onConfirmTitleButtonClick () {
				this.isTitleOpenToEdit = false
				if (this.note.title != this.oldNoteTitle) {
					this.setStateSnapshot(this.stateBeforeTitleUpdated)
				}

				this.oldNoteTitle = null
			},

			/**
			 * Обработка нажатия на кнопку отмены изменений заголовка заметки
			 */
			onCancelTitleButtonClick () {
				this.isTitleOpenToEdit = false
				this.note.title = this.oldNoteTitle
				this.oldNoteTitle = null
			},

			/**
			 * Обработка нажатия на кнопку добавления элемента в список задач
			 */
			onAddTodoItemButtonClick () {
				this.setStateSnapshot()
				this.$store.dispatch('addTodoItem', this.currentNoteId)
			}

		},

		components: {
			'app-todo-item': TodoItem,
			'app-dialog': DialogWindow
		}
  }
</script>