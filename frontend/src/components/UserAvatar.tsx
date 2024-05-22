interface ElementProps {
  name: string;
}

const UserAvatar = ({ name }: ElementProps) => {
  const getInitials = () => {
    const [firstName, lastName = ""] = name.split(" ");

    return `${firstName[0]}${lastName[0]}`;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="font-bold h-10 w-10 rounded-full bg-black text-white text-sm flex items-center justify-center">
        {getInitials()}
      </div>

      <p>{name}</p>
    </div>
  );
};

export default UserAvatar;
