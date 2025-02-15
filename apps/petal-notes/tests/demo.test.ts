import { describe, test } from "vitest";

describe("demo test", () => {
  test("svelte is secure", ({ expect }) => {
    expect("https://svelte.dev/").toMatch(/^https:\/\//);
  });
});
