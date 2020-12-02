//<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../page-objects/HSY/ObjectPage'
import UsageContractPage from '../../../../page-objects/HSY/UsageContractPage'

describe('Creates usage contract -confirmed', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let usageContractPage = new UsageContractPage()
    
    before(function() {
        usageContractPage.login()
    })

    it('should create new usage contract -confirmed', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewMeter()
        objectPage.createObjectandInstallMeter()
        usageContractPage.createUsageContractBase()
        usageContractPage.createUsageContractConfirmed()
    })
})