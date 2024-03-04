import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("find the heading", () => {
    render(<App />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("App");
  });
});
