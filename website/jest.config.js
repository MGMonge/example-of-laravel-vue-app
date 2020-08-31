module.exports = {
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.jsx?$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(babel-jest|jest-vue-preprocessor)/)'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/js/$1'
    },
    testMatch: [
        '<rootDir>/tests/**/*.spec.js'
    ],
    testURL: 'http://localhost/',
    setupFilesAfterEnv: [
        '<rootDir>/tests/bootstrap.js'
    ]
}