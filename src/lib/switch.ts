import React from "react";
import { EventEffectOption } from "./interface";

interface SwitchEffectOption extends EventEffectOption {
  switchKey: any;
}

export function useSwitchEffect(
  useEffect: typeof React.useEffect,
  option: SwitchEffectOption
) {
  const { target, eventName, effects, switchKey, deps = [switchKey] } = option;
  useEffect(() => {
    if (!target) {
      return;
    }
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
