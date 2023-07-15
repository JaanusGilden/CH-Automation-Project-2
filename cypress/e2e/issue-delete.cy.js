import { faker } from '@faker-js/faker';

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
    });
  });

  it('Test 1: Delete the issue, confirm deletion, and check that it is gone', () => {
    cy.get('[data-testid="modal:issue-details"] > div > div > button > i[data-testid="icon:trash"]').parent().click();
    cy.get('[data-testid="modal:confirm"] > div > button > div').contains('Delete issue').parent().click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('not.exist');
  });

  it('Test 2: Start deletion, cancel it, and check that it is still there', () => {
    cy.get('[data-testid="modal:issue-details"] > div > div > button > i[data-testid="icon:trash"]').parent().click();
    cy.get('[data-testid="modal:confirm"] > div > button > div').contains('Cancel').parent().click();
    cy.get('[data-testid="modal:confirm"]').should('not.exist');
    cy.contains('This is an issue of type: Task.').should('exist');
  })
});
