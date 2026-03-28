import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TopMenubar } from "./components/layout/TopMenubar";
import { AccountPage } from "./pages/AccountPage";
import { LoginPage } from "./pages/LoginPage";
import { MyResumePage } from "./pages/MyResumePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
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
              element={<Navigate to="/browse-roles" replace />}
            />
            <Route
              path="/browse-roles"
              element={
                <PlaceholderPage
                  title="Browse Roles"
                  description="Explore roles that match your skills. Find a dream job for you."
                />
              }
            />
            <Route
              path="/play-to-learn"
              element={
                <PlaceholderPage
                  title="Play to Learn"
                  description="Practice and learn in a playful way.  Earn your credits to use your tools."
                />
              }
            />
            <Route path="/my-resume" element={<MyResumePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route
              path="*"
              element={<Navigate to="/browse-roles" replace />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
