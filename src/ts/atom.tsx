import { atom } from "recoil"
import { Settings } from "./types"
import { genUuid } from "./util"

export const avatarState = atom({
  key: "avatar",
  default: localStorage.getItem("avatar") || "",
})

export const nameState = atom({
  key: "name",
  default: localStorage.getItem("name") || "",
})

export const posterIdentifierState = atom({
  key: "poster_identifier",
  default: localStorage.getItem("poster_identifier") || genUuid(),
})

export const settingsState = atom<Settings>({
  key: "settings",
  default: JSON.parse(localStorage.getItem("settings")) || {
    localStorage_keep_name: true,
    localStorage_keep_avatar: true,
    localStorage_keep_poster_identifier: true,
    chat_cjp: false,
    chat_send_shortcut: true,
  },
})

export const imageViewerOpenState = atom<boolean>({
  key: "imageViewerOpen",
  default: false,
})

export const imageViewerState = atom<[string[], number]>({
  key: "imageViewer",
  default: [[], 0],
})
