import { Suspense, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from "react-router-dom";
import "@/App.css";
import HomePage from "@/pages/HomePage";
import BrandPage from "@/pages/BrandPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { AuthProvider } from "@/lib/auth";
import RequireAdmin from "@/components/admin/RequireAdmin";
import IntroLoader from "./components/site/IntroLoader";
import AppLoader from "./components/site/AppLoader";

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="App">
      <AuthProvider>
        {/* <BrowserRouter> */}
        <HashRouter>
          <IntroLoader onFinish={() => setIntroFinished(true)} />

          <div
            className={`transition-all duration-700 ease-out ${
              introFinished
                ? "opacity-100 translate-y-0 blur-0"
                : "opacity-0 translate-y-3 blur-sm"
            }`}
          >
            <Suspense fallback={<AppLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/brand/:slug" element={<BrandPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={
                    <RequireAdmin>
                      <AdminDashboardPage />
                    </RequireAdmin>
                  }
                />
                <Route
                  path="/admin/*"
                  element={<Navigate to="/admin" replace />}
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>
        </HashRouter>
        {/* </BrowserRouter> */}
      </AuthProvider>
    </div>
  );
}

export default App;
