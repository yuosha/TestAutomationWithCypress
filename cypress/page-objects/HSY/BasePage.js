class BasePage {
    //login
    login() {
        cy.ntlmReset()
        cy.ntlm(
            "http://tlldev5.netgroupdigital.com",
            Cypress.env('username'),
            Cypress.env('pw')
        )
        cy.visit('http://tlldev5.netgroupdigital.com/HSY/default.aspx')
    }

    saveID(filename) {
        cy.get('b').then($value => {
            const oid = $value.text()
            cy.log(oid)
            cy.writeFile(filename, oid)
        })
    }

    //RandomInt function origin: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    getRandIntInRange(min, max) {
        // min = Math.ceil(min);
        // max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //MAX is exclusive and MIN is inclusive
    }

    saveForm(){
        cy.get('#m_Save_b').click()
        cy.get('#m_Save_ctl01').should('be.visible')
    }
    saveForm0(){
        cy.get('#m_Save_b').click()
    }
    saveform() {
        cy.get('#m_save_b').click()
        cy.get('#m_save_ctl07').should('be.visible')
    }
    saveform1() {
        cy.get('#m_save_b').click()
        cy.get('#m_save_ctl01').should('be.visible')
    }
}

export default BasePage