import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("full app rendering/navigating", async () => {
  render(<App />, { wrapper: BrowserRouter });

  expect(screen.getByText(/Home/)).toBeInTheDocument();
  expect(screen.getByText(/About/)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("About");
});
