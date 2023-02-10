import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export function makeStore<TStore>(initialValue: TStore) {
  const subscribers = new Set<(value: TStore) => void>();

  const useStoreState = () => {
    const stateRef = useRef(initialValue);

    const setState = (newValue: Partial<TStore>) => {
      stateRef.current = { ...stateRef.current, ...newValue };
      subscribers.forEach((listener) => {
        listener(stateRef.current);
      });
    };

    const getState = () => stateRef.current;

    const subscribe = (listener: (value: TStore) => void) => {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    };

    return { getState, setState, subscribe };
  };

  type StoreState = ReturnType<typeof useStoreState>;
  const storeContext = createContext<StoreState | null>(null);

  type StoreProviderProps = {
    children: ReactNode;
  };

  const StoreProvider = (props: StoreProviderProps) => {
    const value = useStoreState();
    return (
      <storeContext.Provider value={value}>
        {props.children}
      </storeContext.Provider>
    );
  };

  const useStore = <T,>(
    selector: (state: TStore) => T
  ): [T, (newValue: Partial<TStore>) => void] => {
    const context = useContext(storeContext)!;
    const [localState, setLocalState] = useState(() =>
      selector(context.getState())
    );

    useEffect(() => {
      context.subscribe((value) => setLocalState(selector(value)));
    }, []);

    return [localState, context.setState];
  };

  return { StoreProvider, useStore };
}
