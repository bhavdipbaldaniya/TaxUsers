// "use client";
import dynamic from "next/dynamic";
import React from "react";

const UserProfile = dynamic(() => import("./Component/UserProfile"), {
  ssr: false,
});
export const metadata = {
  title: "Add household",
};
const page = () => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export default page;
