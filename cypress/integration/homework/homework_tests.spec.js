describe('Testing capstone project, D&D CC', () => {
    // UNAUTHENTICATED TESTS---------------------------------------------------------------
    it('testing the navigation bar seen by an unauthenticated user', () => { //fail
        cy.visit('https://tt-dd-cc.herokuapp.com/')
        cy.unauthenticatedNavTest();
        cy.contains('CREATE CHARACTER').click()
        cy.unauthenticatedNavTest();
    });

    it('character overview reflects user choices', () => { //success
        cy.visit('https://tt-dd-cc.herokuapp.com/')
        cy.contains('CREATE CHARACTER').click()
        cy.createCharacter()
        cy.contains("Dragonborn").should("be.visible")
        cy.contains("Dwarf").should("not.exist") // to ensure that a race not picked is not visible
        cy.contains("Acolyte").should("be.visible")
        cy.contains("Soldier").should("not.exist") // to ensure that a background not picked is not visible
    })

    it('testing if clicking on the print button opens the print dialog', function () {
        let printStub = null
        cy.window().then((win) => {
            cy.stub(win, 'print')
            cy.contains("Print Character").click().then(() => {
                expect(win.print).to.be.calledOnce
            })
        })
      })

    it('editing a character when unauthenticated', () => { // fail
        cy.contains("Edit Character").click()
        cy.url().should("equal", "https://tt-dd-cc.herokuapp.com/create-character") 
        cy.get(".instruction__button").should("not.be.visible")
    })


    //AUTHENTICATED TESTS: -----------------------------------------------------------------------------
    it('testing the log in to dashboard process', ()=>{ //success
        cy.signIn();
        cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/dashboard')
    })

    it('testing the navigation links of an authenticated user', () => { //fail
        cy.contains("Dashboard").click()
        cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/dashboard')

        cy.contains("Create Character").click()
        cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/create-character')
        
        cy.contains('Start Character Creation').click()
        cy.contains('Dragonborn').click()
        cy.contains('Next').click() 
    
        cy.contains('Barbarian').click()
        cy.contains('Next').click()  
        //user should be in the ability scores section

        cy.contains("Create Character").click() //if we click on this again
        cy.contains("Use Standard Array").should("be.visible") //we should be in the ability scores section still
    })

    it('testing the saving functionality', () => {
        let numOfChar = (Math.random() * 50) + 10 
        name = ""
        for(let i = 0; i < numOfChar; i++){
            name += String.fromCharCode((Math.random() * 26) + 97)
        }
        cy.contains("Create Character").click()
        cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/create-character')
        cy.createCharacter(name)
        cy.contains("Save Character").click()
        cy.url().should('equal', 'https://tt-dd-cc.herokuapp.com/dashboard')
        cy.wait(300)
        cy.contains(name).should("be.visible")



        //delete it as well for clean up
        cy.contains(name).click()
        cy.contains("Delete").click()

    })

});