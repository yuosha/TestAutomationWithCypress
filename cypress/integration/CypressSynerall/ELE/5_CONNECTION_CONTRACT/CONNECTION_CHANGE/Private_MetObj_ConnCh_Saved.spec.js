///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/ELE/ConnectionContractPage'
import ConnectionChangeContractPage from '../../../../../page-objects/ELE/ConnectionChangeContractPage'
describe('Logs in, adds private customer, metered object with owner, new connected connection contract and connection change contract (saved)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let connChangeContractPage = new ConnectionChangeContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create private customer, metered object, new connected connection contract and connection change contract (saved)', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
        connChangeContractPage.createConnChangeContractSaved()
    })
})