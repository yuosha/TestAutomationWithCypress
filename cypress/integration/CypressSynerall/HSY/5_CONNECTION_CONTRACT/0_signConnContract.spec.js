///<reference types="Cypress"/>
import OwnerChangeContractPage from '../../../../page-objects/HSY/OwnerChangeContractPage'

//This spec assumes that the object that has confirmed connection contract has been saved to a file object.txt
describe('Logs in and signs a confirmed connection contract', () => {
    let ownerChangeContractPage = new OwnerChangeContractPage()
    before(function() {
        ownerChangeContractPage.login()
    })

    it('signs connection contract', () => {
        ownerChangeContractPage.sign()
    })
})