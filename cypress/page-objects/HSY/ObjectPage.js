///<reference types="Cypress"/>
import BasePage from './BasePage'

class ObjectPage extends BasePage{

    openExistingObjectAndClone() {
        const oid = Cypress.env('objWaterClonable')
        const objUrl = Cypress.config().baseUrl + '?s=objectgeneral&objt=' + oid
        cy.visit(objUrl)
        cy.get('b').should('have.text', oid)

        const cloneUrl = Cypress.config().baseUrl + '?s=objectgeneral&template=' + oid
        cy.visit(cloneUrl)
        cy.get('#m_clnOwner_t').should('be.visible')
        cy.get('b').should('not.have.text', oid)
    }

    openObjectCreationForm() {      
        const objUrl = Cypress.config().baseUrl + '?s=objectgeneral&util=4'
        cy.visit(objUrl)
        cy.get('#m_btnChangeAddress').should('be.visible')
    }

    saveGeneralData(){
        cy.readFile('clientid.txt').then(($val) => {
            const clientid = $val
            cy.get('#m_clnOwner_t').type(clientid)
        })
        cy.get('#m_clnOwner_b').click()

        //add UP address
        cy.get('#m_btnChangeAddress').click().wait(500)
        cy.get('#m_selBuilding_txtZipCode').should('be.visible').type(Cypress.env('objZip'), {force: true})
        cy.get('#m_selBuilding_txtSettlement').focus().wait(2000)
        
        cy.get('#m_selBuilding_lbxStreet').select(Cypress.env('objStreet'), {force: true}).wait(2000)

        cy.get('#m_selBuilding_txtBuilding').focus().then( () => {
            const rn = this.getRandIntInRange(500, 9999)
            cy.get('#m_selBuilding_txtBuilding').focus().type(rn)
            cy.wait(2500)
        })  

        cy.get('#m_selBuilding_type').focus().then (() => {
            cy.get('#m_selBuilding_type').select(Cypress.env('objAddrBuildingType'), {force: true}).wait(1500)
        })

        cy.get('#m_btnSelectAddress').click().wait(1000)       
        cy.get('#m_clnOwner_l').should('be.visible')
        
        cy.get('#m_ddlObjectType').select(Cypress.env('objType'), {force: true})

        this.saveForm()

        this.saveID('objectid.txt')
    }

    saveCPData() {
        cy.get('#m_tabs_tabTechPoint').click()
        cy.get('#m_ConnectionTypes_0').should('be.visible')
        cy.get('#m_ConnectionTypes_0').check()  //check water
        cy.get('#m_ConnectionTypes_1').check()  //check wastewater
        
        this.saveForm()
    }

    saveUPData() {
        cy.get('#m_tabs_tabUsagePoint').click()
        cy.get('#m_ddlAreaOfUse').select(Cypress.env('uPAreaOfUse'))
        cy.get('#m_ddlType').select(Cypress.env('uPType'))
        cy.get('#m_GrossFloorArea').type('50')
        cy.get('#m_PropertySurface').type('50')

        this.saveForm()
    }

    changeUpOwnerAndSave() {
        cy.readFile('clientid.txt').then(($val) => {
            const clientid = $val
            cy.get('#m_clnOwner_t').clear().type(clientid)
        })

        this.saveForm0()
        this.saveID('objectid.txt')
    }

    installMeterToUP() {
        
        cy.get('a[href*="objectlocker"]').click()

        cy.readFile('meterid.txt').then(($val) => {
            const meterid = $val
            cy.get('#m_Reader_t').type(meterid)
            cy.get('#m_Reader_b').click()
            cy.get('#m_ReaderLink').should('be.visible')
        }) 
        cy.get('#m_PlacementLocation').select(Cypress.env('meterPlacementLocation'))
        cy.get('#m_ReaderPlacementClient').select(Cypress.env('meterInstalledBy'))
        cy.get('#m_ReaderPlacementDate_d').type(Cypress.env('meterInstallDate'))

        this.saveForm0()

        cy.get('#m_UsagePointLink').click()
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    createObject() {
        this.openObjectCreationForm()
        this.saveGeneralData() //address, owner, object type
        this.saveCPData()
        this.saveUPData()
    }

    createObjectandInstallMeter() {
        this.openObjectCreationForm()
        this.saveGeneralData() //address, owner, object type
        this.saveCPData()
        this.saveUPData()
        this.installMeterToUP()
    }

    cloneObjAndChangeOwner() {
        this.openExistingObjectAndClone()
        this.changeUpOwnerAndSave()
    }
}

export default ObjectPage
