import Pusher, { Channel } from "pusher-js";
import { useEffect, useRef, useState, VFC } from "react";

interface Props {
  chan: Channel;
}
interface Message {
  text: string;
  createdAt: Date;
}
interface MessageData {
  message: string;
}

const pusher = new Pusher("d380e668bc16de80de97", {
  cluster: "ap3",
});
const chanName = "my-channel";
const evName = "my-event";
const initMsgs: Message[] = [
  {
    text: "Hi!",
    createdAt: new Date("2021-07-07 13:30"),
  },
];

export const Realtime: VFC = () => {
  const ref = useRef<Channel>(pusher.subscribe(chanName));

  useEffect(() => {
    return () => ref.current.unsubscribe();
  }, []);

  return <Messages chan={ref.current} />;
};
const createMessage = (text: string): Message => ({
  text,
  createdAt: new Date(),
});

const Messages: VFC<Props> = ({ chan }) => {
  const [messages, setMessages] = useState(initMsgs);
  const [readAt] = useState(new Date());

  useEffect(() => {
    if (!chan) return () => {};
    const cb = (data: MessageData) =>
      setMessages((b) => [...b, createMessage(data.message)]);
    chan.bind(evName, cb);
    return () => chan.unbind(evName, cb);
  }, [chan]);

  const unreadCount = messages.filter((m) => m.createdAt > readAt).length;

  return (
    <div>
      unread count: {unreadCount}
      {messages.map((m, i) => (
        <div key={i}>
          {m.createdAt > readAt && "New! "}
          {m.text}
        </div>
      ))}
    </div>
  );
};
