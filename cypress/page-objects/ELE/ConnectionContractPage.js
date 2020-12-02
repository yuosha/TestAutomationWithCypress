///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
import {format, add} from 'date-fns'

class ConnectionContractPage extends BasePage{
    openConnContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's connection contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const connUrl = Cypress.config().baseUrl + '?s=salescontracts_newaffiliation&objt=' + objectid
            cy.visit(connUrl)     
        })

        cy.get('#m_tabs_tabGeneral').should('be.visible')
    }

    fillConnContractGeneralData() {
        cy.get('#m_beginDateDat_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('newConnStart')})
            cy.get('#m_beginDateDat_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.get('#m_affiliationStartReasonDdl').select(Cypress.env('connContractStartReason'))
        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        cy.get('#m_signedClientDdl').select(Cypress.env('connContractSigner'))

        this.saveform()
    }

    fillSubscriptionInvoice() {
        cy.wait(200)
        cy.get('#m_tabs_tabAffiliationInvoice').click()
        cy.wait(200)
        cy.get('#m_Service').select(Cypress.env('connectionService'))
        cy.wait(200)
        cy.get('#m_Refundable').check()
        cy.wait(200)

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

        this.saveform()
    }

    createConnContractSaved() {
        this.openConnContractCreationForm()
        this.fillConnContractGeneralData()
        this.fillSubscriptionInvoice()
    }

    createConnContractConnected() {
        this.createConnContractSaved()
        this.confirmConnContract()
        this.signAndConnect()
    }

}

export default ConnectionContractPage