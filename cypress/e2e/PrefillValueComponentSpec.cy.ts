describe('Basic tests for the Focus file', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
    cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').click();

  })

  it('Does clicking an empty field open a menu?', () => {
    cy.get('#«r0»').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"]')
      .should('contain.text', "Select data for: button")
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"]')
      .should('contains.text', "Cancel")
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"]')
      .should('contains.text', "Global Defaults")
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"]')
      .should('contains.text', "tenant_id: 1")
  })

  it('Does clicking cancel close the menu?', () => {
    cy.get('#«r0»').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(2)').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(2)').should('not.exist');
  })

  it('Does clicking an option input that value to the form?', () => {
    cy.get('#«r0»').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(3) > :nth-child(5)').click()    
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(2)').click()
    cy.get('#«ri»').should('have.value', 'Category 4')
  })

  it('Does clicking an option input that value to the form?', () => {
    cy.get('#«r0»').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(3) > :nth-child(5)').click()    
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"] > :nth-child(2)').click()
    cy.get('#«ri»').should('have.value', 'Category 4')
  })
  it('Clicking a non-empty form should not open the menu', () => {
    cy.get('#«r3»').click()
    cy.get('[style="position: absolute; top: 100px; left: 100px; background: rgb(255, 255, 255); padding: 1em; border: 1px solid rgb(204, 204, 204); border-radius: 8px; z-index: 999; max-height: 300px; overflow-y: auto; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; width: 300px;"]').should('not.exist')

  })

})