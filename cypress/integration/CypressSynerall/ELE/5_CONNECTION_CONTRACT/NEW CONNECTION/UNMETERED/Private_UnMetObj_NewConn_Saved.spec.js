///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../../page-objects/ELE/ConnectionContractPage'

describe('Logs in, adds private customer, creates unmetered object with owner and a new saved connection contract', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create private customer, unmetered object with owner and a new saved connection contract', () => {
        customerPage.createPrivateCustomer()
        objectPage.createObject()
        connContractPage.createConnContractSaved()
    })
})