import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { shuffle } from "lodash";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    const selectedColor = shuffle(colors).pop();
    setColor(selectedColor);
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("something went wrong ", err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center space-x-4 p-1 px-2 opacity-90 hover:opacity-80 rounded-full cursor-pointer bg-black text-white"
          onClick={() => signOut()}
        >
          <Image
            className="rounded-full"
            src={session?.user.image ? session.user.image : "/profileImg.jpg"}
            alt=""
            width={30}
            height={30}
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex flex-col bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <div className="top-5 left-8 text-white text-2xl md:text-3xl xl:text-5xl font-bold mb-4">
          <p>Good Evening</p>
        </div>
        <div className="flex items-end space-x-7">
          <img
            src={playlist?.images?.[0]?.url}
            className="h-56 w-56 shadow-2xl"
          />
          <div>
            <p>Playlist</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playlist?.name}
            </h1>
          </div>
        </div>
      </section>
      <Songs />
    </div>
  );
};

export default Center;
