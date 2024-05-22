import { useEffect } from "react";
import useAuthentication from "../hooks/use-authenticated";
import { Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const { hasToken } = useAuthentication();

  const navigate = useNavigate();

  useEffect(() => {
    if (!hasToken) {
      navigate("/signin");
    }
  }, [hasToken, navigate]);

  if (!hasToken) return <></>;

  return <Outlet />;
};

export default RequireAuth;
