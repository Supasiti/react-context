import { useEffect, useState } from "react";

type GetStore<T> = () => T;
type SetStore<T> = (value: Partial<T>) => void;
type StoreConfig<T> = (set: SetStore<T>, get: GetStore<T>) => T;
type BaseStore<T> = {
  getState: GetStore<T>;
  setState: SetStore<T>;
  subscribe: (listener: (value: T) => void) => () => void;
};

export function makeBaseStore<TStore extends object>(
  config: StoreConfig<TStore>
): BaseStore<TStore> {
  const subscribers = new Set<(value: TStore) => void>();

  let state: TStore;

  const setState = (newValue: Partial<TStore>) => {
    Object.assign(state, newValue);
    subscribers.forEach((listener) => {
      listener(state);
    });
  };

  const getState = () => state;

  const subscribe = (listener: (value: TStore) => void) => {
    subscribers.add(listener);
    return () => {
      subscribers.delete(listener);
    };
  };

  state = config(setState, getState);

  return { getState, setState, subscribe };
}

export function makeStore<TStore extends object>(config: StoreConfig<TStore>) {
  const store = makeBaseStore(config);

  function useStore(): TStore;
  function useStore<T>(selector: (state: TStore) => T): T;
  function useStore<T>(selector?: (state: TStore) => T): T | TStore {
    const [localState, setLocalState] = useState(() =>
      selector ? selector(store.getState()) : store.getState()
    );

    useEffect(() => {
      const unsubscribe = store.subscribe((value) =>
        setLocalState(() => (selector ? selector(value) : value))
      );
      return unsubscribe;
    }, []);

    return localState;
  }

  return useStore;
}
