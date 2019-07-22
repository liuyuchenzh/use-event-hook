import React from "react";
import { EventEffectOption } from "./interface";

interface MonoEffectOption extends EventEffectOption {
  uid: string;
}

interface MonoCache {
  [uid: string]: {
    flag: boolean;
    list: Array<(e: Event, ...args: any[]) => any>;
    listener: EventListenerOrEventListenerObject;
  };
}

const monoCache: MonoCache = {};

export function useMonoEffect(option: MonoEffectOption) {
  const { uid, target, eventName, deps = [], effects } = option;
  React.useEffect(() => {
    if (!target) {
      return;
    }
    const hasDeclared: boolean = uid in monoCache;
    if (!hasDeclared) {
      monoCache[uid] = {
        flag: false,
        list: [],
        listener: () => void 0
      };
    }
    // always push to callback list
    monoCache[uid].list.push(effects);
    // add listener when there is none
    if (!monoCache[uid].flag) {
      const listener = (e: Event) => {
        monoCache[uid].list.forEach(cb => {
          if (typeof cb === "function") {
            cb(e, ...deps);
          }
        });
      };
      monoCache[uid].listener = listener;
      target.addEventListener(eventName, listener);
      monoCache[uid].flag = true;
    }
    return () => {
      const { listener, list } = monoCache[uid];
      monoCache[uid].list = list.filter(cb => cb !== effects);
      if (!monoCache[uid].list.length) {
        target.removeEventListener(eventName, listener);
        monoCache[uid].flag = false;
      }
    };
  }, deps);
}
