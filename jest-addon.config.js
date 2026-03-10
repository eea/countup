module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/src/?(*.)+(spec|test).[jt]s?(x)'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
  },
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5,
    },
  },
};
