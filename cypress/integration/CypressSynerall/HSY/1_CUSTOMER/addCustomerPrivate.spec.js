///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'

describe('Adds private customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('should create private customer with address and email', () => {
        customerPage.createPrivateCustomer()
    })
})