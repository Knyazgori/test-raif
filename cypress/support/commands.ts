/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('isPageOpen', () => {
    cy.get('h1').first().should('have.text', 'Пример работы формы')
    cy.get('#raiff-demo-artw form').should('have.length', 1)
})

Cypress.Commands.add('isFinish', () => {
    cy.contains('Благодарим за пройденный опрос').should('exist')
})

Cypress.Commands.add('clickNext', () => {
    cy.get('button').contains('Далее').click()
})

Cypress.Commands.add('clickBack', () => {
    cy.get('button').contains('Назад').click()
})

Cypress.Commands.add('clickFinish', () => {
    return cy.get('button').contains('Отправить').click()
})

Cypress.Commands.add('errorExists', () => {
    cy.get('#raiff-demo-artw [class^="Form_form-error"]').should('exist')
})

Cypress.Commands.add('errorNotExists', () => {
    cy.get('#raiff-demo-artw [class^="Form_form-error"]').should('not.exist')
})

Cypress.Commands.add('setTextField', (title, name, value, isError = false, clear = false) => {
    cy.contains(title).should('exist')
    const input = cy.get('[name="' + name + '"]').should('have.length', 1).focus()

    if (value) {
        input.type(value)
    }

    input.blur()

    if (isError) {
        cy.errorExists()
    } else {
        cy.errorNotExists()
    }

    if (clear) {
        input.clear()
    }
})

Cypress.Commands.add('setAddressField', (title, name, value, isError = false, clear = false) => {
    cy.contains(title).should('exist')
    const input = cy.get('[name="' + name + '"]').should('have.length', 1).focus()

    if (value) {
        input.type(value)
    }

    if (value.trim()) {
        if (isError) {
            cy.get('.react-dadata__suggestions button.react-dadata__suggestion').should('not.exist')
        } else {
            cy.get('.react-dadata__suggestions button.react-dadata__suggestion').first().should('exist').click()
        }
    }

    input.blur()

    if (clear) {
        input.clear()
    }

    if (isError) {
        cy.errorExists()
    } else {
        cy.errorNotExists()
    }

})

Cypress.Commands.add('setBoolField', (title, name, value, isError = false, clear = false) => {
    cy.contains(title).should('exist')
    if (typeof value === 'boolean') {
        cy.get('[type="radio"][value="' + (value ? 'Да' : 'Нет') + '"]').should('have.length', 1).parent().click()
    }

    if (isError) {
        cy.errorExists()
    } else {
        cy.errorNotExists()
    }


})

