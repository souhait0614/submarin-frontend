import React, { ChangeEventHandler, memo, useState } from "react"
import Header from "./Header"
import SettingItem from "./SettingItem"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  avatarState,
  nameState,
  settingsState,
  posterIdentifierState,
} from "../atom"
import { Settings as typesSettings } from "../types.d"
import { Ripple } from "@rmwc/ripple"
import { Link } from "react-router-dom"
import ReactModal from "react-modal"

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

const Settings = memo(() => {
  const avatar = useRecoilValue(avatarState)
  const name = useRecoilValue(nameState)
  const poster_identifier = useRecoilValue(posterIdentifierState)

  const [settings, setSettings] = useRecoilState(settingsState)

  const [resetDialogOpen, setResetDialogOpen] = useState(false)

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

  return (
    <div id="settings">
      <Header title="設定" />
      <main>
        <div className="container">
          <SettingItem
            label="ユーザーネームをブラウザに保存"
            input={
              <Switch
                checked={settings.localStorage_keep_name}
                onChange={(e) =>
                  onChangeHandle(
                    "localStorage_keep_name",
                    e.currentTarget.checked,
                    (settings: typesSettings) =>
                      settings.localStorage_keep_name
                        ? localStorage.setItem("name", name)
                        : localStorage.removeItem("name")
                  )
                }
              />
            }
          />
          <SettingItem
            label="アバターをブラウザに保存"
            input={
              <Switch
                checked={settings.localStorage_keep_avatar}
                onChange={(e) =>
                  onChangeHandle(
                    "localStorage_keep_avatar",
                    e.currentTarget.checked,
                    (settings: typesSettings) =>
                      settings.localStorage_keep_avatar
                        ? localStorage.setItem("avatar", avatar)
                        : localStorage.removeItem("avatar")
                  )
                }
              />
            }
          />
          <SettingItem
            label={
              <>
                投稿者識別子をブラウザに保存
                <br />
                <span className="sub_text">
                  過去に投稿したユーザーかの判別に使用します
                </span>
              </>
            }
            input={
              <Switch
                checked={settings.localStorage_keep_poster_identifier}
                onChange={(e) =>
                  onChangeHandle(
                    "localStorage_keep_poster_identifier",
                    e.currentTarget.checked,
                    (settings: typesSettings) =>
                      settings.localStorage_keep_poster_identifier
                        ? localStorage.setItem(
                            "poster_identifier",
                            poster_identifier
                          )
                        : localStorage.removeItem("poster_identifier")
                  )
                }
              />
            }
          />
        </div>

        <div className="container">
          <SettingItem
            label="怪しい日本語に変換して送信"
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
        <div className="container">
          <div className="item_container">
            <Ripple>
              <Link className="item" to="/onboarding">
                <span>初回起動画面を表示</span>
              </Link>
            </Ripple>
          </div>
          <div className="item_container">
            <Ripple>
              <Link className="item" to="/opensouceliecnse">
                <span>オープンソースライセンス</span>
              </Link>
            </Ripple>
          </div>
        </div>
        <div className="container">
          <div className="item_container">
            <Ripple>
              <button className="item" onClick={() => setResetDialogOpen(true)}>
                <span>保存された情報を削除</span>
              </button>
            </Ripple>
          </div>
        </div>
      </main>

      <ReactModal
        isOpen={resetDialogOpen}
        onRequestClose={() => setResetDialogOpen(false)}
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
          <p>
            ユーザーネームやアバター、設定を削除します。
            <br />
            よろしいですか？
          </p>
        </div>
        <div className="modal_buttons">
          <Ripple>
            <button onClick={() => setResetDialogOpen(false)}>
              キャンセル
            </button>
          </Ripple>
          <Ripple>
            <button
              className="destructive"
              onClick={() => {
                localStorage.clear()
                location.reload()
              }}
            >
              削除
            </button>
          </Ripple>
        </div>
      </ReactModal>
    </div>
  )
})

export default Settings
