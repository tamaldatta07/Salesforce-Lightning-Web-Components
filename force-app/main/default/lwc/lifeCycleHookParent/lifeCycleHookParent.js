import { LightningElement } from 'lwc';

export default class LifeCycleHookParent extends LightningElement {
    // name
    isChildVisible = false
    constructor(){
        super()
        console.log("Parent constructor called")
    }

    connectedCallback(){
        console.log("Parent connectedCallback called")

    }
    renderedCallback(){
        console.log("Parent renderedCallback called")
        
    }

    // changeHandler(event){
    //     this.name = event.target.value
    // }

    handleClick(){
        this.isChildVisible = !this.isChildVisible
    }

    errorCallback(error, stack){
        console.log(error.message)
        console.log(stack)
    }
}