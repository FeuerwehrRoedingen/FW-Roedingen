import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/tests'
  ],
  testEnvironment: 'node',
  testMatch: [
    `**/__tests__/**/*.+(ts|tsx|js)`,
    `**/?(*.)+(spec|test).+(ts|tsx|js)`
  ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: './tsconfig.test.json'
    }]
  }
};

export default config;
