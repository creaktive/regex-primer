describe('use the primitives to construct templates', () => {
    const start = () => '^';
    const end = () => '$';
    const literal = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'); // LOL
    const word = () => '[A-Za-z0-9_]';
    const quantifier = (atom, min = 0, max = '') => `(?:${atom}){${min},${max}}`;

    describe('username', () => {
        const usernameRegex = new RegExp([
            start(),
            quantifier(word(), 1),
            end()
        ].join(''));

        test.each([
            'test',
            'root',
            'admin',
            'qwic2023',
            'Firstname_Surname',
        ])('%p should be valid', (testString) => {
            expect(usernameRegex.test(testString)).toBe(true);
        });

        test.each([
            '',
            'bad username',
            '@qwic',
            'Firstname.Surname'
        ])('%p should be invalid', (testString) => {
            expect(usernameRegex.test(testString)).toBe(false);
        });
    });

    describe('email', () => {
        const emailRegex = new RegExp([
            start(),
            literal('test@qwic.nl'), // passes most of the tests :)
            end()
        ].join(''));

        test.each([
            'test@qwic.nl',
            'name_surname@domain.com',
            'stevie97@hotmail.com',
            'athena_stanton96@gmail.com',
            'dorian8@yahoo.com',
        ])('%p should be valid', (testString) => {
            expect(emailRegex.test(testString)).toBe(true);
        });

        test.each([
            '',
            '@',
            'a@b.c',
            '@qwic.nl',
            '@jessie75',
            'jeanne55@yahoo.',
            'shania_ohara45@.com',
            'usuario@uol.com.br', // actually valid, but let's leave this out for now
            'jaden.greenfelder48@yahoo.com', // ditto
        ])('%p should be invalid', (testString) => {
            expect(emailRegex.test(testString)).toBe(false);
        });
    });
});
