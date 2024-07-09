"use client";

import { useUserProfileQuery } from "@/redux/apiSlices/authApiSlice";
import CenterItem from "../ui/CenterItem";
import ProfilePicture from "../ui/ProfilePicture";
import moment from "moment";
import Link from "next/link";
import EditProfile from "./EditProfile";

export interface TUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
  isAdmin?: boolean;
  profile: TUserProfile;
}

export interface TUserProfile {
  id: string;
  userId: string;
  age: number;
  bio: string;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

function Profile() {
  const { data, isLoading } = useUserProfileQuery(null);
  const userData = data?.data as TUser;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <CenterItem>
      <div className="text-center">
        <h1 className="form-title">Profile</h1>
        <p className="my-8">
          “&nbsp;<em>{userData?.profile?.bio}</em>&nbsp;”
        </p>
        <ProfilePicture photoUrl={userData?.profile?.photoUrl} />
        <p>
          {userData?.name} | {userData?.profile?.age}
        </p>
        <p>{userData?.email}</p>
        <p>Joined {moment(userData?.createdAt).fromNow()}</p>
        <Link href="/dashboard/user/change-password" className="text-cyan-500">
          <p className="my-4 ">🔑 Change Password 🔑</p>
        </Link>
        <EditProfile payload={userData} />
      </div>
    </CenterItem>
  );
}

export default Profile;
