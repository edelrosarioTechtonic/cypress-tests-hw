//resource: https://github.com/cypress-io/cypress/issues/877
//assertion to check if an element is still within the current view
Cypress.Commands.add('isInViewport', element => { 
    cy.get(element).then($el => {
      const bottom = Cypress.$(cy.state('window')).height()
      const rect = $el[0].getBoundingClientRect()
  
      expect(rect.top).not.to.be.greaterThan(bottom)
      expect(rect.bottom).not.to.be.greaterThan(bottom)
    })
})

//assertion checks for testing navigation links of unauthenticated user
Cypress.Commands.add('unauthenticatedNavTest', () => {
    cy.contains('Sign In').click()
    cy.wait(500);//waiting for scroll to finish
    cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/')
    cy.isInViewport("#login")
    
    cy.contains('About Us').click()
    cy.wait(500);//waiting for scroll to finish
    cy.isInViewport("#about")
    
    cy.contains('D&D CC').click()
    cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/')
    
    cy.contains('Home').click()
    cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/')
});

Cypress.Commands.add('signIn', () => {
    cy.visit('https://tt-dd-cc.herokuapp.com/')
    cy.contains('Sign in with Google').click()
    cy.wait(500);//wait
    cy.get('body').then((body) => {
        console.log(body.find("#1-email"))
        if (body.find("#1-email").length > 0) {
            cy.get("#1-email").type("tester@test.com")
            cy.get("input[type='password']").type("Test1234")
            cy.get("button[name='submit']").click()
        }
    });
})

Cypress.Commands.add('createCharacter', (name="test") => {
    cy.url().should("equal", "https://tt-dd-cc.herokuapp.com/create-character")
    cy.contains('Start Character Creation').click()

    cy.contains("Dragonborn").click()
    cy.wait(50)
    cy.contains('Next').click() 

    cy.contains("Barbarian").click()
    cy.wait(50)
    cy.contains('Next').click()  

    cy.contains('Use Standard Array').click()
    cy.get('#strength').select('15')
    cy.get('#dexterity').select('14')
    cy.get('#constitution').select('13')
    cy.get('#intelligence').select('12')
    cy.get('#wisdom').select('10')
    cy.get('#charisma').select('8')
    cy.wait(100)
    cy.contains('Next').click()  

    cy.get("input[name='characterName']").type(name)
    cy.contains('Acolyte').click()  
    cy.get("select[class='select-style']").eq(0).select('Abyssal')
    cy.get("select[class='select-style']").eq(1).select('Celestial')
    cy.get("textarea[name='appearance']").type('test appearance')
    cy.get("textarea[name='personality']").type('test personality')
    cy.get("#age").type('1')
    cy.get("#height").type('1')
    cy.get("#weight").type('1')
    cy.get("button[value='Lawful Good']").click()
    cy.wait(50)  
    cy.contains('Next').click()    

    cy.get("button[name='Animal Handling']").click()  
    cy.get("button[name='Athletics']").click()  
    cy.wait(50)
    cy.contains('Next').click()
    
    cy.contains("View Character Sheet").click()  
})
