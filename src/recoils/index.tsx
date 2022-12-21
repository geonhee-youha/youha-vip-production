import { atom } from "recoil";

export const mainDrawerOpenState = atom<boolean>({
  key: "mainDrawerOpenState",
  default: false,
});
