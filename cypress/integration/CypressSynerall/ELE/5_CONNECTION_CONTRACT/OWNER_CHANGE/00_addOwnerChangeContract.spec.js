///<reference types="Cypress"/>
import OwnerChangeContractPage from '../../../../../page-objects/ELE/OwnerChangeContractPage'

//This spec assumes that the object (where to create an owner change contract) has been saved to a file object.txt
describe('Logs in and adds an issued, signed and connected owner change contract', () => {
    let ownerChangeContractPage = new OwnerChangeContractPage()
    before(function() {
        ownerChangeContractPage.login()
    })

    it('Creates an owner change contract, issue it, sign and connect', () => {
        ownerChangeContractPage.createOwnerChangeContractConnected()
    })
})