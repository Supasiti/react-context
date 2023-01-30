import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import "./App.css";
import Display from "./Display";
import Form from "./Form";
import { FullNameProvider } from "./store";

// export interface FullName {
//   firstName: string;
//   lastName: string;
// }
// export type FullNameKey = keyof FullName;

// const initialValue = { firstName: "", lastName: "" };

// const useFullNameValue = () => {
//   const [state, setState] = useState(initialValue);
//   const setFullName = (newName: Partial<FullName>) => {
//     setState((prev) => ({ ...prev, ...newName }));
//   };
//   return { fullName: state, setFullName };
// };

// type FullNameContext = ReturnType<typeof useFullNameValue>;

// const fullNameContext = createContext<FullNameContext | null>(null);

// interface FullNameProviderProps {
//   children: ReactNode;
// }
// function FullNameProvider(props: FullNameProviderProps) {
//   const value = useFullNameValue();
//   return (
//     <fullNameContext.Provider value={value}>
//       {props.children}
//     </fullNameContext.Provider>
//   );
// }

// export const useFullNameStore = () => {
//   const context = useContext(fullNameContext);
//   return context!;
// };

function App() {
  return (
    <FullNameProvider>
      <div className="App stack container">
        <Form />
        <Display />
      </div>
    </FullNameProvider>
  );
}

export default App;
