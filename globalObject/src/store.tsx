import { makeStore } from "./makeStore";

export type FullName = {
  firstName: string;
  lastName: string;
};
export type FullNameStore = FullName & {
  setName: (newName: Partial<FullName>) => void;
};
export type FullNameKey = keyof FullName;

export const fullNameStore = makeStore<FullNameStore>((set) => ({
  firstName: "",
  lastName: "",
  setName: (newName: Partial<FullName>) => {
    set(newName);
  },
}));

fullNameStore.subscribe((state) => console.log("New State: ", state))