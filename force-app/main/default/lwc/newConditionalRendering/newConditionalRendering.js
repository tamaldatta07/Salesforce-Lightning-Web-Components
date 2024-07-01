import { LightningElement } from 'lwc';

export default class NewConditionalRendering extends LightningElement {

    buttonLabel = 'Button 3';
    property1 = false
    property2 = false

    handleClick(){
        if(this.property1 == true){
            this.property1 = false;
            this.buttonLabel = 'Button for Property 1 change'
        }else{
            this.property1 = true;
            this.buttonLabel = 'Button for Property 2 change'
        }
    }
}