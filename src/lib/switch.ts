import { useEffect } from "react";
import { EventEffectOption } from "./interface";

interface SwitchEffectOption extends EventEffectOption {
  switchKey: any;
  async?: boolean;
}

export function useSwitchEffect(option: SwitchEffectOption) {
  const {
    target,
    eventName,
    effects,
    switchKey,
    deps = [switchKey],
    async = false
  } = option;
  useEffect(() => {
    if (!target) {
      return;
    }
    const listener = (e: Event) => {
      effects(e, ...deps);
    };
    const addEventListener = () => target.addEventListener(eventName, listener);
    const removeEventListener = () =>
      target.removeEventListener(eventName, listener);
    if (switchKey) {
      if (async) {
        Promise.resolve().then(addEventListener);
      } else {
        addEventListener();
      }
    } else {
      if (async) {
        Promise.resolve().then(removeEventListener);
      } else {
        removeEventListener();
      }
    }
    // always remove listener
    return () => {
      target.removeEventListener(eventName, listener);
    };
  }, deps);
}
