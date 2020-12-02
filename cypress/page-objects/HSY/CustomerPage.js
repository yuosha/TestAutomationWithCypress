///<reference types="Cypress"/>
import BasePage from './BasePage'
//Both finnish-business-ids and finnish-ssn from source: https://github.com/vkomulai/
//The MIT License (MIT) | Copyright (c) [2015] [Ville Komulainen]
import {FinnishSSN} from 'finnish-ssn'
//The MIT License (MIT) | Copyright (c) 2016 vkomulai <ville.komulainen@iki.fi>
import {FinnishBusinessIds} from 'finnish-business-ids'
const FinnishBankUtils = require('finnish-bank-utils')

class CustomerPage extends BasePage {

    openCustomerCreationForm() {
        const custUrl = Cypress.config().baseUrl + '?s=clientgeneral'
        cy.visit(custUrl)
        cy.wait(200)
        cy.get('#m_ddlLegalStatus').should('be.visible')
    }

    selectLanguage(language) {
        cy.get('#m_ddlPreferedLanguage').select(language)
    }

    saveNameAndPersonalId(filename) {
        cy.get('#m_txtFirstname').type('Private' + this.getRandIntInRange(1000, 100000)) 
        cy.get('#m_txtLastname').type('Client' + this.getRandIntInRange(1000, 100000)) 
        cy.wait(250)
        cy.get('#m_txtPersonalCode').type(FinnishSSN.createWithAge(25)) 
        cy.wait(250)
        
        this.saveForm()        
        this.saveID(filename)
    }

    saveBusNameAndRegCode(filename) {
        cy.get('#m_ddlLegalStatus').select('3', {force: true}) //3 -business
        cy.wait(550)
        cy.get('#m_txtBusinessCode').focus().type(FinnishBusinessIds.generateBusinessId(), {force: true}) 
        cy.get('#m_txtBusinessName').focus().type('BusinessInc_' + this.getRandIntInRange(1000, 100000)) 
        
        this.saveForm()
        this.saveID(filename)       
    }

    saveJointClient(filename) {
        cy.get('#m_IsCollective').check()
        cy.get('#m_txtPersonalCode').should('not.be.visible')
        cy.get('#m_txtBusinessName').then(($elem) => {
            const rand = this.getRandIntInRange(1000, 100000)
            const name = 'J'+ rand + ' and ' + ' J' + (rand+1) + ' Client'
            cy.get('#m_txtBusinessName').type(name)  
        })
        cy.readFile('jointid1.txt').then(($val) => {
            const jointid1 = $val
            cy.get('#m_collectiveClientSelector_t').type(jointid1)
            cy.get('#m_collectiveClientSelector_b').click()
            cy.get('#m_sclink').should('be.visible')
            cy.get('#m_AddClientToCollectiveBtn').click()
        })
        cy.readFile('jointid2.txt').then(($val) => {
            const jointid2 = $val
            cy.get('#m_collectiveClientSelector_t').type(jointid2)
            cy.get('#m_collectiveClientSelector_b').click()
            cy.get('#m_sclink').should('be.visible')
            cy.get('#m_AddClientToCollectiveBtn').click()
        })
        
        this.saveForm()
        this.saveID(filename)
    }

    addEmail() {
        cy.wait(500)
        cy.get('#m_btnAddContact').click()
        cy.get('#m_NewContact_CheckButton').should('be.visible')
        cy.get('#m_NewContact_type_0').check()
        cy.get('#m_NewContact_value').type('cypressmail'+ this.getRandIntInRange(1000, 100000)+'@gmail.com') 

        this.saveForm0()
        cy.get('#m_ddlLegalStatus').should('be.visible')
    }

    addMobile() {
        cy.wait(20)
        cy.get('#m_btnAddContact').click()
        cy.get('#m_NewContact_CheckButton').should('be.visible')
        cy.get('#m_NewContact_type_3').check()
        cy.get('#m_NewContact_value').clear().type('+358 4'+ this.getRandIntInRange(1000000, 9999999))

        this.saveForm0()
        cy.get('#m_ddlLegalStatus').should('be.visible')
    }

    addIBAN() {
        cy.get('#m_btnAddClientBankAccount').click()
        cy.get('#m_ddlBanks').should('be.visible')
        cy.get('#m_txtIban').type(FinnishBankUtils.generateFinnishIBAN(), {force: true})
        cy.get('#m_Save_b').click()
    }

    addAddress() {
        cy.get('#m_btnAddClientAddress').click().wait(500)   
        this.fillAddressForm()
        
        this.saveForm0()
        cy.get('#m_ddlLegalStatus').should('be.visible')
    }

    addAddressJoint() {
        cy.get('#m_btnAddClientAddress').click().wait(500)   
        cy.get('#m_btnNewAddress').click()
        this.fillAddressForm()
        
        this.saveForm0()
        cy.get('#m_ddlLegalStatus').should('be.visible')
    }

    fillAddressForm() {
        cy.wait(500)
        cy.get('#m_bldg_txtZipCode').should('be.visible').type(Cypress.env('clntZip'), {force: true})
        cy.get('#m_bldg_txtSettlement').focus()
        cy.wait(1500)

        cy.get('#m_bldg_txtStreet').focus().type(Cypress.env('clntStreet'), {force: true})
        cy.wait(1500)

        cy.get('#m_bldg_txtBuilding').focus().then( () => {
            const rn = this.getRandIntInRange(500, 9999)
            cy.wait(1200)
            cy.get('#m_bldg_txtBuilding').type(rn, {force: true})
            cy.wait(1200)
        })

        cy.get('#m_bldg_type').focus().then(() => {
            cy.get('#m_bldg_type').select(Cypress.env('clntAddrBuildingType'), {force: true})
            cy.wait(1200)
        })
    }

    createPrivateCustomer() {
        this.openCustomerCreationForm()
        this.saveNameAndPersonalId('clientid.txt')
        this.addContacts()
    }

    createPrivateCustomerSWE() {
        this.openCustomerCreationForm()
        this.selectLanguage('5')
        this.saveNameAndPersonalId('clientid.txt')
        this.addContacts()
    }

    createBusinessCustomer() {
        this.openCustomerCreationForm()
        this.saveBusNameAndRegCode('clientid.txt')
        this.addContacts()
    } 

    createBusinessCustomerSWE() {
        this.openCustomerCreationForm()
        this.selectLanguage('5')
        this.saveBusNameAndRegCode('clientid.txt')
        this.addContacts()
    }

    createJointClient() {
        //Create 1st joint
        this.openCustomerCreationForm()
        this.saveNameAndPersonalId('jointid1.txt')
        this.addContacts()
        //Create 2nd joint
        this.openCustomerCreationForm()
        this.saveNameAndPersonalId('jointid2.txt')
        this.addContacts()
        //Create joint client
        this.openCustomerCreationForm()
        this.saveJointClient('clientid.txt')
        this.addContactsJoint()
    }

    addContacts() {
        this.addEmail()
        this.addAddress()
        this.addMobile()
        this.addIBAN()
    }
    addContactsJoint() {
        this.addEmail()
        this.addAddressJoint()
        this.addMobile()
    }
}

export default CustomerPage
