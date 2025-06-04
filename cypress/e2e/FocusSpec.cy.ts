describe('Basic tests for the Focus file', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').click();

  })

  it('Can click an empty form and still type in it afterwards', () => {
    // bit of a hacky solution, but it does allow me to check the fields without altering their ids or the like
    cy.get('#«r0»').click()
    cy.focused().type('Does this work?', {delay:0})
    cy.wait(300)
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(2)').click()
    cy.get('#«ri»').should('have.value', "Does this work?")
  })

})