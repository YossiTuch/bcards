import { useSelector } from "react-redux";
import type { TRootState } from "../store/store";

const Profile = () => {
  const user = useSelector((state: TRootState) => state.userSlice.user);
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-4 text-2xl font-bold">
      <div className="my-10 flex h-full w-8/12 flex-col items-center gap-6 rounded-3xl bg-gray-100 p-20 shadow-2xl dark:bg-slate-800">
        {user?.isAdmin === true && (
          <h1 className="text-5xl">Welcome Back Admin!</h1>
        )}
        <img
          src={user?.image?.url}
          alt={user?.image?.alt}
          className="size-72 rounded-full"
        />
        <h1>
          Full Name: {user?.name.first} {user?.name.middle} {user?.name.last}
        </h1>
        <h1>Email: {user?.email}</h1>
        <h1>Phone: {user?.phone}</h1>
        <h1>Country: {user?.address.country} </h1>
        <h1>City: {user?.address.city} </h1>
        <h1>State: {user?.address.state} </h1>
        <h1>
          Street: {user?.address.street} {user?.address.houseNumber}
          {user?.address.zip}
        </h1>
        <h1>Is Business: {user?.isBusiness ? "Yes" : "No"} </h1>
      </div>
    </div>
  );
};
export default Profile;
