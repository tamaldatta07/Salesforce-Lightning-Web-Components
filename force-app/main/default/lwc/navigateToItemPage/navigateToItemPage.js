import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
export default class NavigateToItemPage extends NavigationMixin(LightningElement) {

    navigateToTab(){
        this[NavigationMixin.Navigate]({
            type:'standard__navItemPage',
            attributes:{
                apiName:'LWC_POC'
            }
        })
    }
}