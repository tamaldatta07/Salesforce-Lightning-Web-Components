import { LightningElement, track, wire } from 'lwc';
import getShayaris from '@salesforce/apex/ShayariController.getShayaris';
import createShayari from '@salesforce/apex/ShayariController.createShayari';
import deleteShayari from '@salesforce/apex/ShayariController.deleteShayari';
import { refreshApex } from '@salesforce/apex';

export default class ShayariApp extends LightningElement {
    @track isModalOpen = false;
    @track shayariText = '';
    @track keywords = '';
    @track searchKeyword = '';
    @track shayaris = [];

    // For Share (SMS) modal
    @track isShareModalOpen = false;
    @track shareNumber = '';
    @track selectedShayari = null;

    wiredShayarisResult;

    @wire(getShayaris, { searchKey: '$searchKeyword' })
    wiredGetShayaris(result) {
        this.wiredShayarisResult = result;
        if (result.data) {
            this.shayaris = result.data;
        } else if (result.error) {
            console.error('Error fetching shayaris:', result.error);
        }
    }

    get gridClass() {
        return this.shayaris.length === 1 ? 'grid-container single' : 'grid-container';
    }

    // Methods for "Add Shayari" modal.
    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
        this.shayariText = '';
        this.keywords = '';
    }

    handleTextChange(event) {
        this.shayariText = event.target.value;
    }

    handleKeywordsChange(event) {
        this.keywords = event.target.value;
    }

    handleModalSave() {
        if (this.shayariText.trim() === '') {
            return;
        }
        createShayari({ text: this.shayariText, keywords: this.keywords })
            .then(() => refreshApex(this.wiredShayarisResult))
            .then(() => this.closeModal())
            .catch(error => {
                console.error('Error adding shayari:', error);
            });
    }

    // Delete handler.
    handleDeleteShayari(event) {
        const recordId = event.currentTarget.dataset.id;
        if (confirm('Are you sure you want to delete this shayari?')) {
            deleteShayari({ shayariId: recordId })
                .then(() => refreshApex(this.wiredShayarisResult))
                .catch(error => {
                    console.error('Error deleting shayari:', error);
                });
        }
    }

    handleRefresh() {
        refreshApex(this.wiredShayarisResult);
    }

    // Methods for Share (SMS) integration.
    handleShareIconClick(event) {
        const recordId = event.currentTarget.dataset.id;
        this.selectedShayari = this.shayaris.find(item => item.Id === recordId);
        this.isShareModalOpen = true;
    }

    handleShareNumberChange(event) {
        this.shareNumber = event.target.value;
    }

    handleSendShare() {
        if (!this.shareNumber || !this.selectedShayari) {
            return;
        }
        // Prepare and encode the message.
        let message = this.selectedShayari.Text__c;
        message = encodeURIComponent(message);
        // Construct SMS URI. Note: This works best on mobile devices.
        const url = `sms:${this.shareNumber}?body=${message}`;
        window.open(url, '_blank');
        this.closeShareModal();
    }

    closeShareModal() {
        this.isShareModalOpen = false;
        this.shareNumber = '';
        this.selectedShayari = null;
    }

    handleSearch(event) {
        this.searchKeyword = event.target.value.toLowerCase();
    }
}
