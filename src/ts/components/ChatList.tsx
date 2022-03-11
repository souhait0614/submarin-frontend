import { OldChat, OldChatLog } from "../types"
import ChatNormalPost from "./ChatNormalPost"
import { ReceiveChat } from "../types.d"
import ChatLogPost from "./ChatLogPost"

function createList(v: ReceiveChat, k: number) {
  if (v.type === 0) {
    return <ChatNormalPost chat={v} key={k} />
  } else {
    return <ChatLogPost chat={v} key={k} />
  }
}
function ChatList({
  oldChatLog,
  chatLog,
}: {
  oldChatLog: OldChatLog
  chatLog: ReceiveChat[]
}) {
  const oldChatArray: OldChat[] = []
  Object.entries(oldChatLog).forEach(([k, v]) => {
    if (
      chatLog[0].timestamp === v.timestamp &&
      chatLog[0].type === v.type &&
      chatLog[0].poster_identifier === v.poster_identifier
    )
      return
    oldChatArray[k] = v
  })
  // console.log(chatLog.reverse())
  return (
    <>
      {chatLog.map(createList).reverse()}
      {oldChatArray.filter(Boolean).map(createList).reverse()}
    </>
  )
}

export default ChatList
