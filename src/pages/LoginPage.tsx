import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function LoginPage() {
  const session = useAuthStore((s) => s.session);
  const logIn = useAuthStore((s) => s.logIn);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(() => searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (session) {
    return <Navigate to="/browse-roles" replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const result = logIn(email, password);
    if (result === "ok") {
      navigate("/browse-roles", { replace: true });
      return;
    }
    if (result === "no_account") {
      navigate(
        `/sign-up?email=${encodeURIComponent(email.trim())}&from=login`,
        { replace: true }
      );
      return;
    }
    setError("Incorrect password. Try again or create an account.");
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          Log in
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          No account yet? You’ll be sent to create one if your email isn’t
          registered.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          <div>
            <label
              htmlFor="login-password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          <Link
            to={`/sign-up${email ? `?email=${encodeURIComponent(email.trim())}` : ""}`}
            className="font-medium text-violet-700 hover:text-violet-600"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
