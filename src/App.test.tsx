import React, { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const wrapper = ({ children }: { children: ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

test("full app rendering/navigating", async () => {
  render(<App />, { wrapper });

  expect(screen.getByText(/Home/)).toBeInTheDocument();
  expect(screen.getByText(/About/)).toBeInTheDocument();

  await userEvent.click(screen.getByText(/about/i));
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("About");
});
