///<reference types="Cypress"/>
import MeterPage from '../../../../page-objects/ELE/MeterPage'

describe('Logs in and adds a new local meter', () => {
    let meterPage = new MeterPage()
    before(function() {
        meterPage.login()
    })

    it('Creates new local meter', () => {
        meterPage.createNewLocalMeter()
    })
})