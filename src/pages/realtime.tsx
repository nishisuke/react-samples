import { useEffect, useMemo, useRef, useState, VFC } from "react";

import { Subscription, getSubscription, unsubscribe } from "infra/web_socket";
import { Message } from "interfaces/message";

const chanName = "my-channel";
const evName = "my-event";

export const Realtime: VFC = () => {
  const ref = useRef<Subscription>(getSubscription(chanName));
  useEffect(() => {
    return () => unsubscribe(chanName);
  }, []);
  return <Messages subscription={ref.current} />;
};

interface Props {
  subscription: Subscription;
}
const Messages: VFC<Props> = ({ subscription }) => {
  const [readAt, setReadAt] = useState(new Date());
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi!",
      createdAt: new Date("2021-07-07 13:30"),
    },
  ]);

  useEffect(() => {
    const cb = ({ message }: { message: string }) =>
      setMessages((b) => [...b, { text: message, createdAt: new Date() }]);
    subscription.bind(evName, cb);
    return () => subscription.unbind(evName, cb);
  }, [subscription]);

  const unreadCount = useMemo(
    () => messages.filter((m) => m.createdAt > readAt).length,
    [messages, readAt]
  );

  const read = () => setReadAt(new Date());

  return (
    <div>
      <p>unread count: {unreadCount}</p>
      <button onClick={read}>既読にする</button>
      {messages.map((m, i) => (
        <div
          key={i}
          style={{ color: m.createdAt > readAt ? "red" : "inherit" }}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
};
