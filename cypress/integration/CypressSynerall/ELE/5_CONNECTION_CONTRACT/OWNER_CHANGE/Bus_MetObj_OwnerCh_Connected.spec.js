///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/ELE/ConnectionContractPage'
import OwnerChangeContractPage from '../../../../../page-objects/ELE/OwnerChangeContractPage'

describe('Logs in, adds business customer, creates unmetered object with owner and a new connected connection contract', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let ownerChangeContractPage = new OwnerChangeContractPage()

    before(function() {
        customerPage.login()
    })

    it('Creates business customer, metered object and new connected connection contract', () => {
        customerPage.createBusinessCustomer()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
        customerPage.createBusinessCustomer()
        ownerChangeContractPage.createOwnerChangeContractConnected()
    })
})