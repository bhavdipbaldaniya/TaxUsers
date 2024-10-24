// "use client";
import dynamic from "next/dynamic";
import React from "react";

const AddHousehold = dynamic(() => import("./Component/AddHousehold"), {
  ssr: false,
});

export const metadata = {
  title: "Add household",
};
const page = () => {
  return (
    <>
      <AddHousehold />
    </>
  );
};

export default page;
