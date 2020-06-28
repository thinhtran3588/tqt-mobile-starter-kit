module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: '@testing-library/react-native',
  testPathIgnorePatterns: ['__tests__/utils/'],
  setupFilesAfterEnv: ['./jest.setup-test.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
