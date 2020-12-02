///<reference types="Cypress"/>
import BasePage from './BasePage'
//https://github.com/date-fns/date-fns - Modern JavaScript date utility library
//Licence: MIT © Sasha Koss
//https://kossnocorp.mit-license.org/
import {format, add} from 'date-fns'

class UsageContractPage extends BasePage {

    openUsageContractCreationForm() {
        //read objectid from objectid.txt and navigate to an object's NW contract creation form
        cy.readFile('objectid.txt').then(($val) => {
            const objectid = $val    
            const nwcUrl = Cypress.config().baseUrl + '?s=salescontracts_new&objt=' + objectid
            cy.visit(nwcUrl)       
        })
        //cy.get('a[href*="salescontracts_search_upnt&objt"]').click({force: true})
        //cy.get('#m_NewContractButton').click()
        cy.get('#m_tabs_tabGeneral').should('be.visible')
    }

    gotoUsageContractBase() {
        cy.get('a[href*="salescontracts_details"]').click()
    }

    fillOutGeneralData() { 
        cy.get('#m_beginDateDat_d').then(() => {
            const startDate = add(new Date(), {days: Cypress.env('usageContractStart')}) 
            cy.get('#m_beginDateDat_d').type(format(startDate, 'dd.MM.yyyy'))
        })
        cy.get('#m_endDateDat_d').focus()
        cy.get('#m_billingFrequencyDdl').select(Cypress.env('usageContractBillingFrequency'))
        cy.get('#m_estimationModel').select(Cypress.env('usageContractEstimationModel')).wait(250)
        cy.get('#m_signedClientDdl').select(Cypress.env("usageContractSigner"))
        cy.get('#m_contractAffirmationLocationDdl').select('3') //3 - epost
        cy.get('#m_save_b').click()

        this.saveform()
    }

    selectPricelistAndProduct() { 
        cy.get('#m_tabs_tabReadingSolutionProducts').click()
        cy.get('#m_AddReadingSolutionBtn').click().wait(500)
    }

    saveMeteringSolution() { 
        this.selectPricelistAndProduct()
        cy.get('#m_tabs_tabReadingSolution').should('be.visible')
        cy.get('#m_Products_ProductParts_0_ComponentDisplays_1_Display_0').check()
        cy.get('#m_Products_ProductParts_1_ComponentDisplays_1_Display_0').check()
        cy.get('#m_Estimations_Estimation_0').type('8080')
        cy.get('#m_Coefficients_Coefficient_0').type('1')
        //cy.get('#m_Readings_Reading_0').type('0') // can add readings if contract starts today or earlier

        cy.get('#m_Save_b').click().wait(500)
        //this.saveForm()
    }

    addSubscriptionContacts() {  
        cy.get('#m_tabs_tabContacts').click()
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_1_c_2').check()
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_0_c_4').check()
        cy.get('#m_SalesContractContactsAndRoles_rolesrpt_c_0_s_1_c_5').check()

    }

    confirmUsageContract() {
        cy.get('#m_tabs_tabGeneral').click()
        cy.get('#m_save_previewBtn').click()
    }

    createUsageContractBase() {
        this.openUsageContractCreationForm()
        this.fillOutGeneralData()
    }

    createUsageContractSaved() {
        this.selectPricelistAndProduct()
        this.saveMeteringSolution()
        this.addSubscriptionContacts()
    }

    createUsageContractConfirmed() {
        this.createUsageContractSaved()
        this.confirmUsageContract()
    }
}

export default UsageContractPage