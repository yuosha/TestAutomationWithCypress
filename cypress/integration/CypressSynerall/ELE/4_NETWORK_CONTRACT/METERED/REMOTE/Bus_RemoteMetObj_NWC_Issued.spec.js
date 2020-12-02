///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
import NetworkContractPage from '../../../../../../page-objects/ELE/NetworkContractPage'

describe('Logs in, creates bus. customer, remote metered object with owner, and a network contract (issued)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let nwContractPage = new NetworkContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create bus. customer with owner, remote metered object and a network contract (issued)', () => {
        customerPage.createBusinessCustomer()
        meterPage.createNewRemoteMeter()
        objectPage.createObjectandInstallMeter()
        nwContractPage.createRemoteNWContractIssued()
    })
})