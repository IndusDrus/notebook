<template>
	  <li>
				<input class="item-checkbox" type="checkbox" v-model="item.checked"></input>
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
	      oldItemText: null
	    }
	  },

	  methods: {
	  	onEditItemButtonClick () {		// редактирование текста элемента 'to-do' списка
				this.isItemOpenToEdit = true
				this.oldItemText = this.item.text
			},

			onDeleteItemButtonClick () {		// удаление элемента 'to-do' списка
				this.$emit('deleteItem')
			},

			onConfirmItemButtonClick () {		// сохранение изменений текста элемента 'to-do' списка
				this.isItemOpenToEdit = false
				this.oldItemText = null

				// внести изменения в хранилище для возможности отката изменений
			},

			onCancelItemButtonClick () {		// отмена изменений элемента 'to-do' списка
				this.isItemOpenToEdit = false
				this.item.text = this.oldItemText
				this.oldItemText = null
			}
	  }
}
</script>