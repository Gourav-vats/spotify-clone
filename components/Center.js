import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { colors } from "../utils/colors";
import { shuffle } from "lodash";

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState("");

  useEffect(() => {
    const selectedColor = shuffle(colors).pop();
    setColor(selectedColor);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-1 p-1 opacity-90 hover:opacity-80 rounded-full cursor-pointer bg-indigo-600 text-white">
          <Image
            className="rounded-full"
            src={session?.user.image ? session.user.image : "/profileImg.jpg"}
            alt=""
            width={32}
            height={32}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        hello
      </section>
    </div>
  );
};

export default Center;
