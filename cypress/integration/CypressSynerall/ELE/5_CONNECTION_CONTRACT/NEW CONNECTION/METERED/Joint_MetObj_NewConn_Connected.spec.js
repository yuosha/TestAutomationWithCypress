///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../../page-objects/ELE/ConnectionContractPage'

describe('Logs in, adds joint customer, creates metered object with owner and a new connected connection contract', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create joint customer, metered object with owner and a new connected connection contract', () => {
        customerPage.createJointClient()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
    })
})