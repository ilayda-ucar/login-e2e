import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// min 8, 1 lower, 1 upper, 1 digit, 1 special
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const errors = useMemo(() => {
    const e = {};
    if (!emailRegex.test(email)) e.email = "Geçerli bir email giriniz.";
    if (!strongPasswordRegex.test(password))
      e.password =
        "Şifre en az 8 karakter olmalı, büyük/küçük harf, sayı ve özel karakter içermeli.";
    if (!terms) e.terms = "Şartları kabul etmelisiniz.";
    return e;
  }, [email, password, terms]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!isValid) return;
    navigate("/success");
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label>
          <input
            data-cy="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, display: "block" }}
            placeholder="ornek@mail.com"
          />
          {errors.email && (
            <p data-cy="error-email" style={{ margin: "6px 0", color: "crimson" }}>
              {errors.email}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Şifre</label>
          <input
            data-cy="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, display: "block" }}
            placeholder="Strong şifre"
          />
          {errors.password && (
            <p data-cy="error-password" style={{ margin: "6px 0", color: "crimson" }}>
              {errors.password}
            </p>
          )}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              data-cy="terms"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Şartları kabul ediyorum
          </label>
        </div>

        <button data-cy="submit" type="submit" disabled={!isValid}>
          Login
        </button>

        <div data-cy="error-summary" style={{ marginTop: 12 }}>
          {Object.values(errors).map((msg) => (
            <p key={msg} data-cy="error-item" style={{ color: "crimson", margin: 0 }}>
              {msg}
            </p>
          ))}
        </div>
      </form>
    </div>
  );
}
