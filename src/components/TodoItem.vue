<template>
	  <li class="note-card__todo-item">
				<input v-model="item.checked"
					 		 @click="onCheckboxClick()"
							 class="note-card__todo-item-checkbox"
							 type="checkbox">
				<span v-if="!isItemOpenToEdit" class="note-card__todo-text">{{ item.text }}</span>
				<input v-if="isItemOpenToEdit" v-model="item.text" type="text" class="note-card__todo-text-input">
				<div class="note-card__todo-item-button-wrapper">
						<div v-if="!isItemOpenToEdit"
								 @click="onEditItemButtonClick()"
								 data-tooltip="Изменить текст"
								 class="note-card__todo-item-button_edit">
								Изменить(ТДИ)
						</div>
						<div v-if="!isItemOpenToEdit"
								 @click="onDeleteItemButtonClick()"
								 data-tooltip="Удалить элемент"
								 class="note-card__todo-item-button_delete">
								Удалить(ТДИ)
						</div>
						<div v-if="isItemOpenToEdit"
								 @click="onConfirmItemButtonClick()"
								 data-tooltip="Сохранить изменения"
								 class="note-card__todo-item-button_save">
								Сохранить(ТДИ)
						</div>
						<div v-if="isItemOpenToEdit"
								 @click="onCancelItemButtonClick()"
								 data-tooltip="Отменить изменения"
								 class="note-card__todo-item-button_cancel">
								Отменить(ТДИ)
						</div>
				</div>
		</li>
</template>

<script>
	export default {
	  props: ['item'],
	  data () {
	    return {
	      isItemOpenToEdit: false,			// флаг редактирования текста элемента списка задач
	      oldItemText: null,						// текст элемента списка задач до изменения
	      stateBeforeTextUpdated: null	// состояние хранилища до изменения текста элемента списка задач
	    }
	  },

	  methods: {
	  	
	  	/**
	  	 * Обработка нажатия на чекбокс для возможности отмены изменений
	  	 */
			onCheckboxClick () {
				this.$emit('setStateSnapshot')
			},

	  	/**
	  	 * Обработка нажатия на кнопку изменения текста элемента списка задач
	  	 */
	  	onEditItemButtonClick () {
				this.stateBeforeTextUpdated = JSON.parse(JSON.stringify(this.$store.state))
				this.isItemOpenToEdit = true
				this.oldItemText = this.item.text
			},

			/**
	  	 * Обработка нажатия на кнопку удаления элемента списка задач
	  	 */
			onDeleteItemButtonClick () {
				this.$emit('setStateSnapshot')
				this.$emit('deleteItem')
			},

			/**
	  	 * Обработка нажатия на кнопку сохранения изменений текста элемента списка задач
	  	 */
			onConfirmItemButtonClick () {
				this.isItemOpenToEdit = false
				if (this.item.text != this.oldItemText) {
					this.$emit('setStateSnapshot', this.stateBeforeTextUpdated)
				}
				this.oldItemText = null
			},

			/**
	  	 * Обработка нажатия на кнопку отмены изменений текста элемента списка задач
	  	 */
			onCancelItemButtonClick () {
				this.isItemOpenToEdit = false
				this.item.text = this.oldItemText
				this.oldItemText = null
			}

	  }
}
</script>