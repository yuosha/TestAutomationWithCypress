///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/ELE/CustomerPage'
describe('Adds business customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('Creates business customer with address and email', () => {
        customerPage.createBusinessCustomer()
    })
})