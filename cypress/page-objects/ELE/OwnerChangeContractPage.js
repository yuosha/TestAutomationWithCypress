///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
//Licence: MIT © Sasha Koss
//https://kossnocorp.mit-license.org/
import {format, add} from 'date-fns'

class OwnerChangeContractPage extends BasePage{
    openConnContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's connection contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const connUrl = Cypress.config().baseUrl + '?s=salescontracts_newaffiliation&objt=' + objectid
            cy.visit(connUrl)     
        })

        cy.get('#m_tabs_tabGeneral').should('be.visible')
    }

    changeOwner() {
        cy.readFile('clientid.txt').then(($val) => {
            const clientid2 = $val
            cy.get('#m_salesContractClient_t').clear().type(clientid2)
        }) 
        cy.get('#m_salesContractClient_b').click()
    }

    fillContractGeneralData() {
        cy.get('#m_beginDateDat_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('ownerChangeStart')})
            cy.get('#m_beginDateDat_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.get('#m_affiliationStartReasonDdl').select(Cypress.env('ownerChangeReason'))
        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        cy.get('#m_signedClientDdl').select(Cypress.env('connContractSigner'))

        this.saveform()
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

    createOwnerChangeContractSaved() {
        this.openConnContractCreationForm()
        this.changeOwner()
        this.fillContractGeneralData()
    }

    createOwnerChangeContractConnected() {
        this.createOwnerChangeContractSaved()
        this.confirmConnContract()
        this.signAndConnect()
    }

}

export default OwnerChangeContractPage