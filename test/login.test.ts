import { describe, it, expect } from "vitest";

describe("login route", () => {
  it("when successfull logged in", async () => {
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
    expect(result.success).toBe(true);
    expect(result).toMatchInlineSnapshot(`
      {
        "message": "Login successful.",
        "success": true,
        "user": {
          "userEmail": "test11@gmail.com",
          "userId": "65e2b9820d04837dfc58f1a9",
          "userName": "test",
        },
      }
    `);
  });

  it("when logged in failed", async () => {
    const testEmail = "test1@gmail.com";
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
    expect(result.success).toBe(false);
    expect(result).toMatchInlineSnapshot(`
      {
        "message": "Unauthorized User.",
        "success": false,
      }
    `);
  });
});
