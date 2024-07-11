// ProfileDetails.tsx
"use client"
import Link from "next/link";
import Button from "../button/Button";
import { signOut } from "next-auth/react";
import useProfileDetails from "./useProfileDetails";

type ProfileDetailProps = {
  name: string | undefined;
  email: string | undefined;
};

const ProfileDetails = ({ name, email }: ProfileDetailProps) => {
  const {getInitials}=useProfileDetails();

  return (
    <div className="max-w-md mx-auto shadow-md rounded-lg overflow-hidden">
      <header className="px-6 py-4 bg-gray-100">
        <Button
          onClick={() =>
            signOut({
              redirect: true,
              callbackUrl: `${window.location.origin}/`,
            })
          }
          text="Logout"
          width="200px"
         
        />
      </header>
      <div className="px-6 py-4">
        <div className="flex items-center justify-center">
          <div style={{filter:"drop-shadow(10px 9px 10px rgba(20, 78, 227, 0.38))"}} className="rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold bg-brand_primary_blue p-20 text-white">
            <span>{getInitials(name)}</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className="font-semibold mr-2">Name:</div>
            <div>{name}</div>
          </div>
          <div className="flex items-center">
            <div className="font-semibold mr-2">Email:</div>
            <div>{email}</div>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/profile/edit">
            <Button text="Edit" width="full" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
