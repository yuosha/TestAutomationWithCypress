///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'

describe('Adds private SWE customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('should create private SWE customer with address and email', () => {
        customerPage.createPrivateCustomerSWE()
    })
})