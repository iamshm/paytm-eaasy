import { Navigate, Route, Routes } from "react-router-dom";
import useAuthentication from "./hooks/use-authenticated";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import Send from "./pages/Send";
import AntiAuth from "./components/AntiAuth";
import UserContextProvider from "./context/User";

const App = () => {
  const { hasToken } = useAuthentication();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={hasToken ? "/dashboard" : "/signin"} />}
      />

      <Route element={<AntiAuth />}>
        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route
          path="/dashboard"
          element={
            <UserContextProvider>
              <Dashboard />
            </UserContextProvider>
          }
        />

        <Route
          path="/send/:toUserId"
          element={
            <UserContextProvider>
              <Send />
            </UserContextProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
