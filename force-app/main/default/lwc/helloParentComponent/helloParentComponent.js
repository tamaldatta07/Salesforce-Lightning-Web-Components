import { LightningElement } from 'lwc';

export default class HelloParentComponent extends LightningElement {
    handleClick(){
        this.template.querySelector("c-hello-child-component").handleChangeValue();
    }
}