import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export interface FullName {
  firstName: string;
  lastName: string;
}
export type FullNameKey = keyof FullName;

const initialValue = { firstName: "", lastName: "" };

const subscribers = new Set<(value: FullName) => void>();

const useFullNameValue = () => {
  const stateRef = useRef(initialValue);

  const setState = (newName: Partial<FullName>) => {
    stateRef.current = { ...stateRef.current, ...newName };
    subscribers.forEach((listener) => {
      listener(stateRef.current)
    })
  };

  const getState = () => stateRef.current;

  const subscribe = (listener: (value: FullName) => void) => {
    subscribers.add(listener);
    return () => subscribers.delete(listener);
  }

  return { getState, setState, subscribe };
};

type FullNameValue = ReturnType<typeof useFullNameValue>;

const fullNameContext = createContext<FullNameValue | null>(null);

interface FullNameProviderProps {
  children: ReactNode;
}

export function FullNameProvider(props: FullNameProviderProps) {
  const value = useFullNameValue();
  return (
    <fullNameContext.Provider value={value}>
      {props.children}
    </fullNameContext.Provider>
  );
}

export const useFullNameStore = () => {
  const context = useContext(fullNameContext)!;
  const [state, setState] = useState<FullName>(() => context.getState());

  useEffect(() => {
    context.subscribe((value) => setState(value))
  }, [])

  return {...state, setStore: context.setState};
};
