import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchMe from "../apis/fetch-me";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  balance: number;
}

const UserContext = createContext<CurrentUser>({
  id: "",
  name: "",
  email: "",
  balance: 0,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser>();

  const [isLoading, setIsLoading] = useState(false);

  const onFetchMe = async () => {
    const resMe = await fetchMe();

    setUser(resMe);
  };

  useEffect(() => {
    setIsLoading(true);

    onFetchMe();

    setIsLoading(false);
  }, []);

  if (isLoading || !user?.id) return <div>Loading...</div>;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export const useUserContext = () => {
  const user = useContext(UserContext);

  return user;
};
