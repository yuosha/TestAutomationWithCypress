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
            const connUrl = Cypress.config().baseUrl + '?s=affiliationcontract&objt=' + objectid
            cy.visit(connUrl)     
            // cy.wait(1000)
        })
        cy.get('#m_tabs_tabDetails').should('be.visible')
        // cy.wait(1000)
    }

    fillContractGeneralData() {
        cy.get('#m_type').select('10')
        cy.wait(1500)
        cy.get('#m_ownershipChangeDate_d').should('be.visible')
        // cy.wait(1500)

        cy.get('#m_ownershipChangeDate_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('ownerChangeStart')})
            cy.get('#m_ownershipChangeDate_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        // cy.wait(1500)

        cy.get('#m_contractAffirmationLocationDdl').select('3') // 3 - email
        // cy.wait(1500)
        cy.get('#m_signClientDdl').select(Cypress.env('connContractSigner'))
        // cy.wait(1500)
    }   

    changeOwnerAndSave() {
        cy.readFile('clientid.txt').then(($val) => {
            const clientid2 = $val
            cy.get('#m_clientCln_t').clear().wait(1000).type(clientid2)
        }) 
        cy.get('#m_clientCln_t').click().wait(100)

        cy.get('#m_save_b').click()
        cy.get('#m_save_b').click()
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
        // cy.get('#m_tabs_tabDetails').click()
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

    createOwnerChangeContractSaved() {
        this.openConnContractCreationForm()
        this.fillContractGeneralData()
        this.changeOwnerAndSave()
        this.addSubscriptionContacts()
    }

    createOwnerChangeContractConfirmed() {
        this.createOwnerChangeContractSaved()
        this.confirmConnContract()
    }

    sign() {
        this.openConnContrView()
        this.signConnContract()
    }

}

export default OwnerChangeContractPage