module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.js',
    '!**/node_modules/**',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
    '/__snapshots__/',
  ],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.js',
    '/__snapshots__/',
    'bin/index.ts',
    'bin/flagOptions.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {},
};
