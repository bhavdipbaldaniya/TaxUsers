// "use client";
import dynamic from "next/dynamic";
import React from "react";

const Login = dynamic(() => import("./Component/Login"), {
  ssr: false,
});

const Details = dynamic(() => import("././Component/Details"), {
  ssr: false,
});
export const metadata = {
  title: "Login",
};
const page = () => {
  return (
    <>
      <Login />
      {/* <Register /> */}
      {/* <Details /> */}
    </>
  );
};

export default page;
