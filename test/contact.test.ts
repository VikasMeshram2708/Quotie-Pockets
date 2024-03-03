import { describe, it, expect } from "vitest";

describe("Contact Us API", () => {
  it("when email is already in use", async () => {
    const data = {
      name: "test",
      email: "test11@gmail.com", // insert email which is already in use
      message: "test message",
    };
    const response = await fetch("http://localhost:5000/api/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    expect(result.success).toBe(false);
    expect(result).toMatchInlineSnapshot(`
      {
        "message": "Email already in use.",
        "success": false,
      }
    `);
  });
});
