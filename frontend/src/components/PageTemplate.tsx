import { ReactNode, useEffect } from "react";
import useIsAuthenticated from "../hooks/use-isAuthenticated";
import { useNavigate } from "react-router-dom";

interface ElementProps {
  children: ReactNode;
}
const PageTemplate = ({ children }: ElementProps) => {
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>;
};

export default PageTemplate;
