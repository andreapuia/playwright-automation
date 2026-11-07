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
git clone https://github.com/andreapuia/playwright-automation 
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
npx playwright test                                  # all tests, all browsers
npx playwright test --project=chromium               # all tests, Chromium only
npx playwright test tests/sauceDemo/login.spec.ts    # run a specific test file
npx playwright test --ui                             # UI mode, for debugging
npx playwright show-report                           # open the HTML report
```

## Project Structure

- `.github/workflows/`       - Github Actions to run the tests over CI
- `docs/bugs/`               - bug reports for the issues found during testing
- `fixtures/`                - custom playwright fixtures used to initialize page objects and share test setup logic
- `models/`                  - shared data models, such as the `Product` interface
- `pages/`                   - POM classes, including page locators and reusable UI interactions
- `pages/sauceDemo/`        
- `pages/uiPlayground/`  
- `testData/`                - test data used  (users, password, checkout information)
- `tests/`                   - test scenarios
- `tests/sauceDemo/`          
- `tests/uiPlayground/` 
- `utils/`                   - contains reusable functions for product extraction and price calculations
- `playwright.config.ts`     - all the basic configurations for Playwright including report generation, tracing etc
- `package.json`             - defines the project dependencies and npm scripts
- `package-lock.json`        - stores the exact dependency versions to ensure consistent installations

## Known Bugs - Sauce Demo
 
Bugs found by running Scenario 1 with every user accepted by the application.
 
**Browsers:** Chromium, Firefox, WebKit
**Test:** `tests/sauceDemo/scenario1.spec.ts`
 
## Summary
 
| ID | Title | User | Severity | Priority |
|---|---|---|---|---|
| [BUG-001](docs/bugs/BUG-001.md) | Add to cart does not work for some products | `problem_user` | High | High |
| [BUG-002](docs/bugs/BUG-002.md) | Add to cart fails without an error message | `error_user` | High | High |
| [BUG-003](docs/bugs/BUG-003.md) | Inventory price differs from cart price | `visual_user` | High | High |
| [PERF-001](docs/bugs/PERF-001.md) | Slow checkout flow | `performance_glitch_user` | Medium | Medium |
 
For users with known bugs, I use `test.fail()` and add the bug ID to the test description. 
If a bug gets fixed, the test will fail, signaling that the marker should be removed.