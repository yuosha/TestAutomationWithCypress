///<reference types="Cypress"/>
import CustomerPage from '../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../page-objects/ELE/ObjectPage'
import ConnectionContractPage from '../../../../../page-objects/ELE/ConnectionContractPage'
import OwnerChangeContractPage from '../../../../../page-objects/ELE/OwnerChangeContractPage'

describe('Logs in, adds joint customer, metered object with joint owner, new connected connection contract, new joint owner, and conn change contract (connected)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let connContractPage = new ConnectionContractPage()
    let ownerChangeContractPage = new OwnerChangeContractPage()

    before(function() {
        customerPage.login()
    })

    it('Creates joint customer, metered object and new connected connection contract, new joint owner, and Connection change contract (connected)', () => {
        customerPage.createJointClient()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        connContractPage.createConnContractConnected()
        customerPage.createJointClient()
        ownerChangeContractPage.createOwnerChangeContractConnected()
    })
})