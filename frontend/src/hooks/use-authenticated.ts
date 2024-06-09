import { deleteAuthorizationToken } from "../apis";

const useAuthentication = () => {
  const hasToken = !!localStorage.getItem("token");

  const logout = () => {
    deleteAuthorizationToken();

    window.location.replace("/");
  };

  return {
    hasToken,
    logout,
  };
};

export default useAuthentication;
