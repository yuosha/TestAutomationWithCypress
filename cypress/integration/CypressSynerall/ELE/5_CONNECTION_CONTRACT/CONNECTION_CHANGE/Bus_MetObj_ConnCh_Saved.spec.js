///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/ELE/ConnectionContractPage'
import ConnectionChangeContractPage from '../../../../../page-objects/ELE/ConnectionChangeContractPage'

describe('Logs in, adds bus. customer, creates metered object with owner and a new saved connection contract', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let connChangeContractPage = new ConnectionChangeContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create bus. customer, metered object and new saved connection contract', () => {
        customerPage.createBusinessCustomer()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
        connChangeContractPage.createConnChangeContractSaved()
    })
})