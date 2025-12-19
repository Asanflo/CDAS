// Intro.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Intro from "./intro";

const MockLoginPage = () => <div>Login Page</div>;
const MockRegisterPage = () => <div>Register Page</div>;

describe("Intro Component", () => {

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("rend correctement l'image, le titre et les boutons", () => {
    render(
      <MemoryRouter>
        <Intro />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/Illustration diplômes/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Cameroon Diplomas Authentication System/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Se Connecter/i)).toBeInTheDocument();
    expect(screen.getByText(/S'inscrire/i)).toBeInTheDocument();
  });

  it("navigue vers la page login au clic sur Se Connecter", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<MockLoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Se Connecter/i));

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("navigue vers la page register au clic sur S'inscrire", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/register" element={<MockRegisterPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/S'inscrire/i));

    expect(screen.getByText("Register Page")).toBeInTheDocument();
  });
});
