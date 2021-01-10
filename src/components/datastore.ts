
const store = {
    debug: true,
    
    state: Vue.reactive({
        message: 'Hello!'
    }),
    
    setMessageAction(newValue: any) {
        if (this.debug) {
        console.log('setMessageAction triggered with', newValue)
        }
    
        this.state.message = newValue
    },
}