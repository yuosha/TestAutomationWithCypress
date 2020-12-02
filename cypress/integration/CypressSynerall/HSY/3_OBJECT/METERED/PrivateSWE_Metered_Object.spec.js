///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../../page-objects/HSY/ObjectPage'

describe('Logs in and adds a new metered object', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('should create new metered object', () => {
        customerPage.createPrivateCustomerSWE()
        meterPage.createNewMeter()
        objectPage.openObjectCreationForm()
        objectPage.saveGeneralData() 
        objectPage.saveCPData()
        objectPage.saveUPData()
        objectPage.installMeterToUP()
    })
})