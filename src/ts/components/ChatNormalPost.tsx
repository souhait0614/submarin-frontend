import { useRecoilValue } from "recoil"
import { posterIdentifierState } from "../atom"
import { ReceiveChat } from "../types.d"

function ChatNormalPost({ chat }: { chat: ReceiveChat }) {
  const poster_identifier = useRecoilValue(posterIdentifierState)

  return (
    <div
      className={
        "post" + (chat.poster_identifier === poster_identifier ? " my" : "")
      }
    >
      <div
        style={{ backgroundImage: `url(${chat.avatar || "../../img/default-avatar.png"})` }}
        className="img"
        role="img"
      />
      <div className="container">
        <div
          className="text_container"
          style={!chat.content.length ? { minHeight: "auto" } : {}}
        >
          <p className="name">{chat.name}</p>
          <p className="content">{chat.content}</p>
        </div>
        {chat.images.length ? (
          <div className="images_container">
            {chat.images.map((image, key) => (
              <img src={image} key={key} />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default ChatNormalPost
