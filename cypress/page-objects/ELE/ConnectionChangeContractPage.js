///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
//Licence: MIT © Sasha Koss
//https://kossnocorp.mit-license.org/
import {format, add} from 'date-fns'

class ConnectionChangeContractPage extends BasePage{
    openConnContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's connection contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const connUrl = Cypress.config().baseUrl + '?s=salescontracts_newaffiliation&objt=' + objectid
            cy.visit(connUrl)     
        })

        cy.get('#m_tabs_tabGeneral').should('be.visible')
    }

    fillContractGeneralData() {
        cy.get('#m_beginDateDat_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('connChangeStart')})
            cy.get('#m_beginDateDat_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.get('#m_affiliationStartReasonDdl').select(Cypress.env('connChangeReason'))
        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        cy.get('#m_signedClientDdl').select(Cypress.env('connContractSigner'))

        this.saveform()
    }

    fillConnectionPointData(){
        cy.get('#m_tabs_tabAffiliationObjects').click()
        cy.get('.ellipsis').click().wait(550) // kliki rida
        cy.get('#m_mainFuseDdl').select('3 x 35 A', {force: true}).wait(1000)
        cy.get('#m_save_b').click()
    }

    fillSubscriptionInvoice() {
        cy.wait(500)
        cy.get('#m_tabs_tabInvoice').click().wait(200)
        cy.get('#m_Service').select(Cypress.env('connChangeService')).wait(200)
        cy.get('#m_Refundable').check().wait(200)

        this.saveform1()
        cy.get('#m_tabs_tabDetails').click()
    }

    confirmConnContract() {
        cy.get('#m_save_confirmBtn').click()
        cy.get('#m_Choices_1').click()

        cy.get('#m_save_b').click()
    }

    signAndConnect() {

        cy.get('#m_clientReturnedDateDat_d').then(() => {
            const clientSignedDate = add(new Date(), {days: Cypress.env('newConnClientSigned')})    
            cy.get('#m_clientReturnedDateDat_d').type(format(clientSignedDate, 'dd.MM.yyyy'))
        })

        cy.get('#m_AffiliationEnergizationDate_d').then(() => {
            const connectedDate = add(new Date(), {days: Cypress.env('newConnConnectedDate')})        
            cy.get('#m_AffiliationEnergizationDate_d').type(format(connectedDate, 'dd.MM.yyyy'))           
        })
        cy.wait(1000)
        this.saveform()
    }

    createConnChangeContractSaved() {
        this.openConnContractCreationForm()
        this.fillContractGeneralData()
        this.fillConnectionPointData()
        this.fillSubscriptionInvoice()
    }

    createConnChangeContractConnected() {
        this.createConnChangeContractSaved()
        this.confirmConnContract()
        this.signAndConnect()
    }

}

export default ConnectionChangeContractPage