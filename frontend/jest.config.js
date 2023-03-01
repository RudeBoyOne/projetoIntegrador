module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  moduleFileExtensions: [
    'scss',
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
    'css',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  //   '^.+\\.css$': ['jest-transform-css', { modules: true }],
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
  //     '<rootDir>/fileTransformer.js',
  //   '\\.[jt]sx?$': 'babel-jest',
  // },
};

/** @type {import('jest').Config} */
const config = {
  verbose: true,
};

module.exports = config;
