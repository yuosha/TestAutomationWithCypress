///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
import NetworkContractPage from '../../../../../../page-objects/ELE/NetworkContractPage'

describe('Logs in, adds bus. customer, local metered obj with owner, and creates a network contract (saved)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let nwContractPage = new NetworkContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create bus. customer, local metered obj with owner, and a network contract (saved) ', () => {
        customerPage.createBusinessCustomer()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        nwContractPage.createLocalNWContractSaved()
    })
})