module.exports = {
  preset: 'ts-jest',
  roots: ['src'],
  setupFiles: ['jest-prop-type-error'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testPathIgnorePatterns: ['node-modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/*.(test|spec).(ts|tsx)'],
}
