import Pusher from "pusher-js";

export interface Subscription {
  bind: (name: string, cb: Function) => void;
  unbind: (name: string, cb: Function) => void;
}

let pusher: Pusher | null;
const key = process.env.REACT_APP_PUSHER_KEY || "";

const getPusher = (): Pusher => {
  if (pusher) return pusher;
  const p = new Pusher(key, {
    cluster: "ap3",
  });
  pusher = p;
  return p;
};

export const getSubscription = (name: string): Subscription => {
  const p = getPusher();
  const chan = p.channel(name);
  return chan ? chan : p.subscribe(name);
};

export const unsubscribe = (name: string): void =>
  getPusher().unsubscribe(name);
