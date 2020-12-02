///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds joint customer, creates unmetered object and saves customer as object owner', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates joint customer, unmetered object and save the customer as an object owner', () => {
        customerPage.createJointClient()
        objectPage.createObject()
    })
})