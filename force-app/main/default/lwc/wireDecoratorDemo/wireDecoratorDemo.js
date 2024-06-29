import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class WireDecoratorDemo extends LightningElement {
    @wire(getContacts)
    contacts;

    columns = COLUMNS;
}