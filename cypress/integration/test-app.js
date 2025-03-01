describe('Entire application', () => {
    beforeEach( () => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {  fixture: 'fetch-fixture.json' })
        cy.visit('http://localhost:3000/')
    })
    it('Should have a title and a background', () => {
        cy.get('header').should('exist')
        cy.get('h1').should('be.visible').contains('Burrito Builder')
        cy.get('.App').should('have.css', 'background-image')
    })
    it('Should display already existing orders', () => {
        cy.get('.order').should('have.length', 3)
            .should('have.css', 'margin')
        cy.get('h3').should('be.visible')
        cy.get('.ingredient-list').should('be.visible')
        cy.get('.order').first()
            .get('h3').contains('Stev')
            .get('.ingredient-list').contains("frijoles")
    })
    it('Should have a form', () => {
        cy.get('input[name=name]').should('be.visible')
        .should('have.attr', 'placeholder', 'Name')
        .type('Lopez')
        .should('have.value', 'Lopez')
        cy.get('.ingredient-btns').should('be.visible').should('have.length', 12)
            .eq(1).contains('steak')
        cy.get('.ingredient-btns[name=lettuce]').should('be.visible')
        cy.get('.ingredient-btns[name=sofritas]').should('be.visible')
        cy.get('.submit-button').should('be.visible')
    })
    it('Should not allow an order to be submitted without a name of ingredients', () => {
        cy.get('.add-ingredients').should('have.text', 'Order: Nothing selected')
        cy.get('input[name=name]').should('be.visible')
        cy.get('.submit-button').should('be.disabled')

    })
    it('Should show orders being updated on ingredient button click', () => {
        cy.get('.add-ingredients').should('have.text', 'Order: Nothing selected')
        cy.get('.ingredient-btns[name=lettuce]').click()
            .get('.add-ingredients').contains('Order: lettuce')
        cy.get('.ingredient-btns[name=sofritas]').click()
            .get('.add-ingredients').contains('Order: lettuce, sofritas')
    })
    it('Should create and display a new order when all fields are filled out', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {id: 234, name: 'Jack Clack', ingredients: ['beans', 'jalepenos', 'guacamole']})
        cy.get('input[name=name]').should('be.visible')
            .type('Jack Clack')
            .should('have.value', 'Jack Clack')
        cy.get('.ingredient-btns[name=beans]').click()
            .get('.add-ingredients').contains('Order: beans')
        cy.get('.ingredient-btns[name=jalapenos]').click()
            .get('.add-ingredients').contains('Order: beans, jalapenos')
        cy.get('.ingredient-btns[name=guacamole]').click()
            .get('.add-ingredients').contains('Order: beans, jalapenos, guacamole')
        cy.get('.submit-button').click()
            .get('.order').should('have.length', 4)
        cy.get('input[name=name]').should('have.value', '')
        cy.get('.add-ingredients').should('have.text', 'Order: Nothing selected')
        cy.get('.submit-button').should('be.disabled')

    })
    it('Should clear inputs after successful order submission', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {id: 234, name: 'Jack Clack', ingredients: ['beans', 'jalepenos', 'guacamole']})
        cy.get('input[name=name]')
            .type('Jack Clack')
        cy.get('.ingredient-btns[name=beans]').click()
        cy.get('.ingredient-btns[name=jalapenos]').click()
        cy.get('.ingredient-btns[name=guacamole]').click()
            .get('.add-ingredients').contains('Order: beans, jalapenos, guacamole')
        cy.get('.submit-button').click()
            .get('input[name=name]').should('have.value', '')
            .get('.add-ingredients').should('have.text', 'Order: Nothing selected')
            .get('.submit-button').should('be.disabled')

    })
})