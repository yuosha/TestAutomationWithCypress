///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/HSY/CustomerPage'
import MeterPage from '../../../../../page-objects/HSY/MeterPage'
import ObjectPage from '../../../../../page-objects/HSY/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/HSY/ConnectionContractPage'
import OwnerChangeContractPage from '../../../../../page-objects/HSY/OwnerChangeContractPage'

//This spec assumes that the object exists that has signed-paid new conn contract and this object is saved to a file object.txt
//It is assumed that this object already has a billed and paid new connection contract
describe('Logs in, creates a connected owner change contract to already existing object which has new connection contract (connected)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let ownerChangeContractPage = new OwnerChangeContractPage()
    beforeEach(function() {
        ownerChangeContractPage.login()
    })

    it('Creates a connected owner change contract to already existing object, issues, signs and connects', () => {
        customerPage.createJointCustomer()
        ownerChangeContractPage.createOwnerChangeContractConfirmed()   
    })
})