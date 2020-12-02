///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
import {format, add} from 'date-fns'
class ConnectionContractPage extends BasePage{

    openConnContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's connection contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const connUrl = Cypress.config().baseUrl + '?s=affiliationcontract&objt=' + objectid
            cy.visit(connUrl)     
        })

        cy.get('#m_tabs_tabDetails').should('be.visible')
    }
    
    fillConnContractGeneralData() { 
        cy.get('#m_type').select('1') 
        cy.wait(250)
        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        cy.get('#m_signClientDdl').select(Cypress.env('connContractSigner'))

        cy.get('#m_save_b').click().wait(1000)
    }    

    fillSubscriptionInvoice() {
        cy.get('#m_tabs_tabInvoice').click().wait(1000)
        cy.get('#m_save_generateFees').click().wait(1000)
    }

    addSubscriptionContacts() {
        cy.get('#m_tabs_tabContacts').click()
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_2').click() // ContractDelivery
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_1_c_3').click() // Reminders
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_6').click() // Signature 1st reminder
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_7').click() // Signature 2nd reminder
        cy.get('#m_SalesContractContactsAndRoles_save_b').click().wait(100)
    }

    confirmConnContract() {
        cy.get('#m_tabs_tabDetails').click().wait(1000)
        cy.get("#m_save_outputBtn").click().wait(1000)
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
            cy.get('#m_ClientSignedDate_d').type(format(clientSignedDate, 'dd.MM.yyyy'))
            cy.wait(1000)
        })

        cy.get('#m_SignedDate_d').then(() => {
            const connectedDate = add(new Date(), {days: Cypress.env('newConnConnectedDate')})        
            cy.get('#m_SignedDate_d').type(format(connectedDate, 'dd.MM.yyyy'))  
            cy.wait(1000)         
        })

        this.saveform1() 
    }

    createPayConnBill(){
        cy.get('#m_save_generateBill').click().wait(200)
        cy.get('#m_save_MarkAsSentOutBtn').click().wait(200)
        cy.contains('Start payment').click().wait(200)
        cy.get('#m_save_b').click()
    }
    
    createConnContractSaved() {
        this.openConnContractCreationForm()
        this.fillConnContractGeneralData()
        this.fillSubscriptionInvoice()
        this.addSubscriptionContacts()
    }

    createConnContractConfirmed() {
        this.createConnContractSaved()
        this.confirmConnContract()
    }
    
    signBillPay() {
        this.openConnContrView()
        this.signConnContract()
        this.createPayConnBill()
    }
}

export default ConnectionContractPage