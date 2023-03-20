import { useEffect, useState } from "react";

type GetStore<T> = () => T;
type SetStore<T> = (value: Partial<T>) => void;
type StoreConfig<T> = (set: SetStore<T>) => T;
type BaseStore<T> = {
  getState: GetStore<T>;
  setState: SetStore<T>;
  subscribe: (listener: (value: T) => void) => () => boolean;
};

export function makeBaseStore<TStore extends object>(
  config: StoreConfig<TStore>
): BaseStore<TStore> {
  const subscribers = new Set<(value: TStore) => void>();

  let state: TStore;

  const setState = (newValue: Partial<TStore>) => {
    const newState = { ...state, ...newValue };
    subscribers.forEach((listener) => {
      listener(newState);
    });
  };

  const getState = () => state;

  const subscribe = (listener: (value: TStore) => void) => {
    subscribers.add(listener);
    return () => subscribers.delete(listener);
  };

  state = config(setState);
 console.log({state})
  return { getState, setState, subscribe };
}

export function makeStore<TStore extends object>(config: StoreConfig<TStore>) {
  const store = makeBaseStore(config);

  const useStore = <T,>(selector: (state: TStore) => T): T => {
    const [localState, setLocalState] = useState(() =>
      selector(store.getState())
    );

    useEffect(() => {
      store.subscribe((value) => setLocalState(() => selector(value)));
    }, []);

    return localState;
  };

  return useStore;
}
