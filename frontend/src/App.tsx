import { Navigate, Route, Routes } from "react-router-dom";
import useIsAuthenticated from "./hooks/use-isAuthenticated";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageTemplate from "./components/PageTemplate";

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />}
      />

      <Route path="/signup" element={<Signup />} />

      <Route path="/signin" element={<Signin />} />

      <Route
        path="/dashboard"
        element={
          <PageTemplate>
            <Dashboard />
          </PageTemplate>
        }
      />

      <Route
        path="/send"
        element={
          <PageTemplate>
            <div>Send</div>
          </PageTemplate>
        }
      />
    </Routes>
  );
};

export default App;
