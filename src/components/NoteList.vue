<template>
  	<div class="note-list">
	    		
				<div v-for="note in notes" class="note-list__card">
  					<div class="note-list__card-wrapper">

				  			<div class="note-list__card-header">
						    		<div class="note-list__card-buttons-wrapper">
					    					<div @click="onChangeButtonClick(note.id)"
					    							 class="note-list__note-button">
					    							<i title="Изменить заметку" class="note-list__note-button-icon note-list__note-button-icon_change icon-cog"></i>
				    						</div>
					    					<div @click="onDeleteButtonClick(note.id)"
					    							 class="note-list__note-button">
					    							 <i title="Удалить заметку" class="note-list__note-button-icon note-list__note-button-icon_delete icon-trash"></i>
				    						</div>
					    			</div>
						    		<h2 class="note-list__card-title">{{ note.title }}</h2>
					    	</div>
			    
				    		<div class="note-list__card-body">
				    				<ul class="note-list__todo-list">
		    								<li v-for="todoItem in note.todoList.slice(0, countTodoItemsOnNote)" class="note-list__todo-item">
		    										<div class="note-list__todo-item-checkbox">
		    												<i v-if="todoItem.checked" class="note-list__todo-item-checkbox-icon icon-check-square"></i>
		    										</div>
		    										<p class="note-list__todo-item-text">{{ todoItem.text }}</p>
							    			</li>
							    	</ul>
				    		</div>
  					</div>
	  	
	  		</div>

				<div @click="onAddButtonClick()"
						 class="note-list__add-button">
						<i class="note-list__add-button-icon icon-plus-circle" title="Создать заметку"></i>
				</div>

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
	      dialogProps: null,			// объект с информацией для диалогового окна
	      isDialogVisible: false,	// флаг видимости диалогового окна
	      currentNoteId: null,		// ID выбранной заметки
	      countTodoItemsOnNote: 2	// количество показанных элементов списка задач заметки
	    }
	  },

	  computed: {

	  	/**
	  	 * Получение списка заметок из хранилища
	  	 * 
	  	 * @return {Object} notes	Список заметок
	  	 */
	  	notes () {
	  		let notes = this.$store.state.notes

	  		return notes
	  	}

	  },
	  methods: {

	  	/**
	  	 * Закрыть диалоговое окно
	  	 */
	  	closeModal () {
	  		this.dialogProps = null
	  		this.isDialogVisible = false
	  		this.currentNoteId = null
	  	},

	  	/**
	  	 * Удалить текущую заметку
	  	 */
	  	deleteNote () {
	  		this.$store.dispatch('deleteNote', this.currentNoteId)
	  		this.$emit('saveToLocalStorage')
	  		this.closeModal()
	  	},
	  	
	  	/**
	  	 * Обработка нажатия на кнопку добавления новой заметки
	  	 */
	  	onAddButtonClick () {
	  		this.$emit('openNewNote')
	  	},

	  	/**
	  	 * Обработка нажатия на кнопку редактирования заметки
	  	 * 
	  	 * @param  {Number} noteId	ID редактируемой заметки
	  	 */
	  	onChangeButtonClick (noteId) {
	  		this.$emit('openNote', noteId)
	  	},

	  	/**
	  	 * Обработка нажатия на кнопку удаления заметки
	  	 * 
	  	 * @param  {Number} noteId	ID удаляемой заметки
	  	 */
	  	onDeleteButtonClick (noteId) {
	  		this.dialogProps = {
	  			title: 'Удалить заметку?',
	  			cancelText: 'Отмена',
	  			confirmText: 'Удалить'
	  		}
	  		this.currentNoteId = noteId
	  		this.isDialogVisible = true
	  	}

	  },
	  components: {
	  	'app-dialog': DialogWindow
	  }
	}
</script>