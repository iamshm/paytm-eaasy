import { useEffect, useState } from "react";
import fetchUsers from "../apis/fetch-users";
import PageLayout from "../components/PageLayout";
import UserAvatar from "../components/UserAvatar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/User";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const me = useUserContext();

  const [usersList, setUsersList] = useState<User[]>([]);

  const onFetchUsers = async () => {
    const res = await fetchUsers();

    const users = res.data as User[];

    const filteredUsers = users.filter((user) => user.id !== me?.id);

    setUsersList(filteredUsers);
  };

  useEffect(() => {
    setIsLoading(true);

    onFetchUsers();

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSendMoney = (toUserId: string) => {
    navigate(`/send/${toUserId}`);

    return;
  };

  return (
    <PageLayout>
      <div className="flex flex-col gap-4 w-full">
        <div className="pb-3 mb-3 flex items-center justify-between border-b-2 border-b-slate-400">
          <p className="text-2xl font-semibold">{me?.name}</p>

          <p className="text-2xl font-semibold">{`My Balance : Rs ${me?.balance || 0}`}</p>
        </div>

        {isLoading
          ? "Loading"
          : usersList.map((user, index) => {
              return (
                <div key={index} className="flex items-center justify-between">
                  <UserAvatar name={user.name!} />

                  <div className="w-[200px]">
                    <Button onClick={() => onSendMoney(user.id)}>
                      Send Money
                    </Button>
                  </div>
                </div>
              );
            })}
      </div>
    </PageLayout>
  );
};

export default Dashboard;
