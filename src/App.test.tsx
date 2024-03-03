import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Testing App component", () => {
  it("testin all the texts in the app component", () => {
    render(<App />);

    expect(screen).toMatchSnapshot();
  });
});
