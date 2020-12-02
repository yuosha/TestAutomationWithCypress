///<reference types="Cypress"/>
import MeterPage from '../../../../page-objects/HSY/MeterPage'

describe('Logs in and adds a new meter', () => {
    let meterPage = new MeterPage()
    before(function() {
        meterPage.login()
    })

    it('should create new meter', () => {
        meterPage.openMeterCreationForm()
        meterPage.createMeter()
    })
})