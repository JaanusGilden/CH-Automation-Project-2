import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  Cypress.on('uncaught:exception', (err, runnable) => { return false; });

  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //System will already open issue creating modal in beforeEach block  
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  it('Should create an issue and validate it successfully', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Story
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
          .trigger('click');
            
      //Type value to description input field
      cy.get('.ql-editor').type('TEST_DESCRIPTION');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('TEST_TITLE');
      
      //Select Lord Gaben from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('TEST_TITLE');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      //Try to click create issue button without filling any data
      cy.get('button[type="submit"]').click();

      //Assert that correct error message is visible
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });

  it('Should create an issue and validate it successfully - Assignment 2', () => {
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Bug
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').wait(500)
          .trigger('click');
            
      //Type value to description input field
      cy.get('.ql-editor').type('My bug description');

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type('Bug');
      
      //Select Pickle Rick from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      // Select Highest priority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains('Bug');
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
  });

  it('Should create an issue and validate it successfully - Assignment 2 - fake data', () => {
    //Generate random description and title
    const fakeDesc = faker.lorem.sentence()
    const fakeTitle = faker.lorem.word()
          
    //System finds modal for creating issue and does next steps inside of it
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      //open issue type dropdown and choose Task
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="icon:close"]')
          .trigger('click');
      cy.get('[data-testid="select-option:Task"]')
          .trigger('click');

      //Type value to description input field
      cy.get('.ql-editor').type(fakeDesc);

      //Type value to title input field
      //Order of filling in the fields is first description, then title on purpose
      //Otherwise filling title first sometimes doesn't work due to web page implementation
      cy.get('input[name="title"]').type(fakeTitle);
      
      //Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      // Select Low priority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();

      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });

    //Assert that modal window is closed and successful message is visible
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    
    //Reload the page to be able to see recently created issue
    //Assert that successful message has dissappeared after the reload
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    //Assert than only one list with name Backlog is visible and do steps inside of it
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      //Assert that this list contains 5 issues and first element with tag p has specified text
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(fakeTitle);
      //Assert that correct avatar and type icon are visible
      cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
      cy.get('[data-testid="icon:task"]').should('be.visible');
    });
  });

  //Sprint 2 BONUS Assignment 3 Task 3
  const selectorTitle = 'textarea[placeholder="Short summary"]'

  it('Should remove excess spaces in title', () => {
    const spacedTitle = '  test  title  ';
    const trimmedTitle = spacedTitle.trim().replace(/ +/g," ");
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('input[name="title"]').wait(500).type(spacedTitle);
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    cy.get('[data-testid="board-list:backlog"]').should('be.visible').and('have.length', '1').within(() => {

      //Title is NOT actually trimmed in issue list
      cy.get('[data-testid="list-issue"]').first().find('p').should('have.text', spacedTitle);
      cy.get('[data-testid="list-issue"]').first().find('p').invoke('text').should('eq', spacedTitle);
      cy.get('[data-testid="list-issue"]').first().find('p').should(n => {
        expect(n.text()).to.eq(spacedTitle);
        //Title *appears* trimmed in list
        expect(n.get(0).innerText).to.eq(trimmedTitle);
      });

    });
    cy.get('[data-testid="list-issue"]').first().click();
    cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {

      //Title is NOT trimmed on issue details page
      cy.get(selectorTitle).should('have.text', spacedTitle);
      cy.get(selectorTitle).invoke('text').should('eq', spacedTitle);
      cy.get(selectorTitle).should(n => {
        expect(n.text()).to.eq(spacedTitle);
        //innerText gives empty string
        expect(n.get(0).innerText).to.eq("");
      });

    });
  });
});
