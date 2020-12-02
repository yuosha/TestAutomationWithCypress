///<reference types="Cypress"/>
import ConnectionChangeContractPage from '../../../../../page-objects/HSY/ConnectionChangeContractPage'

//This spec assumes that the object (where to create a connection change contract) has been saved to a file object.txt
describe('Logs in, creates a connected connection change contract to already existing object which has new connection contract (connected)', () => {
    let connChangeContractPage = new ConnectionChangeContractPage()
    before(function() {
        connChangeContractPage.login()
    })

    it('Creates a connected connection change contract to already existing object, issues, signs and connects', () => {
        connChangeContractPage.createConnChangeContractObjTypeChSaved()
    })
})