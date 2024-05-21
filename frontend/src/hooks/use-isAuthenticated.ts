const useIsAuthenticated = () => {
  const hasToken = !!localStorage.getItem("token");

  return hasToken;
};

export default useIsAuthenticated;
