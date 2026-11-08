import { test, expect } from '../../fixtures/uiPlaygroundFixtures';

// statusul general la incarcarea paginii (fructele preselectate)
const INITIAL_OVERALL_STATUS = 'selectFruits: Apple, Cherry, Grape';

test.describe('Select - single-select states', () => {

    test('initial state shows only the preselected fruits', async ({ selectPage }) => {
        await expect(selectPage.getStatus('selectLanguage')).toHaveText('Selected: none');
        await expect(selectPage.overallStatus).toHaveText(INITIAL_OVERALL_STATUS);
    });

    test('changing the selection replaces the previous value', async ({ selectPage }) => {
        await selectPage.selectByValue('selectLanguage', 'js');
        await expect(selectPage.getStatus('selectLanguage')).toHaveText('Selected: JavaScript (value: js)');

        await selectPage.selectByValue('selectLanguage', 'py');
        await expect(selectPage.getStatus('selectLanguage')).toHaveText('Selected: Python (value: py)');
    });

    test('going back to the placeholder clears the selection', async ({ selectPage }) => {
        await selectPage.selectByValue('selectLanguage', 'js');
        // "-- Please select --" are value gol
        await selectPage.selectByValue('selectLanguage', '');

        await expect(selectPage.getStatus('selectLanguage')).toHaveText('Selected: none');
        await expect(selectPage.overallStatus).toHaveText(INITIAL_OVERALL_STATUS);
    });
});

test.describe('Select - nr of selected options', () => {

    const colorCases = [
        { name: 'one option', values: ['purple'], expected: 'Selected: Purple' },
        {
            name: 'all options',
            values: ['red', 'green', 'blue', 'yellow', 'purple', 'orange'],
            expected: 'Selected: Red, Green, Blue, Yellow, Purple, Orange',
        },
    ];

    for (const colorCase of colorCases) {
        test(`multi-select with ${colorCase.name}`, async ({ selectPage }) => {
            await selectPage.selectByValue('selectColors', colorCase.values);
            await expect(selectPage.getStatus('selectColors')).toHaveText(colorCase.expected);
        });
    }

    test('multi-select with no options', async ({ selectPage }) => {
        // limita inferioara: deselectam si fructele preselectate
        await selectPage.selectByValue('selectFruits', []);

        await expect(selectPage.getStatus('selectFruits')).toHaveText('Selected: none');
        await expect(selectPage.overallStatus).toHaveText(
            'Perform selections and verify results using status labels above each control.'
        );
    });
});

test.describe('Select - by visible text', () => {

    const labelCases = [
        // textul optiunii are spatii speciale (non-breaking space)
        { selectId: 'selectCity', label: 'New York', expected: 'Selected: New York (value: nyc)' },
        // exista si "Release 3.0 Beta", trebuie selectata exact optiunea ceruta
        { selectId: 'selectProduct', label: 'Release 3.0', expected: 'Selected: Release 3.0 (value: v3.0)' },
        // acelasi rezultat ca la selectarea dupa value
        { selectId: 'selectLanguage', label: 'JavaScript', expected: 'Selected: JavaScript (value: js)' },
    ] as const;

    for (const labelCase of labelCases) {
        test(`select "${labelCase.label}" by text in ${labelCase.selectId}`, async ({ selectPage }) => {
            await selectPage.selectByLabel(labelCase.selectId, labelCase.label);
            await expect(selectPage.getStatus(labelCase.selectId)).toHaveText(labelCase.expected);
        });
    }
});

test.describe('Select - add and remove in multi-select', () => {

    test('adding an option keeps the existing selection', async ({ selectPage }) => {
        await selectPage.addToSelection('selectFruits', 'date');
        await expect(selectPage.getStatus('selectFruits')).toHaveText('Selected: Apple, Cherry, Date, Grape');
    });

    test('removing an option keeps the rest of the selection', async ({ selectPage }) => {
        await selectPage.removeFromSelection('selectFruits', 'cherry');
        await expect(selectPage.getStatus('selectFruits')).toHaveText('Selected: Apple, Grape');
    });
});

test.describe('Select - by regex', () => {

    test('select an option by a regex pattern', async ({ selectPage }) => {
        await selectPage.selectByRegex('selectCity', /^Salt\s+Lake\s+City$/);
        await expect(selectPage.getStatus('selectCity')).toHaveText('Selected: Salt Lake City (value: slc)');
    });
});