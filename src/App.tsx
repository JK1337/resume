import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TopMenubar } from "./components/layout/TopMenubar";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { MyResumePage } from "./pages/MyResumePage";
import { BrowseJobsPage } from "./pages/BrowseJobsPage";
import { PlayToLearnPage } from "./pages/PlayToLearnPage";
import { SignUpPage } from "./pages/SignUpPage";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="flex h-[100dvh] flex-col bg-slate-950 text-slate-100">
        <TopMenubar />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/browse-jobs" replace />}
            />
            <Route path="/browse-jobs" element={<BrowseJobsPage />} />
            <Route
              path="/browse-roles"
              element={<Navigate to="/browse-jobs" replace />}
            />
            <Route path="/play-to-learn" element={<PlayToLearnPage />} />
            <Route path="/resume" element={<MyResumePage />} />
            <Route
              path="/my-resume"
              element={<Navigate to="/resume" replace />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/account"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="*"
              element={<Navigate to="/browse-jobs" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
