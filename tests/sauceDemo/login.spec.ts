import { test, expect } from '../../fixtures/sauceDemoFixtures';
import { USERS, PASSWORD } from '../../testData/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  const validUsers = [USERS.standard, USERS.performance, USERS.problem, USERS.error, USERS.visual];

  for (const user of validUsers) {
    test(`valid login - ${user}`, async ({ page, loginPage }) => {
      await loginPage.login(user, PASSWORD);

      await expect(page).toHaveURL(/inventory\.html/, { timeout: 10_000 });
    });
  }

  // negatives
  const invalidLogins = [
    { name: 'locked out user', user: USERS.lockedOut, pass: PASSWORD, error: 'Sorry, this user has been locked out.' },
    { name: 'wrong password', user: USERS.standard, pass: 'wrong_pass', error: 'Username and password do not match' },
    { name: 'empty username', user: '', pass: PASSWORD, error: 'Username is required' },
    { name: 'empty password', user: USERS.standard, pass: '', error: 'Password is required' },
  ];

  for (const data of invalidLogins) {
    test(`login fails - ${data.name}`, async ({ page, loginPage }) => {
      await loginPage.login(data.user, data.pass);

      await expect(loginPage.errorMessage).toContainText(data.error);
      await expect(page).not.toHaveURL(/inventory\.html/);
    });
  }

  test('inventory is not accessible without login', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    
    await expect(loginPage.errorMessage).toContainText(
      "You can only access '/inventory.html' when you are logged in"
    );
  });
});