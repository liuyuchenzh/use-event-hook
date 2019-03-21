import { useEffect } from "react";
import { EventEffectOption } from "./interface";

interface SwitchEffectOption extends EventEffectOption {
  switchKey: any;
}

export function useSwitchEffect(option: SwitchEffectOption) {
  const { target, eventName, effects, deps = [], switchKey } = option;
  useEffect(() => {
    const listener = (e: Event) => {
      effects(e, ...deps);
    };
    if (switchKey) {
      target.addEventListener(eventName, listener);
    } else {
      target.removeEventListener(eventName, listener);
    }
    // always remove listener
    return () => {
      target.removeEventListener(eventName, listener);
    };
  }, deps);
}
