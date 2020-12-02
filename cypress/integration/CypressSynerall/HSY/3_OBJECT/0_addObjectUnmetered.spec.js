///<reference types="Cypress"/>
import ObjectPage from '../../../../page-objects/HSY/ObjectPage'

//assumes an existing customer is in client.txt
describe('Logs in and adds a new unmetered object', () => {
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('should create new unmetered object', () => {
        objectPage.openObjectCreationForm()
        objectPage.saveGeneralData() 
        objectPage.saveCPData()
        objectPage.saveUPData()
    })
})