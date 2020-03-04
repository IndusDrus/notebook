module.exports = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          done: [], // скорее всего сюда нужно положить первое состояние как точку невозврата?
          undone: []
        };
      },
      created() {
        this.$store.subscribe(mutation => {
        	// это происходит после мутации
          this.done.push(JSON.parse(JSON.stringify(this.$store.state)))
        })
      },
      methods: {
        redo() {
          this.done.push(this.undone.pop())
          this.$store.replaceState(this.done[length - 1])
        },
        undo() {
          this.undone.push(this.done.pop())
          this.$store.replaceState(this.done[length - 1])
        }
      },
      computed: {
        canRedo() {
          return this.undone.length;
        },
        canUndo() {
          return this.done.length;
        }
      }
    });
  },
}