import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
export default class NavigateToRelatedRelationshipPage extends NavigationMixin(LightningElement) {

    goToRelatedRelationshipPage(){
        this[NavigationMixin.Navigate]({
            type:'standard__recordRelationshipPage',
            attributes:{
                recordId: '0015h00001085mDAAQ',
                objectApiName:'Account',
                relationshipApiName: 'Contacts',
                actionName:'view'
            }
        })
    }
}