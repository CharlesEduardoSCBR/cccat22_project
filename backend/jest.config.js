const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.ts",

  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
};