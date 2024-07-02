import { LightningElement } from 'lwc';

export default class LifeCycleHookChild extends LightningElement {
    
        constructor(){
            super()
            console.log("Child constructor called")
        }
    
        connectedCallback(){
            console.log("Child connectedCallback called")
            // window.addEventListener('click',this.handleclick)
            throw new Error('Loading of child component failed')
    
        }
        renderedCallback(){
            console.log("Child renderedCallback called")
            
        }
        disconnectedCallback(){
            // console.log("Child disconnectedCallback called")
            alert('Child disconnectedCallback called')
            // window.removeEventListener('click',this.handleclick)

        }
    
}