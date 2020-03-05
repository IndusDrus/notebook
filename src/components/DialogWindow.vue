<template>
  	<div class="dialog-wrapper">
    		
				<h3 class="dialog-title">{{ dialogProps.title }}</h3>
				<div class="dialog-buttons-wrapper">
						<div @click="onCancelButtonClick()" class="dialog-button dialog-cancel-button">{{ dialogProps.cancelText }}</div>
						<div @click="onConfirmButtonClick()" class="dialog-button dialog-confirm-button">{{ dialogProps.confirmText }}</div>
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
    	onCancelButtonClick () {
    		this.$emit('cancel')
    	},

    	onConfirmButtonClick () {
    		this.$emit('confirm')
    	}

    }
  }
</script>