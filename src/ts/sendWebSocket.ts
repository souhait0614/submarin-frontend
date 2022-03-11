import { PostChat } from "./types"
import { byteLengthOf } from "./util"

export function postChat(postChat: PostChat, ws: WebSocket): void {
  const message = `post-chat>${JSON.stringify(postChat)}`
  if(byteLengthOf(message) > 16777216) throw Error("送信限界を超えています")
  ws.send(message)
}
export function getLog(offset: number, limit: number, ws: WebSocket): void {
  ws.send(`get-log>${offset},${limit}`)
}
