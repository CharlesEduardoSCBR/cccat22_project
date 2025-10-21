const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  transform: {
    ...tsJestTransformCfg,
  },
  maxWorkers: 1,
};