///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../../page-objects/HSY/ConnectionContractPage'

describe('Logs in, creates private customer, metered object and a new connection contract (saved)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    before(function() {
        connContractPage.login()
    })

    it('Creates private customer, metered object and a new connection contract (saved)', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractSaved()
    })
})