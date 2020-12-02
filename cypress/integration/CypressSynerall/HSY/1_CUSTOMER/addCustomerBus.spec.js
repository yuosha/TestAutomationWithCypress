///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'

describe('Adds business customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('should create business customer with address and email', () => {
        customerPage.createBusinessCustomer()
    })
})