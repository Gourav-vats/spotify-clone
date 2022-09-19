import React from "react";
import Image from "next/image";

const Modal = ({ message, close }) => {
  return (
    <>
      <div className="w-full">
        <div
          className="z-30 fixed block inset-0 bg-white bg-opacity-50 overflow-y-auto h-full w-full"
          id="modal"
        >
          {/* <!--modal content--> */}
          <div className="z-40 relative top-20 mx-auto p-10 border w-96 mobile:w-72 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center font-semibold font-mono tracking-wider">
              {message && (
                <>
                  <div className="text-center">
                    <Image src="/spotifyHeader.jpg" width={150} height={70} />
                  </div>

                  <h3 className="text-lg mb-8">{message}</h3>
                  <p>Premium Account required for controlling nearby devices</p>
                  <button
                    type="button"
                    className="border py-2 px-4 mt-4 rounded-full bg-[#1ed760] font-semibold font-mono tracking-wider leading-10"
                    onClick={close}
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
