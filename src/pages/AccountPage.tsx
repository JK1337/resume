import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function AccountPage() {
  const session = useAuthStore((s) => s.session);
  const logOut = useAuthStore((s) => s.logOut);
  const navigate = useNavigate();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  function handleLogOut() {
    logOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
          Account
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Signed in as{" "}
          <span className="font-medium text-slate-900">{session.name}</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Email:{" "}
          <span className="font-medium text-slate-900">{session.email}</span>
        </p>

        <section className="mt-8 border-t border-slate-200 pt-8" aria-label="Session">
          <h2 className="text-sm font-semibold text-slate-900">Session</h2>
          <p className="mt-1 text-sm text-slate-600">
            Sign out on this device. You can log in again anytime.
          </p>
          <button
            type="button"
            onClick={handleLogOut}
            className="mt-4 w-full rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Log out
          </button>
        </section>
      </div>
    </div>
  );
}
