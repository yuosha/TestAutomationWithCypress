///<reference types="Cypress"/>
import CustomerPage from '../../../../../../page-objects/ELE/CustomerPage'
import MeterPage from '../../../../../../page-objects/ELE/MeterPage'
import ObjectPage from '../../../../../../page-objects/ELE/ObjectPage'
import NetworkContractPage from '../../../../../../page-objects/ELE/NetworkContractPage'

describe('Logs in, creates joint customer, local metered object with owner and a network contract (saved)', () => {
    let customerPage = new CustomerPage()
    let meterPage = new MeterPage()
    let objectPage = new ObjectPage()
    let nwContractPage = new NetworkContractPage()

    before(function() {
        customerPage.login()
    })

    it('should create joint customer, local metered object and a network contract(saved)', () => {
        customerPage.createJointClient()
        meterPage.createNewLocalMeter()
        objectPage.createObjectandInstallMeter()
        nwContractPage.createLocalNWContractSaved()
    })
})