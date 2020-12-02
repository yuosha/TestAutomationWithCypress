///<reference types="Cypress"/>
import BasePage from './BasePage'

class ObjectPage extends BasePage{
    openObjectCreationForm(util) {        
        const objUrl = Cypress.config().baseUrl + '?s=objectgeneral&util='+util
        cy.visit(objUrl)
        cy.get('#m_btnChangeAddress').should('be.visible')
    }

    openForeignObjectCreationForm() {        
        const objUrl = Cypress.config().baseUrl + '?s=objectgeneral&ForeignMeteringPoint=1'
        cy.visit(objUrl)
        cy.get('#m_btnChangeAddress').should('be.visible')
    }

    chooseBuilding() {
        cy.get('#m_btnChangeAddress').click().wait(400) 

        cy.get('#m_selBuilding_txtZipCode').should('be.visible').type(Cypress.env('objZip'), {force: true}).wait(1200) 
        cy.get('#m_selBuilding_txtSettlement').focus().wait(1200)
        
        cy.get('#m_selBuilding_lbxStreet').select(Cypress.env('objStreet'), {force: true}).wait(1500)

        cy.get('#m_selBuilding_txtBuilding').focus().then( () => {
            const rn = this.getRandIntInRange(500, 9999)
            cy.get('#m_selBuilding_txtBuilding').focus().type(rn).wait(1500)
        })  

        cy.get('#m_selBuilding_type').focus().then (() => {
            cy.get('#m_selBuilding_type').select(Cypress.env('objAddrBuildingType'), {force: true}).wait(1500)
        })

        cy.get('#m_btnSelectAddress').click().wait(1000)       
        cy.get('#m_BuildingComment').should('be.visible')
    } 

    chooseForeignBuilding() {
        cy.get('#m_btnChangeAddress').click().wait(1000) 

        cy.get('#m_selBuilding_txtZipCode').should('be.visible').type('90530', {force: true}).wait(2000) 
        cy.get('#m_selBuilding_txtSettlement').focus().wait(1400)
        
        cy.get('#m_selBuilding_lbxStreet').select('Alppitie', {force: true}).wait(2000)

        cy.get('#m_selBuilding_txtBuilding').focus().then( () => {
            const rn = Math.floor(Math.random()*999)+100
            cy.get('#m_selBuilding_txtBuilding').focus().type(rn).wait(2000)
        })  

        cy.get('#m_selBuilding_type').focus().then (() => {
            cy.get('#m_selBuilding_type').select(Cypress.env('objAddrBuildingType'), {force: true}).wait(1000)
        })

        cy.get('#m_btnSelectAddress').click().wait(1000)       
        cy.get('#m_BuildingComment').should('be.visible')
    }

    saveForeignGeneralData() {
        cy.get('#m_ddfGridOperator').select('FSJ000: Caruna Oy')
        this.saveForm()
        this.saveID('objectid.txt')

        cy.get('#m_btnAddNewCodeFO').click()
        cy.get('#m_ddlNewCodeType').select('32')
        cy.get('b').then($value => {
            const objectid = $value.text()
            cy.get('#m_txtNewCode').type(objectid)
        })

        this.saveForm0()
        cy.get('#m_btnAddNewCodeFO').should('be.visible')
    }

    saveGeneralData(){
        cy.readFile('clientid.txt').then(($val) => {
            const clientid = $val
            cy.get('#m_clnOwner_t').type(clientid)
            cy.get('#m_clnOwner_b').click()
            cy.get('#m_clnOwner_l').should('be.visible')
        })
       
        cy.get('#m_ddlObjectType').select(Cypress.env('objType'), {force: true})

        this.saveForm()
        cy.get('#m_Save_ctl01').should('be.visible')
        this.saveID('objectid.txt')
    }

    saveCPData() {
        cy.get('#m_tabs_tabTechPoint').click()
        cy.get('#m_mainfuse').should('be.visible')
        cy.get('#m_ddlTechPointLocation').select(Cypress.env('cPLocation'))
        cy.get('#m_mainfuse').select(Cypress.env('cPMainFuse'))
        
        this.saveForm()
    }

    saveHeatCPData() {
        cy.get('#m_tabs_tabTechPoint').click()
        cy.get('#m_ddlTechpointType').select('2')
        
        this.saveForm()
    }

    saveUPData() {
        cy.get('#m_tabs_tabUsagePoint').click()
        cy.get('#m_MainFuse').should('be.visible')
        cy.get('#m_MainFuse').select(Cypress.env('uPMainFuse'))
        cy.get('#m_ddlAreaOfUse').select(Cypress.env('uPAreaOfUse'))
        cy.get('#m_ddlType').select(Cypress.env('uPType'))
        cy.get('#m_ddlHeatingType').select(Cypress.env('uPHeatingType'))

        this.saveForm()
    }

    saveHeatUPData() {
        cy.get('#m_tabs_tabUsagePoint').click()
        cy.get('#m_ddlType').select('112')
        cy.get('#m_HeatPower').type('50')

        this.saveForm()
    }
 
    installMeterToUP() {
        // cy.pause()
        cy.get('a[href*="objectlocker"]').click()

        //Enter previously installed meter ID from meter.txt
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
    createForeignObject() {
        this.openForeignObjectCreationForm()
        this.chooseForeignBuilding()
        this.saveForeignGeneralData()
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    createObject() {
        this.openObjectCreationForm(1)
        this.chooseBuilding()
        this.saveGeneralData() 
        this.saveCPData()
        this.saveUPData()
    }

    createObjectandInstallMeter() {
        this.openObjectCreationForm(1)
        this.chooseBuilding()
        this.saveGeneralData() 
        this.saveCPData()
        this.saveUPData()
        this.installMeterToUP()
    }

    createHeatObjectAndInstallMeter() {
        this.openObjectCreationForm(2)
        this.chooseBuilding()
        this.saveGeneralData() 
        this.saveHeatCPData()
        this.saveHeatUPData()
        this.installMeterToUP()
    }
}

export default ObjectPage
