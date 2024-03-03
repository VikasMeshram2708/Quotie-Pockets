import { describe, it, expect } from "vitest";

describe("Contact Us API", () => {
  it("when email is already in use", async () => {
    const data = {
      name: "test",
      email: "test11@gmail.com",
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
    expect(result).toMatchSnapshot();
  });
});
