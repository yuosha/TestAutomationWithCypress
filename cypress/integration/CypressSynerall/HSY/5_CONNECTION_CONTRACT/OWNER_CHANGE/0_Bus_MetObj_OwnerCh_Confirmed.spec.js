///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/HSY/CustomerPage'
import OwnerChangeContractPage from '../../../../../page-objects/HSY/OwnerChangeContractPage'

//This spec assumes that the object exists that has signed-paid new conn contract and this object is saved to a file object.txt
//It is assumed that this object already has a billed and paid new connection contract
describe('Logs in, creates a confirmed owner change contract to already existing object which has billed and paid new connection contract', () => {
    let customerPage = new CustomerPage()
    let ownerChangeContractPage = new OwnerChangeContractPage()
    beforeEach(function() {
        ownerChangeContractPage.login()
    })

    it('Creates a connected owner change contract to already existing object, issues, signs and connects', () => {
        customerPage.createBusinessCustomer()
        ownerChangeContractPage.createOwnerChangeContractConfirmed()       
    })
})