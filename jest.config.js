module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/",
    //"/src/fake.spec.ts",
    // "/src/main/",
    // "/src/datatypes/",
    // "/src/params/",
    "/src/functions/",
    "/src/promises/",
  ],
  reporters: ["jest-spec-reporter"],
  maxConcurrency:1,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false
    },
  },
};