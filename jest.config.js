module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  reporters: ["default", "jest-junit"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
};
