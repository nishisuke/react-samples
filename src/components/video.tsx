import { useEffect, useRef, VFC } from "react";

interface Props {
  stream: MediaStream;
}

export const Video: VFC<Props> = ({ stream }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.srcObject = stream;
  }, [stream]);
  return <video ref={ref} autoPlay />;
};
