import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  resolver: "jest-ts-webcompat-resolver",
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch)', 
    '/node_modules'
  ]
}

export default jestConfig