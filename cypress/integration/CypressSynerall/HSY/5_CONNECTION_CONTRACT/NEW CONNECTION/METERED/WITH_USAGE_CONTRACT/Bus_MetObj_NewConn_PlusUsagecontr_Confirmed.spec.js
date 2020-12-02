///<reference types="Cypress"/>
import CustomerPage from '../../../../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../../../page-objects/HSY/ConnectionContractPage'
import UsageContractPage from '../../../../../../../page-objects/HSY/UsageContractPage'

describe('Logs in, creates private customer, unmetered object and a new connection contract (confirmed)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let usageContractPage = new UsageContractPage()
    before(function() {
        connContractPage.login()
    })

    it('Creates private customer, unmetered object and a new connection contract (confirmed)', () => {
        customerPage.createBusinessCustomer()
        meterPage.createNewMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConfirmed()
        usageContractPage.gotoUsageContractBase()
        usageContractPage.createUsageContractConfirmed()
    })
})