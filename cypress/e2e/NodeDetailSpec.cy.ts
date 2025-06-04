describe('Basic tests for the Focus file', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001')
  })

  it('Text for displayed nodes changes when different nodes are clicked?', () => {
  cy.get('.form-bad163fd-09bd-4710-ad80-245f31b797d5').click();
  cy.get('h2').should('have.text', "Form for Node: Form F");
  cy.visit('http://localhost:3001');
  cy.get('.form-0f58384c-4966-4ce6-9ec2-40b96d61f745').click();
  cy.get('h2').should('have.text', "Form for Node: Form D");
  })

})