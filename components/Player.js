import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import Modal from "./Modal";

const Player = () => {
  const spotifyApi = useSpotify();
  const songInfo = useSongInfo();
  const { data: session } = useSession();
  const [currentTrackId, setcurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const [premiumReq, setPremiumReq] = useState(false);
  const [modalMsg, setModalMsg] = useState();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setcurrentTrackId(data.body?.item?.id);
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackIdState, spotifyApi, session]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data?.body?.is_playing) {
        spotifyApi.pause().catch((err) => {
          if (err.body.error.reason === "PREMIUM_REQUIRED") {
            setPremiumReq(true);
            setModalMsg(toString(err.body.error.reason));
          }
        });
        setIsPlaying(false);
      } else {
        spotifyApi.play().catch((err) => {
          if (err.body.error.reason === "PREMIUM_REQUIRED") {
            setPremiumReq(true);
            setModalMsg(err.body.error.reason);
          }
        });
        setIsPlaying(true);
      }
    });
  };

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {
        if (err.body.error.reason === "PREMIUM_REQUIRED") {
          setPremiumReq(true);
          setModalMsg(err?.body?.error?.reason);
        }
      });
    }, 500),
    []
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) debouncedAdjustVolume(volume);
  }, [volume]);

  const handleClose = () => {
    setPremiumReq(false);
  };

  return (
    <>
      {premiumReq && <Modal message={modalMsg} close={handleClose} />}

      <div className="h-20 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
        {/* Left */}
        <div className="flex items-center space-x-2">
          <img
            className="hidden md:inline h-12 w-12"
            src={songInfo?.album.images?.[0].url}
            alt=""
          />
          <div>
            <h3>{songInfo?.name}</h3>
            <p>{songInfo?.artists?.[0]?.name}</p>
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center justify-evenly">
          <SwitchHorizontalIcon className="button" />
          <RewindIcon className="button" />
          {isPlaying ? (
            <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
          ) : (
            <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
          )}
          <FastForwardIcon className="button" />
          <ReplyIcon className="button" />
        </div>

        {/* Right */}
        <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
          <VolumeDownIcon
            className="button"
            onClick={() => {
              if (volume - 10 >= 0) setVolume(volume - 10);
              else setVolume(0);
            }}
          />
          <input
            className="w-14 md:w-24"
            value={volume}
            type="range"
            onChange={(e) => setVolume(Number(e.target.value))}
            name="volume"
            id="volume"
            min={0}
            max={100}
          />
          <VolumeUpIcon
            className="button"
            onClick={() => {
              if (volume + 10 <= 100) setVolume(volume + 10);
              else setVolume(100);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Player;
