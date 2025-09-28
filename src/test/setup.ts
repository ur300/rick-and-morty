/// <reference types="vitest" />
import "@testing-library/jest-dom";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Make vi available globally
(globalThis as any).vi = vi;
