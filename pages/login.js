import React from "react";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  const { spotify } = providers;
  return (
    <>
      <div className="divide-y divide-lime-500">
        <div className="text-center">
          <Image src="/spotifyHeader.jpg" width={230} height={100} />
        </div>
        <div className="text-center">
          <button
            onClick={() => signIn(spotify.id, { callbackUrl: "/" })}
            className="border py-2 px-4 my-16 rounded-full bg-[#1ed760] font-semibold font-mono tracking-wider leading-10"
          >
            Login with Spotify
          </button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default Login;
