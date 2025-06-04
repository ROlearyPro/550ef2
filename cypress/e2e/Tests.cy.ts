describe('Basic tests for the blueprints file', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('Can successfully navigate into a node\'s page', () => {
    cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').should('have.text', "\"Form F\"")
    cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').click();
    
  })

  it('Should successfully display all the forms', ()=> 
  {
    cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').should('have.text', "\"Form F\"")
    cy.get('.form-0f58384c-4966-4ce6-9ec2-40b96d61f745').should('have.text', "\"Form D\"")
    cy.get('.form-47c61d17-62b0-4c42-8ca2-0eff641c9d88').should('have.text', "\"Form A\"")
    cy.get('.form-7c26f280-7bff-40e3-b9a5-0533136f52c3').should('have.text', "\"Form C\"")
    cy.get('.form-a4750667-d774-40fb-9b0a-44f8539ff6c4').should('have.text', "\"Form B\"")
    cy.get('.form-e15d42df-c7c0-4819-9391-53730e6d47b3').should('have.text', "\"Form E\"")

    cy.get('.form-0f58384c-4966-4ce6-9ec2-40b96d61f745').should('not.have.text', "\"Form R\"")

  })
})