///<reference types="Cypress"/>
import BasePage from './BasePage'
class MeterPage extends BasePage{
    openMeterCreationForm() {
        const meterUrl = Cypress.config().baseUrl + '?s=readergeneral'
        cy.visit(meterUrl)
    }
    
    createMeter(model){ // can add remote / local meter version (using 2 meterModel env variables)
        cy.get('#m_NewSerialNumbers').type('meter' + this.getRandIntInRange(1000, 100000))
        cy.wait(50)
        cy.get('#m_ddlModel').select(model, {force: true})
        cy.wait(50)

        this.saveForm()
        cy.wait(250)
        this.saveID('meterid.txt')       
    }

    createNewLocalMeter() {
        this.openMeterCreationForm()
        this.createMeter(Cypress.env('meterModelLocal'))
    }
    createNewRemoteMeter() {
        this.openMeterCreationForm()
        this.createMeter(Cypress.env('meterModelRemote'))
    }

    createNewHeatMeter() {
        this.openMeterCreationForm()
        this.createMeter('HEATMODEL - Landis&Gyr')
    }
}

export default MeterPage