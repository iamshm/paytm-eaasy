import { deleteAuthorizationToken } from "../apis";

const useAuthentication = () => {
  const hasToken = !!localStorage.getItem("token");

  const logout = () => {
    deleteAuthorizationToken();

    window.location.reload();
  };

  return {
    hasToken,
    logout,
  };
};

export default useAuthentication;
