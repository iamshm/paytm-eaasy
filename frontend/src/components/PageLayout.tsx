import { ReactNode } from "react";
import Button from "./Button";
import useAuthentication from "../hooks/use-authenticated";

interface ElementProps {
  children: ReactNode;
}

const PageLayout = ({ children }: ElementProps) => {
  const { hasToken, logout } = useAuthentication();

  return (
    <div className="w-[100%] min-h-[100vh]">
      <div className="border-b-[1px] border-b-slate-400 px-10 py-6 bg-black text-white flex justify-between items-center">
        <p className="text-3xl font-bold">PaytmEasy</p>
        {hasToken && (
          <div className="w-fit">
            <Button onClick={logout}>Logout</Button>
          </div>
        )}{" "}
      </div>

      <div className="px-10 pt-6">{children}</div>
    </div>
  );
};

export default PageLayout;
