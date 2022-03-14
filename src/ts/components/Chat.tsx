import Header from "./Header"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  posterIdentifierState,
  nameState,
  avatarState,
  settingsState,
  imageViewerOpenState,
  imageViewerState,
} from "../atom"
import { ChangeEventHandler, memo, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { OldChatLog, ReceiveChat, Settings } from "../types"
import Error from "./Error"
import ChatList from "./ChatList"
import ChatForm from "./ChatForm"
import { getLog, postChat } from "../sendWebSocket"
import { Ripple } from "@rmwc/ripple"
import Modal from "react-modal"
import ImgsViewer from "react-images-viewer"
import SettingItem from "./SettingItem"

const Chat = memo(() => {
  const navigate = useNavigate()
  const [wsLoading, setWsLoading] = useState(true)

  const avatar = useRecoilValue(avatarState)
  const name = useRecoilValue(nameState)
  const poster_identifier = useRecoilValue(posterIdentifierState)

  const [settings, setSettings] = useRecoilState(settingsState)
  const [imageViewer, setImageViewer] = useRecoilState(imageViewerState)
  const [imageViewerOpen, setImageViewerOpen] =
    useRecoilState(imageViewerOpenState)

  const [oldChatLog, setOldChatLog] = useState({} as OldChatLog)
  const [receiveChat, setReceiveChat] = useState([] as ReceiveChat[])
  const [hideJumpBtn, setHideJumpBtn] = useState(true)

  const [backDialogOpen, setBackDialogOpen] = useState(false)
  const [chatSettingModalOpen, setChatSettingModalOpen] = useState(false)

  const ws = useRef<WebSocket>()
  const ip = useRef<string>("0.0.0.0")
  const loadOffset = useRef<number>(0)

  const main = useRef<HTMLElement>(null)
  const oldChatLogTop = useRef<number>(0)

  function Switch({
    checked,
    onChange,
  }: {
    checked: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
  }) {
    return (
      <input
        type="checkbox"
        className="switch"
        checked={checked}
        onChange={onChange}
      />
    )
  }

  const onChangeHandle = (
    changeSetting: string,
    value: unknown,
    callback: Function = () => {}
  ) => {
    const result = {
      ...settings,
      [changeSetting]: value,
    }
    setSettings(result)

    localStorage.setItem("settings", JSON.stringify(result))

    callback(result)
  }

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
      setImageViewer([[], 0])
      setImageViewerOpen(false)
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
                    <button onClick={() => setBackDialogOpen(true)}>
                      <i>arrow_back</i>
                    </button>
                  </Ripple>
                }
                addBtn={
                  <button onClick={() => setChatSettingModalOpen(true)}>
                    <i>settings</i>
                  </button>
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
        isOpen={backDialogOpen}
        onRequestClose={() => setBackDialogOpen(false)}
        overlayClassName={{
          base: "overlay_base",
          afterOpen: "overlay_after",
          beforeClose: "overlay_before",
        }}
        className={{
          base: "dialog_base",
          afterOpen: "dialog_after",
          beforeClose: "dialog_before",
        }}
        closeTimeoutMS={100}
      >
        <div className="message">
          <p>オープンチャットから退出しますか？</p>
        </div>
        <div className="modal_buttons">
          <Ripple>
            <button onClick={() => setBackDialogOpen(false)}>キャンセル</button>
          </Ripple>
          <Ripple>
            <button
              className="destructive"
              onClick={() => {
                setBackDialogOpen(false)
                navigate(-1)
              }}
            >
              退出
            </button>
          </Ripple>
        </div>
      </Modal>
      <Modal
        isOpen={chatSettingModalOpen}
        onRequestClose={() => setChatSettingModalOpen(false)}
        overlayClassName={{
          base: "overlay_base",
          afterOpen: "overlay_after",
          beforeClose: "overlay_before",
        }}
        className={{
          base: "modal_base",
          afterOpen: "modal_after",
          beforeClose: "modal_before",
        }}
        closeTimeoutMS={100}
      >
        <header>
          <span>チャット設定</span>
          <Ripple>
            <button onClick={() => setChatSettingModalOpen(false)}>
              <i>close</i>
            </button>
          </Ripple>
        </header>
        <div className="settings_container">
          <SettingItem
            label="怪レい日本语に変換して送信"
            input={
              <Switch
                checked={settings.chat_cjp}
                onChange={(e) =>
                  onChangeHandle("chat_cjp", e.currentTarget.checked)
                }
              />
            }
          />
          <SettingItem
            label="Ctrl+Enterで送信"
            input={
              <Switch
                checked={settings.chat_send_shortcut}
                onChange={(e) =>
                  onChangeHandle("chat_send_shortcut", e.currentTarget.checked)
                }
              />
            }
          />
        </div>
      </Modal>
      <ImgsViewer
        imgs={imageViewer[0].map((src) => {
          return { src }
        })}
        currImg={imageViewer[1]}
        isOpen={imageViewerOpen}
        onClickPrev={() =>
          setImageViewer((prev) => (prev = [prev[0], prev[1] - 1]))
        }
        onClickNext={() =>
          setImageViewer((prev) => (prev = [prev[0], prev[1] + 1]))
        }
        onClose={() => setImageViewerOpen(false)}
        backdropCloseable={true}
        theme={{
          container: {
            background: "#0005",
          },
        }}
      />
    </div>
  )
})

export default Chat
