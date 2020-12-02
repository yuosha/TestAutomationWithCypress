///<reference types="Cypress"/>
import BasePage from './BasePage'
class MeterPage extends BasePage{
    openMeterCreationForm() {
        const meterUrl = Cypress.config().baseUrl + '?s=readergeneral'
        cy.visit(meterUrl)
    }
    
    createMeter(model){ // can add different meter model versions (using 2 meterModel env variables)
        
        cy.get('#m_NewSerialNumbers').type('meter' + this.getRandIntInRange(1000, 100000))
        cy.wait(50)
        // cy.get('#m_ddlModel').select(model, {force: true})
        cy.get('#m_ddlModel').select('Vesimittari', {force: true})
        cy.wait(50)

        this.saveForm()
        cy.wait(500)
        cy.get('b').then($value => {
            const meterid = $value.text()
            cy.writeFile('meterid.txt', meterid)
        })       
    }

    createNewMeter() {
        this.openMeterCreationForm()
        this.createMeter(Cypress.env('meterModel'))
    }
}

export default MeterPage