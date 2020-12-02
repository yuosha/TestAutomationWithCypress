///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds business customer, creates local metered object and saves the customer as object owner', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates bus. customer, local metered object and save the customer as an object owner', () => {
        customerPage.createBusinessCustomerSWE()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
    })
})