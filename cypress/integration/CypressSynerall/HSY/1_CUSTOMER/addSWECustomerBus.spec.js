///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'

describe('Adds business SWE customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('should create business SWE customer with address and email', () => {
        customerPage.createBusinessCustomerSWE()
    })
})