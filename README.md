# Playwright Automation

## Overview

This project contains automated UI and API tests using Playwright with TypeScript for web applications: 
- [Sauce Demo](https://www.saucedemo.com/)
- [UI Testing Playground](http://uitestingplayground.com/)
- [DummyJSON API](https://dummyjson.com/)

It follows Page Object Model (POM) for UI tests, a reusable API client for API tests, custom fixtures, and DRY principles.

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
Using the npm scripts from `package.json`:
```bash
npm test                    # all tests, all browsers
npm run test:chromium       # all tests, Chromium only
npm run test:ui             # UI mode, for debugging
npm run report              # open the HTML report
```
 
Or directly with Playwright:
```bash
npx playwright test                                  # run all UI and API tests
npx playwright test tests/sauceDemo/login.spec.ts    # run a specific test file
npx playwright test --grep-invert @known-bug         # skip tests marked with known bugs
npx playwright test --grep @known-bug                # run only tests marked with known bugs
npx playwright test --project=api                    # run API tests only
```

## Project Structure

- `.github/workflows/`           - Github Actions to run the tests over CI
- `api/`                         - reusable http methods
- `docs/bugs/`                   - bug reports for the issues found during testing
- `fixtures/`                    - custom playwright fixtures used to initialize page objects and share test setup logic
- `models/`                      - shared data models, such as the `Product` interface
- `pages/`                       - POM classes, including page locators and reusable UI interactions
    - `pages/sauceDemo/`         - Sauce Demo page objects
    - `pages/uiPlayground/`      - UI Testing Playground page objects
- `testData/`                    - test data used  (UI test data and DummyJSON credentials)    
- `tests/`                   
    - `tests/sauceDemo/`         - Sauce Demo test scenarios
    - `tests/uiPlayground/`      - UI Testing Playground test scenarios
    - `tests/apiDummyJSON/`      - DummyJSON API tests
- `utils/`                       - reusable helpers, including jwtUtils.ts
- `playwright.config.ts`         - all the basic configurations for Playwright including report generation, tracing etc
- `package.json`                 - project dependencies and npm scripts
- `package-lock.json`            - stores the exact dependency versions to ensure consistent installations

## Known Bugs
 
The following issues were observed or reported during testing. 

**Browsers:** Chromium, Firefox, WebKit
 
### Summary
 
| ID | Title | User/App | Severity | Priority |
|---|---|---|---|---|
| [BUG-001](docs/bugs/BUG-001.md) | Add to cart does not work for some products | `problem_user` | High | High |
| [BUG-002](docs/bugs/BUG-002.md) | Add to cart fails without an error message | `error_user` | High | High |
| [BUG-003](docs/bugs/BUG-003.md) | Inventory price differs from cart price | `visual_user` | High | High |
| [BUG-004](docs/bugs/BUG-004.md) | Sorting by price has no effect | `problem_user` | Medium | Medium |
| [BUG-005](docs/bugs/BUG-005.md) | Sorting by price has no effect | `error_user` | Medium | Medium |
| [BUG-006](docs/bugs/BUG-006.md) | Checkout can be started with an empty cart | all users | Medium | Medium |
| [BUG-007](docs/bugs/BUG-007.md) | Cart is shared between users after logout | all users | High | High |
| [BUG-008](docs/bugs/BUG-008.md) | Upload accepts unsupported file types | Upload | Medium | Medium |
| [BUG-009](docs/bugs/BUG-009.md) | Upload does not enforce the 15MB file size limit | Upload | Medium | Medium |
| [BUG-010](docs/bugs/BUG-010.md) | Modified JWT payload returns 500 instead of 401 | API Authentication | Medium | Medium |
| [PERF-001](docs/bugs/PERF-001.md) | Slow checkout flow | `performance_glitch_user` | Medium | Medium |

Known defects are documented in `docs/bugs/`, and affected tests are tagged with `@known-bug`.
Tests use normal assertions, so known bugs are reported as failures.
