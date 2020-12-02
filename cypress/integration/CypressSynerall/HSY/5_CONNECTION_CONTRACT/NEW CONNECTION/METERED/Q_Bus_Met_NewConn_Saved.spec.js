///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/HSY/CustomerPage'
import ObjectPage from '../../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../../page-objects/HSY/ConnectionContractPage'

describe('Logs in, creates private customer, clones an object and creates a new connection contract (saved)', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    before(function() {
        connContractPage.login()
    })

    it('Creates private customer, clones an object and creates a new connection contract (saved)', () => {
        customerPage.createBusinessCustomer()
        objectPage.cloneObjAndChangeOwner()
        connContractPage.createConnContractSaved()
    })
})