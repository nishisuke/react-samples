import Pusher from "pusher-js";

export interface Subscription {
  bind: (name: string, cb: Function) => void;
  unbind: (name: string, cb: Function) => void;
}

let pusher: Pusher | null;

const getPusher = (): Pusher => {
  if (pusher) return pusher;
  const p = new Pusher("d380e668bc16de80de97", {
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
