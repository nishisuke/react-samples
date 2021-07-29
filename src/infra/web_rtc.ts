import Peer, { RoomStream, SfuRoom } from "skyway-js";

let remoteStreams: RoomStream[] = [];
let localStream: MediaStream | null = null;
let peer: Peer | null = null;
let room: SfuRoom | null = null;

const key = process.env.REACT_APP_SKYWAY_KEY || "";

export const getRemoteStreams = () => remoteStreams;
export const getMedia = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  return localStream;
};
export const openPeer = (onOpen: () => void, onError: (e: Error) => void) => {
  if (peer && peer.open) {
    onOpen();
    return;
  } else if (peer) {
    peer.on("open", () => onOpen());
  } else {
    const p = new Peer({ key });
    p.on("open", () => onOpen());
    p.on("error", onError);
    peer = p;
  }
};
export const leaveRoom = () => {
  room?.close();
  resetLocal();
};

export const joinRoom = (
  roomName: string,
  onRemoteStreamChanged: () => void,
  onError: (e: Error) => void
) => {
  const onOpen = () => {
    if (!peer) throw new Error("TODO: msg");
    if (!localStream) throw new Error("TODO: msg");

    room = peer.joinRoom<SfuRoom>(roomName, {
      mode: "sfu",
      stream: localStream,
    });

    room.on("stream", (stream: RoomStream) => {
      remoteStreams.push(stream);
      onRemoteStreamChanged();
    });
    room.on("peerLeave", (peerId: string) => {
      const removed = remoteStreams.find((s) => s.peerId === peerId);
      if (removed) inactivateStream(removed);

      remoteStreams = remoteStreams.filter((s) => s.peerId !== peerId);
      onRemoteStreamChanged();
    });
    room.once("close", () => {
      remoteStreams.forEach(inactivateStream);
      remoteStreams = [];
      room = null;
      resetLocal();
    });
  };
  openPeer(onOpen, onError);
};
const resetLocal = () => {
  if (localStream) inactivateStream(localStream);
  localStream = null;

  destroyPeer();
};
const destroyPeer = () => {
  peer?.destroy();
  peer = null;
};
const inactivateStream = (media: MediaStream) => {
  const tracks = media.getTracks();

  tracks.forEach((track: MediaStreamTrack) => {
    track.stop();
  });
};
