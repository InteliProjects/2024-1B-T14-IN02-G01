module.exports = {
    testEnvironment: 'node',
    // setupFilesAfterEnv: ['tests/setup.js'],
    testMatch: ['**/__tests__/**/*.test.js', '**/?(*)+(spec|test).js?(x)'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^api/models/HaveDog$': '<rootDir>/test/mocks/HaveDog.js'
    }
}