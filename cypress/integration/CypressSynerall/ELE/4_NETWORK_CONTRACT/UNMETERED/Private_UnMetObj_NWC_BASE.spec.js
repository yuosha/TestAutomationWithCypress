///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import NetworkContractPage from '../../../../../page-objects/ELE/NetworkContractPage'

describe('Logs in, adds business customer, creates unmetered object with owner, creates network contract w/o metering solution', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let nwContractPage = new NetworkContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create business customer with address and email', () => {
        customerPage.createPrivateCustomer()
        objectPage.createObject()
        nwContractPage.createNWContractBase()
    })
})