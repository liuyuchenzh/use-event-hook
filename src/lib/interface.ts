export interface EventEffectOption<T = any> {
  target: HTMLElement | Window | Document | null;
  eventName: string;
  deps?: T[];
  effects: (e: Event, ...args: T[]) => any;
}
