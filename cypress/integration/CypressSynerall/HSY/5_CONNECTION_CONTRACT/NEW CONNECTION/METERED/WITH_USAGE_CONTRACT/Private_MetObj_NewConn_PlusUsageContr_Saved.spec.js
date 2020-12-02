///<reference types="Cypress"/>
import CustomerPage from '../../../../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../../../page-objects/HSY/ConnectionContractPage'
import UsageContractPage from '../../../../../../../page-objects/HSY/UsageContractPage'

describe('Logs in, creates bus. customer, unmetered object and a new connection contract (saved)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let usageContractPage = new UsageContractPage()
    before(function() {
        connContractPage.login()
    })

    it('Creates bus. customer, unmetered object and a new connection contract (saved)', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConfirmed()
        usageContractPage.gotoUsageContractBase()
        usageContractPage.createUsageContractSaved()
    })
})