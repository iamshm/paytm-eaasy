import { useEffect } from "react";
import fetchUsers from "../apis/fetch-users";
import useIsAuthenticated from "../hooks/use-isAuthenticated";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("kjkjj");

      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const onFetchUsers = async () => {
    const res = await fetchUsers();

    console.log(res);
  };

  return <div onClick={onFetchUsers}>Dashboard</div>;
};

export default Dashboard;
