<template>
	<div class="note-wrapper">
		
		<div class="note-card">
  	
		  	<div class="card-sidebar">
		  		<div class="card-sidebar-button card-sidebar-undo-button"></div>
		  		<div class="card-sidebar-button card-sidebar-redo-button"></div>
		  		<div class="card-sidebar-button card-sidebar-delete-btn"></div>
		  	</div>

	    	<div class="card-header">
	    		<h2 class="card-title">Title</h2>
	    		<input class="card-title-input" type="text"></input>
	    		<div class="card-title-button-wrapper">
	    			<div class="card-title-button card-title-edit-button"></div>
	    			<div class="card-title-button card-title-confirm-button"></div>
	    			<div class="card-title-button card-title-cancel-button"></div>
	    		</div>
	    	</div>
	    
	    	<div class="card-body">
	    		<div class="card-todo-list-wrapper">
	    			<ul class="card-todo-list">
	    				<li class="card-todo-list-item">
	    					<input class="todo-checkbox" type="checkbox"></input>
	    					<span class="todo-text">Todo text 1</span>
	    					<div class="todo-item-button-wrapper">
	    						<div class="todo-item-button todo-item-edit-button"></div>
	    						<div class="todo-item-button todo-item-delete-button"></div>
	    						<div class="todo-item-button todo-item-confirm-button"></div>
	    						<div class="todo-item-button todo-item-cancel-button"></div>
	    					</div>
	    				</li>

	    				<li class="card-todo-list-item">
	    					<input class="todo-checkbox" type="checkbox"></input>
	    					<span class="todo-text">Todo text 2</span>
	    					<div class="todo-item-button-wrapper">
	    						<div class="todo-item-button todo-item-edit-button"></div>
	    						<div class="todo-item-button todo-item-delete-button"></div>
	    						<div class="todo-item-button todo-item-confirm-button"></div>
	    						<div class="todo-item-button todo-item-cancel-button"></div>
	    					</div>
	    				</li>

	    				<li class="card-todo-list-item">
	    					<input class="todo-checkbox" type="checkbox"></input>
	    					<span class="todo-text">Todo text 3</span>
	    					<div class="todo-item-button-wrapper">
	    						<div class="todo-item-button todo-item-edit-button"></div>
	    						<div class="todo-item-button todo-item-delete-button"></div>
	    						<div class="todo-item-button todo-item-confirm-button"></div>
	    						<div class="todo-item-button todo-item-cancel-button"></div>
	    					</div>
	    				</li>
	    			</ul>
	    		</div>
	    		<div class="card-todo-add-item-button"></div>
	    	</div>
	    
	    	<div class="card-footer">
	    		<div class="card-footer-button card-footer-cancel-button"></div>
	    		<div class="card-footer-button card-footer-save-button"></div>
	    	</div>
	  	
	  	</div>

	  	<app-modal></app-modal>

	</div>
</template>

<script>
  import ModalWindow from './ModalWindow.vue'

  export default {
	data () {
	  return {
	      
	  }
	},
	components: {
		'app-modal': ModalWindow
	}
  }
</script>