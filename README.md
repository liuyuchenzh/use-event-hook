# use-event-hook

useEffect with DOM event

## Installation

```bash
yarn add -D use-event-hook
# or
npm i D use-event-hook
```

## Usage

```ts
import { useMonoEffect, useSwitchEffect } from "use-event-hook";
useMonoEffect({
  uid: "componentResize",
  eventName: "resize",
  target: window,
  effects: e => {
    // trigger side effects
    // list update position
  }
});

useSwitchEffect({
  eventName: "click",
  target: document.body,
  switchKey: someState,
  effects: e => {
    const clickOnElement = e.target === element || element.contains(e.target) {
      return;
    }
    element.style.display = "none";
    // or function like updateDisplay(false);
  }
})
```

## API

### useMonoEffect

For each `uid`, register only one event listener for `eventName` typeof event on `target`, all provided `effects` will be called with `Event` object and passed in `deps`

```ts
interface Option<T = any> {
  uid: string; // unique id
  target: HTMLElement | Window | Document;
  eventName: string;
  deps?: T[];
  effects: (e: Event, ...args: T[]) => any;
}
```

### useSwitchEffect

Register a event listener on `target` for `eventName` typeof event whenever the `switchKey` becomes truthy, and remove listener whenever `switchKey` becomes falsy.

```ts
interface Option<T = any> {
  switchKey: any; // from state or props
  target: HTMLElement | Window | Document;
  eventName: string;
  deps?: T[];
  effects: (e: Event, ...args: T[]) => any;
}
```
