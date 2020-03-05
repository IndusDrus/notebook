<template>
	  <li>
				<input v-model="item.checked"
					 		 @click="changeCheckboxState()"
							 class="item-checkbox"
							 type="checkbox"></input>
				<span v-if="!isItemOpenToEdit" class="item-text">{{ item.text }}</span>
				<input v-if="isItemOpenToEdit" v-model="item.text" type="text" class="item-text-input">
				<div class="item-button-wrapper">
						<div v-if="!isItemOpenToEdit"
								 @click="onEditItemButtonClick()"
								 class="item-button item-edit-button">
								Изменить(ТДИ)
						</div>
						<div v-if="!isItemOpenToEdit"
								 @click="onDeleteItemButtonClick()"
								 class="item-button item-delete-button">
								Удалить(ТДИ)
						</div>
						<div v-if="isItemOpenToEdit"
								 @click="onConfirmItemButtonClick()"
								 class="item-button item-confirm-button">
								Сохранить(ТДИ)
						</div>
						<div v-if="isItemOpenToEdit"
								 @click="onCancelItemButtonClick()"
								 class="item-button item-cancel-button">
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
	      isItemOpenToEdit: false,
	      oldItemText: null,
	      stateBeforeTextUpdated: null
	    }
	  },

	  methods: {
	  	onEditItemButtonClick () {		// редактирование текста элемента 'to-do' списка
				this.stateBeforeTextUpdated = JSON.parse(JSON.stringify(this.$store.state))
				this.isItemOpenToEdit = true
				this.oldItemText = this.item.text
			},

			onDeleteItemButtonClick () {		// удаление элемента 'to-do' списка
				this.$emit('setStateSnapshot')
				this.$emit('deleteItem')
			},

			onConfirmItemButtonClick () {		// сохранение изменений текста элемента 'to-do' списка
				this.isItemOpenToEdit = false
				if (this.item.text != this.oldItemText) {
					this.$emit('setStateSnapshot', this.stateBeforeTextUpdated)
				}
				this.oldItemText = null
			},

			onCancelItemButtonClick () {		// отмена изменений элемента 'to-do' списка
				this.isItemOpenToEdit = false
				this.item.text = this.oldItemText
				this.oldItemText = null
			},

			changeCheckboxState () {		// отработка нажатия на чекбокс для вохможности отката изменений
				this.$emit('setStateSnapshot')
			}
	  }
}
</script>