import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player = () => {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session } = useSession();
  const [currentTrackId, setcurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  return (
    <div>
      {/* Left */}
      <div>
        <img src={songInfo?.album.images?.[0].url} alt="" />
      </div>
    </div>
  );
};

export default Player;
