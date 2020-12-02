///<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'

describe('Adds joint customer', () => {
    let customerPage = new CustomerPage()
    before(function() {
        customerPage.login()
    })

    it('Creates joint customer with address and email', () => {
        customerPage.createJointClient()
    })
})