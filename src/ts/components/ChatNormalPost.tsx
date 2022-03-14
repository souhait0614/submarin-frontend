import { Ripple } from "@rmwc/ripple"
import { useRecoilValue, useSetRecoilState } from "recoil"
import {
  imageViewerOpenState,
  imageViewerState,
  posterIdentifierState,
} from "../atom"
import { ReceiveChat } from "../types.d"
//@ts-ignore
import defaultAvatar from "../../img/default-avatar.png"

function ChatNormalPost({ chat }: { chat: ReceiveChat }) {
  const poster_identifier = useRecoilValue(posterIdentifierState)

  const setImageViewer = useSetRecoilState(imageViewerState)
  const setImageViewerOpen = useSetRecoilState(imageViewerOpenState)

  return (
    <div
      className={
        "post" + (chat.poster_identifier === poster_identifier ? " my" : "")
      }
    >
      <div
        style={{
          backgroundImage: `url(${chat.avatar || defaultAvatar})`,
        }}
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
              <Ripple key={key}>
                <button
                  onClick={() => {
                    setImageViewer([chat.images, key])
                    setImageViewerOpen(true)
                  }}
                >
                  <img src={image} />
                </button>
              </Ripple>
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
