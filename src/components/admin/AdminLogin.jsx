import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { usePortfolio } from "../../lib/portfolio-store";

export default function AdminLogin() {
  const { login, isAdmin, hydrated } = usePortfolio();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && isAdmin) navigate({ to: "/admin/dashboard" });
  }, [hydrated, isAdmin, navigate]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError("Enter both the username and the password.");
      return;
    }
    if (login(username, password)) {
      setError("");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Those demo credentials did not match. Try admin / admin123.");
    }
  };

  return (
    <main className="surface-dark grid-pattern flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-royal font-mono text-sm font-bold text-primary-foreground">
            PA
          </span>
          <span className="text-base font-bold tracking-tight text-navy-foreground">Prospera Arcon LLP</span>
        </Link>

        <div className="card-base p-6 sm:p-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage Prospera Arcon Portfolio</p>

          <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
            <label className="block">
              <span className="field-label">Email / Username</span>
              <input
                className="field"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <input
                className="field"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <button type="submit" className="btn btn-primary w-full">
              Sign in
            </button>
          </form>

          <p className="mt-5 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
            Demo authentication only — no backend or database. Username <span className="font-mono font-semibold">admin</span>,
            password <span className="font-mono font-semibold">admin123</span>.
          </p>

          <Link to="/" className="mt-4 inline-block text-sm font-semibold text-royal hover:underline">
            ← Back to website
          </Link>
        </div>
      </div>
    </main>
  );
}
