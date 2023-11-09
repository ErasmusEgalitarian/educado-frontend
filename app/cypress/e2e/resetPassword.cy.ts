describe('Password recovery flow', () => {
  it('gives a success message upon correct information', () => {

    cy.intercept('POST', 'http://localhost:8888/api/auth/reset-password*', {})
    cy.intercept('PATCH', 'http://localhost:8888/api/auth/reset-password', {})

    cy.visit('http://localhost:5173/login')
    cy.location('pathname').should('eq', '/login')
    cy.get('#modalToggle').click()
    cy.get('#email-field').type('test@email.com')

    cy.get('#error-message').should('not.exist')

    const continueButton = cy.get('#continue')
    continueButton.click()

    cy.get('#pin-field').type('1234')
    continueButton.click()
    const passwordField = cy.get('#password-field')
    passwordField.type('password')

    // Clicking the eye icon should change the password field to text
    cy.get('#password-eye').click()
    cy.get('#password-field').should('have.attr', 'type', 'email')

    // Clicking the eye icon again should change the password field back to password
    cy.get('#password-eye').click()
    cy.get('#password-field').should('have.attr', 'type', 'password')

    cy.get('#confirm-password-field').type('password')
    continueButton.click()
    cy.get('#error-message').should('not.have.text', '')
  })
})