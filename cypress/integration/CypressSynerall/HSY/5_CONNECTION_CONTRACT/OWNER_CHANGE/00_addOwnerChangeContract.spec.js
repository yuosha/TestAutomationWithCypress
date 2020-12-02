///<reference types="Cypress"/>
import OwnerChangeContractPage from '../../../../../page-objects/HSY/OwnerChangeContractPage'

//This spec assumes that the object (with a new confirmed connection contract) has been saved to a file object.txt
// This spec assumes that new owner has been saved to client.txt
describe('Logs in, creates a connected owner change contract to already existing object which has new connection contract (connected)', () => {
    let ownerChangeContractPage = new OwnerChangeContractPage()
    before(function() {
        ownerChangeContractPage.login()
    })

    it('Creates a connected owner change contract to already existing object, issues, signs and connects', () => {
        ownerChangeContractPage.createOwnerChangeContractConfirmed()
    })
})