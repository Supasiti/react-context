import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type GetStore<T> = () => T;
type SetStore<T> = (value: Partial<T>) => void;
type StoreConfig<T> = (get: GetStore<T>, set: SetStore<T>) => T;
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
    state = Object.assign({}, state, newValue);
    subscribers.forEach((listener) => {
      listener(state);
    });
  };

  const getState = () => state;

  const subscribe = (listener: (value: TStore) => void) => {
    subscribers.add(listener);
    return () => subscribers.delete(listener);
  };

  state = config(getState, setState);

  return { getState, setState, subscribe };
}

export function makeStoreContext<TStore extends object>(
  config: StoreConfig<TStore>
) {
  const storeContext = createContext<BaseStore<TStore> | null>(null);
  const baseStore = makeBaseStore(config);

  type StoreProviderProps = {
    children: ReactNode;
  };

  const StoreProvider = (props: StoreProviderProps) => {
    const value = useRef(baseStore);
    return (
      <storeContext.Provider value={value.current}>
        {props.children}
      </storeContext.Provider>
    );
  };

  const useStore = <T,>(selector: (state: TStore) => T): T => {
    const context = useContext(storeContext)!;

    const [localState, setLocalState] = useState(() =>
      selector(context.getState())
    );

    useEffect(() => {
      context.subscribe((value) => setLocalState(() => selector(value)));
    }, []);

    return localState;
  };

  return { StoreProvider, useStore };
}
