///<reference types="Cypress"/>
import ConnectionContractPage from '../../../../../page-objects/HSY/ConnectionContractPage'

//This spec assumes that the object (where to create a new connection contract) has been saved to a file object.txt
describe('Logs in and adds a new connected connection contract', () => {
    let connContractPage = new ConnectionContractPage()
    before(function() {
        connContractPage.login()
    })

    it('should create new connection contract, confirm it, sign and connect', () => {
        connContractPage.createConnContractConfirmed()
    })
})