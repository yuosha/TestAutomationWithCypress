///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/ELE/CustomerPage'
describe('Adds private customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('Creates private customer with address and email', () => {
        customerPage.createPrivateCustomer()
    })
})