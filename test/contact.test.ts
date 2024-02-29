import { describe, it, expect } from "vitest";

describe("Contact Route", () => {
  it("hit the api", async () => {
    const response = await fetch("http://localhost:5000/api/get-contact-registered-email");
    const result = await response.json();
    // const totalResults = result.result.length;
    expect(result).toBeDefined();
    // expect(result.result).toHaveLength(totalResults);
  });
});
