import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Center = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-grow text-white">
      <h1>I am Center</h1>
      <header>
        <div>
          <Image
            className="rounded-full"
            src={session?.user.image ? session.user.image : "/profileImg.jpg"}
            alt=""
            width={50}
            height={50}
          />
        </div>
      </header>
    </div>
  );
};

export default Center;
