import React, { useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import millisToMinutesAndSeconds from "../lib/time";
import Modal from "./Modal";

const Song = ({ order, track }) => {
  const spotifyApi = useSpotify();
  const [currentTrackId, setcurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [premiumReq, setPremiumReq] = useState(false);
  const [modalMsg, setModalMsg] = useState();

  const playSong = () => {
    setcurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.track.uri],
      })
      .catch((err) => {
        console.log(err.body);
        if (err.body.error.reason === "PREMIUM_REQUIRED") {
          setPremiumReq(true);
          setModalMsg(err?.body?.error?.reason);
        }
      });
  };

  const handleClose = () => {
    setPremiumReq(false);
  };

  return (
    <>
      <div className="text-black">
        {premiumReq && <Modal message={modalMsg} close={handleClose} />}
      </div>

      <div
        className="grid grid-cols-2 text-sm xl:text-base text-gray-400 hover:bg-[#27272a] rounded-lg cursor-pointer py-3 px-2"
        onClick={() => playSong()}
      >
        <div className="flex items-center space-x-4">
          <p>{order + 1}</p>
          <img className="h-10 w-10" src={track.track.album.images[0].url} />
          <div>
            <p className="w-36 lg:w-64 truncate text-white">
              {track.track.name}
            </p>
            <p className="w-40">{track.track.artists[0].name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="w-40 hidden md:inline">{track.track.album.name}</p>
          <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
      </div>
    </>
  );
};

export default Song;
