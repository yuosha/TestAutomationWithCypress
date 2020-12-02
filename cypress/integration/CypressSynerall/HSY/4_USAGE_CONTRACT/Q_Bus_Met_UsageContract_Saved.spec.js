//<reference types="Cypress"/>
import CustomerPage from '../../../../page-objects/HSY/CustomerPage'
import ObjectPage from '../../../../page-objects/HSY/ObjectPage'
import UsageContractPage from '../../../../page-objects/HSY/UsageContractPage'

//[Q]-this script uses an object cloning button that was added to HSY Synerall
//the UI clone button creates a new object based on clone base(already metered)
describe('Creates usage contract -saved', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    let usageContractPage = new UsageContractPage()
    
    before(function() {
        usageContractPage.login()
    })

    it('should create new usage contract -saved', () => {
        customerPage.createBusinessCustomer()
        objectPage.cloneObjAndChangeOwner()
        usageContractPage.createUsageContractBase()
        usageContractPage.createUsageContractSaved()
    })
})