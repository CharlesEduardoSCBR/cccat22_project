const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ["<rootDir>/jest.config.setup.js"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/test/setupTests.ts"],
  maxWorkers: 1,
};