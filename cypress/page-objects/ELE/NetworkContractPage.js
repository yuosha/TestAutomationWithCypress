///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
import {format, add} from 'date-fns'

class NetworkContractPage extends BasePage{
//start creating network contract from object's page (object has owner and meter)

    openNWContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's NW contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const nwcUrl = Cypress.config().baseUrl + '?s=objectgeneral&objt=' + objectid
            cy.visit(nwcUrl)       
        })

        cy.get('a[href*="salescontracts_search_upnt&objt"]').click({force: true})
        cy.get('#m_NewContractButton').click()
        cy.get('#m_tabs_tabGeneral').should('be.visible')
    }

    fillOutGeneralData() {
        cy.get('#m_beginDateDat_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('nWCStart')}) 
            cy.get('#m_beginDateDat_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.get('#m_endDateDat_d').focus()
        cy.get('#m_billingFrequencyDdl').select(Cypress.env('nWCBillingFrequency'))
        cy.get('#m_estimationModel').select(Cypress.env('nWCEstimationModel')).wait(250)
        cy.get('#m_signedClientDdl').select(Cypress.env("nWCSigner"))
        cy.get('#m_contractAffirmationLocationDdl').select('3') //3 - epost
        cy.get('#m_save_b').click()

        this.saveform()
    }

    selectPricelistAndProduct() {
        cy.get('#m_tabs_tabReadingSolutionProducts').click()
        cy.get('#m_priceListSelectionDdl').select(Cypress.env('nWCPriceList')) 
        cy.get(Cypress.env('nWProductCheckbox')).check() //this function works with yleissähkö
        cy.get('#m_AddReadingSolutionBtn').click().wait(500)
    }

    saveLocalMeteringSolution() { 
        this.selectPricelistAndProduct()
        cy.get('#m_ConsumerProfile').should('be.visible')
        cy.get('#m_tabs_tabReadingSolution').should('be.visible')
        cy.get(Cypress.env('nWCComponentCheckbox')).check()
        cy.get('#m_Estimations_Estimation_0').type('8080')
        cy.get('#m_Coefficients_Coefficient_0').type('1').type('0')
        cy.get('#m_Readings_Reading_0')
        cy.get('#m_ConsumerProfile').select('1')

        this.saveForm()
    }

    saveRemoteMeteringSolution() {
        this.selectPricelistAndProduct()
        cy.get(Cypress.env('nWCComponentCheckbox')).check()
        cy.get('#m_Estimations_Estimation_0').type('8080')
        this.saveForm()
    }

    confirmNWContract() {
        cy.get('#m_tabs_tabGeneral').click()
        cy.get('#m_save_confirmBtn').click()
        cy.get('#m_tabs_confirmSend').should('be.visible') 
        cy.get('#m_Choices_1').check()

        cy.get('#m_save_b').click()
    }

    createNWContractBase() {
        this.openNWContractCreationForm()
        this.fillOutGeneralData()
    }

    createLocalNWContractSaved() {
        this.createNWContractBase()
        this.saveLocalMeteringSolution()
    }
    createRemoteNWContractSaved() {
        this.createNWContractBase()
        this.saveRemoteMeteringSolution()
    }

    createLocalNWContractIssued() {
        this.createLocalNWContractSaved()
        this.confirmNWContract()
    }
    createRemoteNWContractIssued() {
        this.createRemoteNWContractSaved()
        this.confirmNWContract()
    }
    
}

export default NetworkContractPage