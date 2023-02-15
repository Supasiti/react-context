import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

const nameContext = createContext<
  [string, Dispatch<SetStateAction<string>>] | null
>(null);

type ProviderProps = {
  children: ReactNode;
};

export function Provider(props: ProviderProps) {
  const [name, setName] = useState("");
  return (
    <nameContext.Provider value={[name, setName]}>
      {props.children}
    </nameContext.Provider>
  );
}

export function useStore() {
  return useContext(nameContext)!;
}

// function makeStore() {
//   let state = "";
//   const subscribers = new Set<(value: string) => void>();

//   const getValue = () => state;

//   const setValue = (newValue: string) => {
//     state = newValue;
//     subscribers.forEach((listener) => {
//       listener(state);
//     });
//   };

//   const subscribe = (listener: (value: string) => void) => {
//     subscribers.add(listener);
//     return () => {
//       subscribers.delete(listener);
//     };
//   };

//   return { getValue, setValue, subscribe };
// }

// const store = makeStore();


// export function useStore(): [string, (newValue: string) => void] {
//   const [name, setName] = useState(() => store.getValue());

//   useEffect(() => store.subscribe((value) => setName(() => value)), []);

//   return [name, store.setValue];
// }
