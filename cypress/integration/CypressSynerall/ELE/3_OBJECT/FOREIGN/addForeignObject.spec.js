///<reference types="Cypress"/>
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'

describe('Logs in and adds a new unmetered object with owner', () => {
    let objectPage = new ObjectPage()
    before(function() {
        objectPage.login()
    })

    it('Creates a new unmetered object with owner', () => {
        objectPage.createForeignObject()
    })
})