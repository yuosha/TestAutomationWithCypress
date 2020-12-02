///<reference types="Cypress"/>
import MeterPage from '../../../../page-objects/ELE/MeterPage'

describe('Logs in and adds a new remote meter', () => {
    let meterPage = new MeterPage()
    before(function() {
        meterPage.login()
    })

    it('Creates new remote meter', () => {
        meterPage.createNewRemoteMeter()
    })
})