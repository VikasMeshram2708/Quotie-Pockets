import { describe, it, expect } from "vitest";

describe("Contact Route", () => {
  it("hit the api", async () => {
    const response = await fetch("http://localhost:5000/api/contact-us");
    const result = await response.json();
    console.log("res", result);
    // if (!response.ok) {
    //   const error = await response.text();
    //   expect(error).toMatch(/Error: Not Found/);
    //   return;
    // }
    // const result = await response.json();
    // expect(result).toBeDefined();
  });
});
