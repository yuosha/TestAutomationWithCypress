///<reference types="Cypress"/>
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'

//THIS SPEC ASSUMES: *clientid.txt contains clientID 
// .... so that user can create an unmetered object with an existing client
describe('Logs in and adds a new unmetered object with owner', () => {
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('Creates a new unmetered object with owner', () => {
        objectPage.createObject()
    })
})