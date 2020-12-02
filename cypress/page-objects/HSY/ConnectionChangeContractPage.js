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
            const connUrl = Cypress.config().baseUrl + '?s=affiliationcontract&objt=' + objectid
            cy.visit(connUrl)     
  
        })
        cy.get('#m_tabs_tabDetails').should('be.visible')
    }

    fillContractGeneralData() {
        cy.get('#m_type').select('11') //conn change
        cy.wait(1500)
        cy.get('#m_Deadline_d').should('be.visible')
        cy.wait(1500)

        cy.get('#m_Deadline_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('connChangeStart')})
            cy.get('#m_Deadline_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.wait(1500)

        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        cy.wait(1500)
        cy.get('#m_signClientDdl').select(Cypress.env('connContractSigner'))
        cy.wait(1500)
    }   

    changePropertyArea() {
        cy.get('#m_GrossFloorArea').clear().type('255')
        cy.get('#m_PropertySurface').clear().type('255')
        cy.get('#m_save_b').click()
    }

    changeObjType() {
        cy.get('#m_ddlType').select('288')
        cy.get('#m_save_b').click()
    }

    addStormWater() {
        cy.get('#m_ConnectionTypes_2').check()
        cy.get('#m_save_b').click()
    }

    fillSubscriptionInvoice() {
        cy.get('#m_tabs_tabInvoice').click().wait(1000)
        cy.get('#m_save_generateFees').click().wait(1000)
    }

    addSubscriptionContacts() {
        cy.get('#m_tabs_tabContacts').click()
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_2').click().wait(100) // ContractDelivery
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_1_c_3').click().wait(100) // Reminders
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_6').click().wait(100) // Signature 1st reminder
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_7').click().wait(100) // Signature 2nd reminder
        cy.get('#m_SalesContractContactsAndRoles_save_b').click().wait(100)
    }

    confirmConnContract() {
        cy.get('#m_tabs_tabDetails').click()
        cy.get('#m_save_outputBtn').click()
    }

    openConnContrView() {

        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const connUrl = Cypress.config().baseUrl + '?s=objectgeneral&objt=' + objectid
            cy.visit(connUrl)     
        })

        cy.get('a[href*="objectaffiliationcontracts"]').click()
        cy.get('.table > tbody:nth-child(2) > tr:nth-child(1) > td:nth-child(1)').click()
    }

    signConnContract() {

        cy.get('#m_ClientSignedDate_d').then(() => {
            const clientSignedDate = add(new Date(), {days: Cypress.env('newConnClientSigned')})    
            cy.get('#m_ClientSignedDate_d').type(format(clientSignedDate, 'dd.MM.yyyy'), {force: true})
            cy.wait(1000)
        })

        cy.get('#m_SignedDate_d').then(() => {
            const connectedDate = add(new Date(), {days: Cypress.env('newConnConnectedDate')})        
            cy.get('#m_SignedDate_d').type(format(connectedDate, 'dd.MM.yyyy'), {force: true})  
            cy.wait(1000)         
        })

        this.saveform1() 
    }

    createConnChangeContractAreaChSaved() {
        this.openConnContractCreationForm()
        this.fillContractGeneralData()
        this.changePropertyArea()
        this.fillSubscriptionInvoice()
        this.addSubscriptionContacts()
    }

    createConnChangeContractObjTypeChSaved() {
        this.openConnContractCreationForm()
        this.fillContractGeneralData()
        this.changeObjType()
        this.fillSubscriptionInvoice()
        this.addSubscriptionContacts()
    }

    createConnChangeContractAddStormSaved() {
        this.openConnContractCreationForm()
        this.fillContractGeneralData()
        this.addStormWater()
        this.fillSubscriptionInvoice()
        this.addSubscriptionContacts()
    }

    createConnChangeContractAreaChConfirmed() {
        this.createConnChangeContractAreaChSaved()
        this.confirmConnContract()
    }

    createConnChangeContractObjTypeChConfirmed() {
        this.createConnChangeContractObjTypeChSaved()
        this.confirmConnContract()
    }

    createConnChangeContractAddStormConfirmed() {
        this.createConnChangeContractAddStormSaved()
        this.confirmConnContract()
    }
}

export default ConnectionChangeContractPage