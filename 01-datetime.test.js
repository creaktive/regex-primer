describe("let's validate strings containing dates & times", () => {
    describe('years from 1900 to 2099', () => {
        const yearRegex = new RegExp([
            '^',
            '[0-9]{4}',
            '$',
        ].join(''));

        test.each([
            '1900',
            '1984',
            '1999',
            '2000',
            '2001',
            '2099',
        ])('%p should be valid', (testString) => {
            expect(yearRegex.test(testString)).toBe(true);
        });

        test.each([
            '1899',
            '1999-12-31',
            '2100',
            '99',
            '9999',
            'year 1999',
        ])('%p should be invalid', (testString) => {
            expect(yearRegex.test(testString)).toBe(false);
        });
    });

    describe('YYYY-MM-DD (approximate; 2024-02-30 is fine :)', () => {
        const ymdRegex = new RegExp([
            '^',
            '[0-9]{4}',
            '-',
            '[0-9]{2}',
            '-',
            '[0-9]{2}',
            '$',
        ].join(''));

        test.each([
            '0000-01-01',
            '1900-01-01',
            '1984-12-31',
            '2023-06-19',
            '9999-12-31',
        ])('%p should be valid', (testString) => {
            expect(ymdRegex.test(testString)).toBe(true);
        });

        test.each([
            '00-01-01',
            '1900-03-50',
            '1953-08-00',
            '1984-13-31',
            '2005-00-01',
            '2023-06-32',
        ])('%p should be invalid', (testString) => {
            expect(ymdRegex.test(testString)).toBe(false);
        });
    });

    describe('24h time (hh:mm)', () => {
        const timeRegex = new RegExp([
            '^',
            '[0-9]{2}',
            ':',
            '[0-9]{2}',
            '$',
        ].join(''));

        test.each([
            '00:00',
            '01:02',
            '09:00',
            '12:34',
            '13:37',
            '23:59',
        ])('%p should be valid', (testString) => {
            expect(timeRegex.test(testString)).toBe(true);
        });

        test.each([
            '00:00:00',
            '00:60',
            '1234',
            '24:00',
            ':',
        ])('%p should be invalid', (testString) => {
            expect(timeRegex.test(testString)).toBe(false);
        });
    });

    describe('12h time', () => {
        const timeRegex = new RegExp([
            '^',
            '[0-9]{1,2}',
            ':',
            '[0-9]{2}',
            '\\s*',
            '(am|pm)',
            '$',
        ].join(''), 'i');

        test.each([
            '0:00 AM',
            '01:02PM',
            '9:00 pm',
            '12:34am',
            '5:37  pm',
        ])('%p should be valid', (testString) => {
            expect(timeRegex.test(testString)).toBe(true);
        });

        test.each([
            '00:00',
            '00:0 am',
            '2:60 pm',
            '13:59 am',
            '24:00 pm',
        ])('%p should be invalid', (testString) => {
            expect(timeRegex.test(testString)).toBe(false);
        });
    });
});
