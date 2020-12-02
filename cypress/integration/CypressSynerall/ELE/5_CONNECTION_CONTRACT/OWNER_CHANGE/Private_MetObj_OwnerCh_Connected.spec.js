///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/ELE/ConnectionContractPage'
import OwnerChangeContractPage from '../../../../../page-objects/ELE/OwnerChangeContractPage'

describe('Logs in, adds private customer, creates metered object with owner, a new connected connection contract, new owner, and conn. change contract (connected)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let ownerChangeContractPage = new OwnerChangeContractPage()

    before(function() {
        customerPage.login()
    })

    it('Creates private customer, metered object and new connected connection contract, new private owner, and Connection change contract (connected)', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
        customerPage.createPrivateCustomer()
        ownerChangeContractPage.createOwnerChangeContractConnected()
    })
})