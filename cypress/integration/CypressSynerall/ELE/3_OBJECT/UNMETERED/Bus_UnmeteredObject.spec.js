///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds business customer, creates unmetered object and saves customer as an object owner', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates business customer, unmetered object and save the customer as an object owner', () => {
        customerPage.createBusinessCustomer()
        objectPage.createObject()
    })
})