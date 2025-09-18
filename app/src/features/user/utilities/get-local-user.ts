import { UserInfo } from "../types/user-types";

export const getUserInfo = (): UserInfo =>
  JSON.parse(localStorage.getItem("userInfo") ?? "{}") as UserInfo;
export const setUserInfo = (userInfo: UserInfo): void => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};
export const getUserToken = (): string => localStorage.getItem("token") ?? "";
