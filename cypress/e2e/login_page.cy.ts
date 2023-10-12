describe('Login Page', () => {
	it('should allow the user to log in and navigate to dashboard page', () => {
		cy.login(Cypress.env('user_email'), Cypress.env('user_password'));
	});
});
