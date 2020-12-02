///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds private SWE customer, creates a remote metered object with owner', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates private SWE customer, a new remote meter and a metered object with owner', () => {
        customerPage.createPrivateCustomerSWE()
        meterPage.createNewRemoteMeter()
        objectPage.createObjectandInstallMeter()
    })
})