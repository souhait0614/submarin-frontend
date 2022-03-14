import Header from "./Header"
import { useRecoilValue } from "recoil"
import {
  posterIdentifierState,
  nameState,
  avatarState,
  settingsState,
} from "../atom"
import { memo, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OldChatLog, ReceiveChat, Settings } from "../types"
import Error from "./Error"
import ChatList from "./ChatList"
import ChatForm from "./ChatForm"
import { getLog, postChat } from "../sendWebSocket"
import { Ripple } from "@rmwc/ripple"
import Modal from "react-modal"

const Chat = memo(() => {

  const navigate = useNavigate()
  const [wsLoading, setWsLoading] = useState(true)

  const avatar = useRecoilValue(avatarState)
  const name = useRecoilValue(nameState)
  const poster_identifier = useRecoilValue(posterIdentifierState)
  const settings: Settings = useRecoilValue(settingsState)

  const [oldChatLog, setOldChatLog] = useState({} as OldChatLog)
  const [receiveChat, setReceiveChat] = useState([] as ReceiveChat[])
  const [hideJumpBtn, setHideJumpBtn] = useState(true)

  const [backModalOpen, setBackModalOpen] = useState(false)

  const ws = useRef<WebSocket>()
  const ip = useRef<string>("0.0.0.0")
  const loadOffset = useRef<number>(0)

  const main = useRef<HTMLElement>(null)
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
              <Header
                title="オープンチャット"
                backBtn={
                  <Ripple>
                    <button onClick={() => setBackModalOpen(true)}>
                      <i>arrow_back</i>
                    </button>
                  </Ripple>
                }
              />
              <main
                ref={main}
                onScroll={(e) => {
                  const { clientHeight, scrollHeight, scrollTop } =
                    e.currentTarget
                  setHideJumpBtn(scrollTop === 0)

                  //上端までスクロールしたら&&id1番のチャットが読み込まれていない場合&&過去ログがある場合
                  if (
                    scrollHeight - (clientHeight - scrollTop) <= 1 &&
                    !oldChatLog["1"] &&
                    Object.keys(oldChatLog).length
                  ) {
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
                <Ripple>
                  <button
                    className={"jump_latest" + (hideJumpBtn ? " hide" : "")}
                    title="最新のチャットに戻る"
                    onClick={() => (main.current.scrollTop = 0)}
                  >
                    <i>arrow_downward</i>
                  </button>
                </Ripple>
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
      <Modal
        isOpen={backModalOpen}
        onRequestClose={() => setBackModalOpen(false)}
        overlayClassName={{
          base: "overlay_base",
          afterOpen: "overlay_after",
          beforeClose: "overlay_before",
        }}
        className={{
          base: "content_base",
          afterOpen: "content_after",
          beforeClose: "content_before",
        }}
        closeTimeoutMS={100}
      >
        <div className="message">
          <p>オープンチャットから退出しますか？</p>
        </div>
        <div className="modal_buttons">
          <Ripple>
            <button onClick={() => setBackModalOpen(false)}>キャンセル</button>
          </Ripple>
          <Ripple>
            <button
              className="destructive"
              onClick={() => {
                setBackModalOpen(false)
                navigate(-1)
              }}
            >
              退出
            </button>
          </Ripple>
        </div>
      </Modal>
    </div>
  )
})

export default Chat
