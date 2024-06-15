import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../src/mocks/server";

// Establish API mocking before all tests
beforeAll(() => {
  server.listen();
});
// Reset anh request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
});
// Clean up after the test are finished
afterAll(() => {
  server.close();
});
