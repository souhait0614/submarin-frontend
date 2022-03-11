import { useState, useRef } from "react"
import { useRecoilValue } from "recoil"
import { avatarState, nameState, posterIdentifierState } from "../atom"
import { postChat } from "../sendWebSocket"

import Compressor from "compressorjs"
import TextareaAutosize from "react-textarea-autosize"
import { Ripple } from "@rmwc/ripple"

function ChatForm({ ws, ip }: { ws: WebSocket; ip: string }) {
  const avatar = useRecoilValue(avatarState)
  const name = useRecoilValue(nameState)
  const poster_identifier = useRecoilValue(posterIdentifierState)

  const [text, setText] = useState("")
  const [images, setImages] = useState<string[]>([] as string[])
  const textareaRef = useRef(null)

  const convertImages = () => {
    const fileElem = document.createElement("input")
    fileElem.type = "file"
    fileElem.accept = ".png,.jpeg,.jpg,.gif"
    fileElem.click()
    fileElem.addEventListener("change", function () {
      const { files } = this
      if (files === null) return
      for (const file of files) {
        new Compressor(file, {
          maxWidth: 1080,
          maxHeight: 1080,
          mimeType: "image/webp",
          async success(blob) {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
              const { result } = reader
              if (typeof result === "string" && images.length < 4)
                setImages((prev) => (prev = [...prev, result]))
            })
            reader.readAsDataURL(blob)
          },
          error(err) {
            console.error(err)
          },
        })
      }
    })
  }

  const post = () => {
    if (text.trim() === "" && images.length === 0) return
    postChat(
      {
        ip,
        poster_identifier: poster_identifier,
        type: 0,
        name,
        avatar,
        content: text,
        images,
      },
      ws
    )
    setText("")
    textareaRef.current.value = ""
    setImages([])
  }

  return (
    <footer>
      <div className="images">
        {images.map((image, k) => (
          <div className="img" key={k}>
            <Ripple>
              <button
                className="remove"
                onClick={() => {
                  setImages((prev) => {
                    const result = [...prev]
                    result.splice(k, 1)
                    return result
                  })
                }}
              >
                <i>close</i>
              </button>
            </Ripple>
            <img src={image} />
          </div>
        ))}
      </div>
      <div className="input">
        <Ripple>
          <button onClick={convertImages}>
            <i>add_photo_alternate</i>
          </button>
        </Ripple>
        <TextareaAutosize
          placeholder="いまどうしてる？"
          ref={textareaRef}
          onChange={(e) => setText(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) post()
          }}
        />
        <Ripple>
          <button
            onClick={post}
            disabled={text.trim() === "" && images.length === 0}
          >
            <i>send</i>
          </button>
        </Ripple>
      </div>
    </footer>
  )
}

export default ChatForm
