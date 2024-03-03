import { describe, it, expect } from "vitest";

describe("login route", () => {
  it("Login api", async () => {
    const testEmail = "test11@gmail.com";
    const testPassword = "tests";
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      expect(result.success).toBe(false);
    }
    expect(result.success).toBe(true);
  });
});
