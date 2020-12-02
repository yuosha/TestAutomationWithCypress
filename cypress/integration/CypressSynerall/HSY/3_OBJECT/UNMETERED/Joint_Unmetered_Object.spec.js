///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/HSY/CustomerPage'
import ObjectPage from '../../../../../page-objects/HSY/ObjectPage'

describe('Logs in and adds a new unmetered object', () => {
    let customerPage = new CustomerPage()
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('should create new unmetered object', () => {
        customerPage.createJointClient()
        objectPage.openObjectCreationForm()
        objectPage.saveGeneralData() 
        objectPage.saveCPData()
        objectPage.saveUPData()
    })
})