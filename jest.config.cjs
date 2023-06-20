module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
