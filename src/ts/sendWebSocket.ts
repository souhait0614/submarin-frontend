import { PostChat } from "./types"

export function postChat(postChat: PostChat, ws: WebSocket): void {
  ws.send(`post-chat>${JSON.stringify(postChat)}`)
}
export function getLog(offset: number, limit: number, ws: WebSocket): void {
  ws.send(`get-log>${offset},${limit}`)
}
