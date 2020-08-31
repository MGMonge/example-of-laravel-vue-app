import Pipeline from '../../src/js/helpers/Pipeline'

describe('Pipeline', () => {
    test('It runs a value through a single callable pipe', () => {
        const pipes = [
            (value, next) => { return next(value.trim()) }
        ]

        const actual = (new Pipeline).send('  VALUE  ').through(pipes).then(value => value)

        expect(actual).toBe('VALUE')
    })

    test('It runs a value through multiple callable pipes', () => {
        const pipes = [
            (value, next) => { return next(value.trim()) },
            (value, next) => { return next(value.replace('A', 4)) }
        ]

        const actual = (new Pipeline).send('  VALUE  ').through(pipes).then(value => value)

        expect(actual).toBe('V4LUE')
    })

    test.only('It runs in the correct order', () => {
        const pipes = [
            function middlewareA (value, next) { return next(value.replace('AAA', 'BBB')) },
            function middlewareB (value, next) { return next(value.replace('BBB', 'CCC')) },
            function middlewareC (value, next) { return next(value.replace('CCC', 'DDD')) }
        ]

        const actual = (new Pipeline).send('AAA').through(pipes).then(value => value)

        expect(actual).toBe('DDD')
    })

    test('it does not continue the pipeline if if next pipe is not called', () => {
        const pipes = [
            (value, next) => { return value.trim() },
            (value, next) => { return next(value.replace('A', 4)) }
        ]

        const actual = (new Pipeline).send('  VALUE  ').through(pipes).then(value => value)

        expect(actual).toBe('VALUE')
    })

    test('it throws an exception if pipe is not a function', () => {
        const pipes = [
            'foobar'
        ]

        expect(() => {
            (new Pipeline).send('VALUE').through(pipes).then(value => value)
        }).toThrow(Error)
    })
})
