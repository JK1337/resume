import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const navClass =
  "rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";
const navActiveClass = "bg-violet-50 text-violet-800 hover:bg-violet-100 hover:text-violet-900";

export function TopMenubar() {
  const session = useAuthStore((s) => s.session);
  const logoSrc = `${import.meta.env.BASE_URL}qme-logo.png`;

  return (
    <header className="z-20 shrink-0 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6">
        <NavLink
          to="/browse-roles"
          className="flex shrink-0 items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 rounded"
          aria-label="Q me home"
        >
          <img
            src={logoSrc}
            alt="Q me"
            className="h-9 w-auto object-contain sm:h-10"
            width={120}
            height={40}
          />
        </NavLink>

        <nav
          className="flex flex-wrap items-center justify-end gap-1 sm:gap-2"
          aria-label="Main"
        >
          <NavLink
            to="/browse-roles"
            className={({ isActive }) =>
              `${navClass} ${isActive ? navActiveClass : ""}`
            }
          >
            Browse Roles
          </NavLink>
          <NavLink
            to="/play-to-learn"
            className={({ isActive }) =>
              `${navClass} ${isActive ? navActiveClass : ""}`
            }
          >
            Play to Learn
          </NavLink>
          <NavLink
            to="/my-resume"
            className={({ isActive }) =>
              `${navClass} ${isActive ? navActiveClass : ""}`
            }
          >
            My Resume
          </NavLink>
          {session ? (
            <NavLink
              to="/account"
              className={({ isActive }) =>
                `${navClass} ${isActive ? navActiveClass : ""}`
              }
            >
              Account
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navClass} ${isActive ? navActiveClass : ""}`
              }
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
