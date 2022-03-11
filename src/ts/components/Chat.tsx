import Header from "./Header"
import { useRecoilValue } from "recoil"
import {
  posterIdentifierState,
  nameState,
  avatarState,
  settingsState,
} from "../atom"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OldChatLog, PostChat, ReceiveChat, Settings } from "../types"
import Error from "./Error"
import ChatList from "./ChatList"
import ChatForm from "./ChatForm"
import { getLog, postChat } from "../sendWebSocket"

function Chat() {
  const navigate = useNavigate()
  const [wsLoading, setWsLoading] = useState(true)

  const avatar = useRecoilValue(avatarState)
  const name = useRecoilValue(nameState)
  const poster_identifier = useRecoilValue(posterIdentifierState)
  const settings: Settings = useRecoilValue(settingsState)

  const [oldChatLog, setOldChatLog] = useState({} as OldChatLog)
  const [receiveChat, setReceiveChat] = useState([] as ReceiveChat[])

  const ws = useRef<WebSocket>()
  const ip = useRef<string>("0.0.0.0")
  const loadOffset = useRef<number>(0)

  const main = useRef(null)
  const oldChatLogTop = useRef<number>(0)

  useEffect(() => {
    const f = async () => {
      setWsLoading(true)
      ip.current = await fetch("https://ipinfo.io/?callback")
        .then((res) => res.json())
        .then((data) => data.ip)

      settings.localStorage_keep_poster_identifier &&
        localStorage.setItem("poster_identifier", poster_identifier)

      ws.current = new WebSocket("ws://192.168.0.212:8080/")
      ws.current.onmessage = (receive) => {
        const data = (receive.data as string).split(">")
        const messageType = data.splice(0, 1)[0]
        // console.log(messageType);
        // console.log(JSON.parse(data.join("")));
        if (messageType === "receive-chat") {
          const json = JSON.parse(data.join(">"))
          setReceiveChat((prev) => (prev = [...prev, json]))
        } else if (messageType === "set-log") {
          const json = JSON.parse(data.join(">"))
          setOldChatLog((prev) => (prev = { ...prev, ...json }))
          main.current.scrollTop = oldChatLogTop.current
        }
      }

      ws.current.onopen = () => {
        setWsLoading(false)
        postChat(
          {
            ip: ip.current,
            poster_identifier: poster_identifier,
            type: 1,
            name,
            avatar,
            content: "",
            images: [],
          },
          ws.current
        )
        getLog(0, 30, ws.current)
      }
    }
    f()
    return () => {
      postChat(
        {
          ip: ip.current,
          poster_identifier: poster_identifier,
          type: 2,
          name,
          avatar,
          content: "",
          images: [],
        },
        ws.current
      )
      ws.current.close()
    }
  }, [])

  return (
    <div id="chat">
      {name !== "" ? (
        <>
          {!wsLoading ? (
            <>
              <Header title="オープンチャット" />
              <main
              ref={main}
                onScroll={(e) => {
                  const { clientHeight, scrollHeight, scrollTop } =
                    e.currentTarget
                  //上端までスクロールしたら
                  console.log(scrollTop)

                  if (scrollHeight - (clientHeight - scrollTop) == 0 && !oldChatLog["1"]) {
                    oldChatLogTop.current = scrollTop
                    loadOffset.current += 30
                    getLog(
                      loadOffset.current + receiveChat.length,
                      30,
                      ws.current
                    )
                  }
                }}
              >
                <ChatList oldChatLog={oldChatLog} chatLog={receiveChat} />
              </main>
              <ChatForm ws={ws.current} ip={ip.current} />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <Header title="オープンチャット" removeBackBtn />
          <Error
            title="参加に失敗しました"
            text={
              <>
                ユーザーネームが未設定です
                <br />
                再設定してください。
              </>
            }
          />
        </>
      )}
    </div>
  )
}

export default Chat
