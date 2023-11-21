const BACKEND_URL = Cypress.env('BACKEND_URL')
const CERT_URL = Cypress.env('CERT_URL')

describe('Certificate overview page', () => {
	beforeEach(() => {
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
		})

		cy.intercept('GET', `${CERT_URL}/api/creator-certificates`, {
			statusCode: 200,
			body: {
				certificates: [
					{
						course: 1,
						creator: 1
					}
				]
			}
		});

		cy.intercept('GET', `${BACKEND_URL}/api/users/1`, {
			statusCode: 200,
			body: {
				user: {
					id: '1',
					name: 'Test User',
					email: '',
				}
			}
		});

		cy.intercept('GET', `${BACKEND_URL}/api/courses/1`, {
			statusCode: 200,
			body: {
				course: {
					id: '1',
					title: 'Test Course',
					description: 'Test Description',
					dateCreated: new Date(),
					creator: 1,
					sections: [],
					thumbnail: '',
					coverImage: '',
					tags: [],
					averageRating: 0,
					ratings: [],
					numberOfRatings: 0,
					numberOfReviews: 0,
					numberOfViews: 0,
					numberOfSubscribers: 0,
					numberOfComments: 0,
					numberOfQuestions: 0,
					numberOfStudents: 0,
					numberOfSections: 0,
				}
			}
		});

		cy.visit('http://localhost:3000/login')
		cy.get('#email-field').type('test@email.com')
		cy.get('#password-field').type('password')
		cy.get('#submitLoginButton').click()
		cy.get('#profile-dropdown').click()
		cy.get('#certificates-button').click()
	});

	it('shows a message when there are no certificates', () => {
		cy.intercept('GET', `${BACKEND_URL}/api/certificates`, {
			statusCode: 200,
			body: {
				certificates: [],
			},
		})

		cy.visit('http://localhost:3000/certificates')
		cy.get('#no-certificates-message').should('exist')
	})
})

export { }