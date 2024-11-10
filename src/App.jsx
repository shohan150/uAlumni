import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<ProfilePage />} path="/me" />
        </Route>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}
