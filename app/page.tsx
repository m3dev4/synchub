import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="text-3xl font-bold">
      page
      <Image
        src="/images/logo.png"
        alt="Vercel Logo"
        width={50}
        height={24}
        className="rounded-full"
      />
    </div>
  );
};

export default page;
