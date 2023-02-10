import { makeStore } from "./makeStore";

export interface FullName {
  firstName: string;
  lastName: string;
}
export type FullNameKey = keyof FullName;

const initialValue = { firstName: "", lastName: "" };

const { StoreProvider: FullNameProvider, useStore: useFullNameStore } =
  makeStore(initialValue);

export { FullNameProvider, useFullNameStore };
