const { compilerOptions: { paths } } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
  cacheDirectory: '.jest-cache',
	coverageDirectory: '.jest-coverage',
	setupFilesAfterEnv: ['./jest.setup.js'],
  coveragePathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/lib/'],
  coverageReporters: ['html', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
	testPathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/lib/'],
	moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' })
};
