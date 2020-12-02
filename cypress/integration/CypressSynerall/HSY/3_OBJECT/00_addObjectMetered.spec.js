///<reference types="Cypress"/>
import ObjectPage from '../../../../page-objects/HSY/ObjectPage'

//assumes an existing customer is in client.txt and an existing meter is in meter.txt
describe('Logs in and adds a new metered object', () => {

    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('should create new metered object', () => {
        objectPage.openObjectCreationForm()
        objectPage.saveGeneralData() 
        objectPage.saveCPData()
        objectPage.saveUPData()
        objectPage.installMeterToUP()
    })
})