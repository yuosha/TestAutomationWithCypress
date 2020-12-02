///<reference types="Cypress"/>
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'

//THIS SPEC ASSUMES: *meterid.txt contains meterID and  *clientid.txt contains clientID 
// .... so that user can create a metered object with existing client and meter
describe('Logs in and adds a new metered object', () => {
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('Creates a new metered object', () => {
        objectPage.createObjectandInstallMeter()
    })
})