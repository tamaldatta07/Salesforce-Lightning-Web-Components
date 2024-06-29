import { LightningElement, api } from 'lwc';

export default class HelloChildComponent extends LightningElement {
    @api itemName = " @api decorator demo "

    @api handleChangeValue(){
        this.itemName = "LWC API decorator demo"
    }
}