///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/HSY/CustomerPage'
import ObjectPage from '../../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../../page-objects/HSY/ConnectionContractPage'

describe('Logs in, creates bus. customer, unmetered object and a new connection contract (confirmed)', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    before(function() {
        connContractPage.login()
    })

    it('should create bus. customer, unmetered object and a new connection contract (confirmed)', () => {
        customerPage.createBusinessCustomer()
        objectPage.createObject()
        connContractPage.createConnContractConfirmed()
    })
})