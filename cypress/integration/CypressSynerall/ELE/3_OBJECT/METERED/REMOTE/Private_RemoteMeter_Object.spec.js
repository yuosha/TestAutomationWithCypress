///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds private customer, creates remote metered object and saves the customer as object owner', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates private customer, remote metered object and save the customer as an object owner', () => {
        customerPage.createPrivateCustomer()
        meterPage.createNewRemoteMeter()
        objectPage.createObjectandInstallMeter()
    })
})