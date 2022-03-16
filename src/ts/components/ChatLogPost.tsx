import { ReceiveChat } from "../types.d"

function ChatLogPost({ chat }: { chat: ReceiveChat }) {
  return (
    <div className={"log" + (chat.type === 1 ? " pri" : "")}>
      <p>
        {chat.name}が{["入室", "退室"][chat.type - 1]}しました
      </p>
      <p className="time">
        <time dateTime={chat.timestamp}>{chat.timestamp}</time>
      </p>
    </div>
  )
}

export default ChatLogPost
