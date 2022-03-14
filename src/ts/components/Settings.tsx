import React, { ChangeEventHandler, memo } from "react"
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
      </main>
    </div>
  )
})

export default Settings
