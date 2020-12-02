///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import NetworkContractPage from '../../../../../page-objects/ELE/NetworkContractPage'

describe('Logs in, adds bus. customer, creates unmetered object with owner, creates network contract w/o metering solution', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let nwContractPage = new NetworkContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create bus. customer, unmetered object, and network contract base(only general data)', () => {
        customerPage.createBusinessCustomer()
        objectPage.createObject()
        nwContractPage.createNWContractBase()
    })
})