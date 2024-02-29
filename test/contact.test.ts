import { describe, it, expect } from "vitest";
const Users = [
  {
    id: 1,
    name: "test",
    email: "test1@gmail.com",
  },
  {
    id: 2,
    name: "test",
    email: "test2@gmail.com",
  },
];

const LoadUser = (userEmail) => {
  try {
    const result = Users.find((item) => item?.email === userEmail);
    return result;
  } catch (error) {
    return console.log("failed to get the user.");
  }
};

describe("Contact Route", () => {
  it("find users", () => {
    const users = LoadUser("test1@gmail.com");
    expect(users).toBeDefined();
  });

  it.fails("fails to find the user", () => {
    it("find users", () => {
      const users = LoadUser("test1@gmail.com");
      expect(users).toBeDefined();
    });
  });
});

console.log(LoadUser("test1@gmail.com"));
