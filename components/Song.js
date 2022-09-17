import React from "react";
import millisToMinutesAndSeconds from "../lib/time";

const Song = ({ order, track }) => {
  console.log(typeof millisToMinutesAndSeconds);
  return (
    <div className="grid grid-cols-2 text-sm xl:text-base text-gray-400 hover:bg-gray-900 rounded-lg cursor-pointer py-3 px-2">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.track.album.images[0].url} />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
