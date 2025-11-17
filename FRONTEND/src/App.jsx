import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthInit } from "./hooks/useAuthInit";
import { ProtectedRoute, PublicRoute } from "./routes/ProtectedRoute";
import { MainLayout, AuthLayout, DashboardLayout } from "./layouts";
import { LoadingScreen } from "./components/ui";
import { ROUTES } from "./constants";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const GithubCallbackPage = lazy(() => import("./pages/GithubCallbackPage"));

const App = () => {
  useAuthInit();

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes with main layout */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
          </Route>

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute restricted>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                <PublicRoute restricted>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.GITHUB_CALLBACK}
              element={<GithubCallbackPage />}
            />
          </Route>

          {/* Protected routes */}
          <Route element={<DashboardLayout />}>
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
