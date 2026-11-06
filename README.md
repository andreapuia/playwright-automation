# Playwright Automation

## Overview

This project contains automated tests for web applications: 
- [Sauce Demo](https://www.saucedemo.com/)
- [UI Testing Playground](http://uitestingplayground.com/)
- [DummyJSON API](https://dummyjson.com/)

The project uses Playwright with TypeScript and follows Page Object Model (POM), test fixtures, and DRY principles.

## Prerequisites
Before running the tests, make sure the following tools are installed: 
- Node.js (LTS version)
- npm (included with Node.js)
- git

## Installation and Environment Setup

Clone the repository:
```bash
git clone <repository-url>
cd playwright-automation
```

Install project dependencies:
 ```bash
npm ci
```

Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests
```bash
npx playwright test                                  # all tests
npx playwright test --ui                             # UI mode, for debugging
npx playwright test tests/sauceDemo/login.spec.ts    # run specific test file
npx playwright show-report                           # HTML report
```

## Project Structure

The tests are written in TypeScript using Playwright. 
The project follows the Page Object Model (POM), test fixtures, and DRY principles to keep the code reusable, organized, and easy to maintain.

The project contains the following files and folders:
- `.github/workflows/`       - Github Actions to run the tests over CI
- `fixtures/`                - custom playwright fixtures used to initialize page objects and share test setup logic
- `pages/`                   - POM classes, including page locators and reusable UI interactions
- `pages/sauceDemo/`        
- `pages/uiPlayground/`     
- `tests/`                   - test scenarios
- `tests/sauceDemo/`          
- `tests/uiPlayground/` 
- `playwright.config.ts`     - all the basic configurations for Playwright including report generation, tracing etc
- `package.json`             - defines the project dependencies and npm scripts
- `package-lock.json`        - stores the exact dependency versions to ensure consistent installations