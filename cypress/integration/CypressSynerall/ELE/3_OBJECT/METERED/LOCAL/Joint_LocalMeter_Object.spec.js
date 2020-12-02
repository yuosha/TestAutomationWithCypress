///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
describe('Logs in, adds joint customer, creates local metered object and saves customer as object owner', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    before(function() {
        customerPage.login()
    })

    it('Creates joint customer, local metered object and save the customer as an object owner', () => {
        customerPage.createJointClient()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
    })
})