// ContactController.cls
public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getRelatedContacts(Id accountId) {
        Account acc = [SELECT Owner.Email, Status__c, AccMail__c FROM Account WHERE Id = :accountId];
        String accountStatus = acc.Status__c;
        String accountEmail = acc.AccMail__c;
        return [SELECT Id, Name, Status__c FROM Contact WHERE AccountId = :accountId AND Status__c = :accountStatus];
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, Name, Email FROM Contact LIMIT 10];
    }

    @AuraEnabled
    public static void sendEmailToAccountOwner(Id accountId, List<Contact> contacts) {
        // Get Account details
        Account acc = [SELECT OwnerId, Owner.Email, AccMail__c FROM Account WHERE Id = :accountId];
        String accountOwnerId = acc.OwnerId;
        String accountOwnerEmail = acc.Owner.Email;
        String accountEmail = acc.AccMail__c;

        // Determine the email address to use
        String toEmail;
        if (!String.isBlank(accountEmail)) {
            // Use AccMail if available
            toEmail = accountEmail;
        } else {
            // Fall back to the Account owner's email
            toEmail = accountOwnerEmail;
        }

        // Compose email message
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{toEmail});
        email.setSubject('Contacts with Same Status');
        String emailBody = '<html><body>';
        emailBody += '<p>Here are the contacts with the same status as the Account:</p>';
        emailBody += '<table border="1"><tr><th>Name</th><th>Status</th></tr>';
        for (Contact c : contacts) {
            emailBody += '<tr><td>' + c.Name + '</td><td>' + c.Status__c + '</td></tr>';
        }
        emailBody += '</table></body></html>';

        email.setHtmlBody(emailBody);

        // Send email
        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
    }
}