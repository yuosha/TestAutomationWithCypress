class BasePage {

    login() {
        cy.visit('/')
        cy.get('#username').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#loginbtn').should('be.visible')
        cy.fixture('user').then(user => {
            const username = user.username
            const password = user.password

            cy.get('#username').clear().type(username) //from user.json
            cy.get('#password').clear().type(password) //from user.json
            cy.get('#loginbtn').click()
            cy.contains('Admin Cypress')
        })
    }

    logout() {
        cy.get('.fa-user').scrollIntoView().click()
        cy.contains('Uloskirjautuminen').click()
        cy.get('#username').should('be.visible')
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
        return Math.floor(Math.random() * (max - min)) + min; //MAX - exclusive, MIN - inclusive
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