// form_connex.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Login from "./form_connex";
import { login } from "../services/authService";

// 🔹 Mock du service login
vi.mock("../services/authService", () => ({
  login: vi.fn(),
}));

// 🔹 Mock de useNavigate pour tester la redirection
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // reset des mocks avant chaque test
  });

  it("affiche correctement les champs email et mot de passe", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/adresse email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByText(/se connecter/i)).toBeInTheDocument();
  });

  it("permet de saisir email et mot de passe", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/adresse email/i);
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i);

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@test.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("appelle login lors de la soumission du formulaire", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/adresse email/i);
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
    const submitButton = screen.getByText(/se connecter/i);

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "password123",
      });
    });
  });
  
it("permet de basculer l'affichage du mot de passe", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
  const toggleButton = screen.getByTestId("toggle-password");

  // par défaut, type password
  expect(passwordInput.type).toBe("password");

  // clic → type text
  fireEvent.click(toggleButton);
  expect(passwordInput.type).toBe("text");

  // clic à nouveau → type password
  fireEvent.click(toggleButton);
  expect(passwordInput.type).toBe("password");
});


  it("redirige après un login réussi", async () => {
    login.mockResolvedValueOnce({}); // simuler login réussi

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/adresse email/i);
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
    const submitButton = screen.getByText(/se connecter/i);

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/home");
    });
  });
});
