import { slateBeforeEach, slateAfterEach } from '../support/e2e';

// Smoke test for the add-on: @eeacms/countup only exports a hook/component
// (applyConfig is a no-op), so the integration stage proves that a Volto app
// with the add-on installed still boots the editor and can add + save blocks.
describe('Countup smoke tests', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('Boots the edit UI', () => {
    cy.get('#toolbar-save').should('exist');
    cy.get('.blocks-form').should('exist');
    cy.getSlateTitle().should('exist');
  });

  it('Add Block: Image', () => {
    cy.clearSlateTitle();
    cy.getSlateTitle().type('My Add-on Page');
    cy.get('.documentFirstHeading').contains('My Add-on Page');

    cy.getSlate().click();

    // Add an image block through the block chooser.
    cy.get('.ui.basic.icon.button.block-add-button').first().click();
    cy.get('.blocks-chooser .title').contains('Media').click();
    cy.get('.content.active.media .button.image').contains('Image').click();
    cy.get('.block-editor-image').should('exist');

    // Save and check that the page view renders the block.
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');

    cy.contains('My Add-on Page');
    cy.get('.block.image').should('exist');
  });
});
