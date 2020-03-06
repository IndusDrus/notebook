<template>
  	<div class="dialog-wrapper">
    		
				<div class="dialog">
						<h3 class="dialog__title">{{ dialogProps.title }}</h3>
						<div class="dialog__buttons-wrapper">
								<div @click="onCancelButtonClick()" class="dialog__button_cancel">{{ dialogProps.cancelText }}</div>
								<div @click="onConfirmButtonClick()" class="dialog__button_confirm">{{ dialogProps.confirmText }}</div>
						</div>
				</div>

  	</div>
</template>

<script>
  export default {
    props: ['dialogProps'],

    data () {
      return {
	      
      }
    },

    methods: {
    	
    	/**
    	 * Обработка нажатия на кнопку отрицательного ответа
    	 */
    	onCancelButtonClick () {
    		this.$emit('cancel')
    	},

    	/**
    	 * Обработка нажатия на кнопку положительного ответа
    	 */
    	onConfirmButtonClick () {
    		this.$emit('confirm')
    	}

    }
  }
</script>