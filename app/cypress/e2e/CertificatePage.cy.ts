import "cypress-localstorage-commands";

const BACKEND_URL = Cypress.env('BACKEND_URL')
const CERT_URL = Cypress.env('CERT_URL')

describe('Certificate overview page', () => {
	before(() => {
		cy.intercept('POST', `${BACKEND_URL}/api/auth/login`, {
			statusCode: 202,
			body: {
				userInfo: {
					id: '1',
					name: 'Test User',
					email: 'test@email.com'
				},
				token: 'testToken'
			},

		});

		cy.intercept('GET', `${BACKEND_URL}/api/courses/creator/*`, {
			statusCode: 200,
			body: {
				certificates: [],
			},
		})
		cy.visit('http://localhost:3000/login')
		cy.get('#email-field').type('test@email.com')
		cy.get('#password-field').type('password')
		cy.get('#submitLoginButton').click()
		cy.saveLocalStorage();
	});
	
	beforeEach(() => {
		cy.restoreLocalStorage();
	});

	it('shows a message when there are no certificates', () => {

		cy.intercept('GET', `${CERT_URL}/api/creator-certificates*`, {
			statusCode: 200,
			body: {
				certificates: [],
			},
		})
		cy.intercept('GET', `${BACKEND_URL}/api/courses/creator/*`, {
			statusCode: 200,
			body: {
				certificates: [],
			},
		})

		cy.visit('http://localhost:3000/certificates')
		cy.get('#no-certificates-message').should('exist')
	})

	it('shows a list of certificates', () => {

		cy.intercept('GET', `${CERT_URL}/api/creator-certificates*`, {
			statusCode: 200,
			body:
				[
					{
						course: '1',
						creator: '1',
					}
				],
		})

		cy.intercept('GET', `${BACKEND_URL}/api/users/*`, {
			statusCode: 200,
			body: {
				user: {
					id: '1',
					name: 'Test User',
					email: '',
				}
			}
		});

		cy.intercept('GET', `${BACKEND_URL}/api/courses/*`, {
			statusCode: 200,
			body: {
				id: '1',
				title: 'Test Course',
				description: 'Test Description',
				dateCreated: new Date(),
				creator: 1,
				sections: [],
				thumbnail: '',
				coverImage: '',
				tags: [],
				rating: 0,
			}
		});

		cy.visit('http://localhost:3000/certificates')
		cy.get('#certificate-list').should('exist')
		cy.get('#card-0-title').should('have.text', 'Test Course').debug()
	});
})

export { }