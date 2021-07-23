import { ChangeEvent, useRef, useState, VFC } from "react";

import { Video } from "components/video";
import { getRemoteStreams, getMedia, leaveRoom, joinRoom } from "infra/web_rtc";

export const WebRtc: VFC = () => {
  const remoteUpdatedAtState = useState(Date.now());
  const ref = useRef<HTMLVideoElement>(null);
  const [chan, setChan] = useState("sample-channel");

  const join = () => {
    if (chan.length === 0) {
      alert("Input channel name plz");
      return;
    }
    joinRoom(
      chan,
      () => remoteUpdatedAtState[1](Date.now()),
      (e: Error) => alert(e.message)
    );
  };
  const start = async () => {
    const localStream = await getMedia();
    const videoElm = ref.current;
    if (!videoElm) {
      throw new Error("TODO: msg");
    }
    videoElm.srcObject = localStream;
  };

  return (
    <div>
      <input
        value={chan}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setChan(e.target.value)}
      />
      <video ref={ref} autoPlay />
      {getRemoteStreams().map((v) => (
        <Video key={v.peerId} stream={v} />
      ))}
      <button onClick={start}>video preview start</button>
      <button onClick={join}>join</button>
      <button onClick={leaveRoom}>stop video (leave)</button>
    </div>
  );
};
