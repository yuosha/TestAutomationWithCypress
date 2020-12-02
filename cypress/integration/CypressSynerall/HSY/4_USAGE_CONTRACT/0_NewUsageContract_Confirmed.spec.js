//<reference types="Cypress"/>
import UsageContractPage from '../../../../page-objects/HSY/UsageContractPage'

//Assumes that metered object with owner has been saved to object.txt
describe('Creates usage contract -confirmed', () => {

    let usageContractPage = new UsageContractPage()
    
    before(function() {
        usageContractPage.login()
    })

    it('should create new usage contract -confirmed', () => {
        usageContractPage.createUsageContractBase()
        usageContractPage.createUsageContractConfirmed()
    })
})