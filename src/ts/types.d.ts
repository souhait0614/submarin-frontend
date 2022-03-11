export type OldChatLog = {
  [key: string]: OldChat
}

export interface OldChat extends ReceiveChat {
  id: string
}

export interface ReceiveChat extends PostChat {
  ip: undefined
  timestamp: string
}

export interface PostChat {
  ip: string
  poster_identifier: string
  type: number
  name: string
  avatar: string
  content: string
  images: string[]
}

export interface Settings {
  localStorage_keep_name: boolean
  localStorage_keep_avatar: boolean
  localStorage_keep_poster_identifier: boolean
}
