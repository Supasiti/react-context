import { makeStoreContext } from "./makeStore";

export type FullName = {
  firstName: string;
  lastName: string;
};
export type FullNameStore = FullName & {
  setName: (newName: Partial<FullName>) => void;
};
export type FullNameKey = keyof FullName;

const context = makeStoreContext<FullNameStore>((_, set) => ({
  firstName: "",
  lastName: "",
  setName: (newName: Partial<FullName>) => {
    set(newName);
  },
}));

export const FullNameProvider = context.StoreProvider;
export const useFullNameStore = context.useStore;
