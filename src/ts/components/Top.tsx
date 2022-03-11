import { Link } from "react-router-dom"
import { useRecoilState, useRecoilValue } from "recoil"

import Header from "./Header"
import { nameState, avatarState, settingsState } from "../atom"
import { Settings } from "../types.d"
import { Ripple } from "@rmwc/ripple"

function Top() {
  const [avatar, setAvatar] = useRecoilState(avatarState)
  const [name, setName] = useRecoilState(nameState)

  const settings: Settings = useRecoilValue(settingsState)

  function changeAvatar() {
    const fileElem = document.createElement("input")
    fileElem.type = "file"
    fileElem.accept = ".png,.jpeg,.jpg,.gif"
    fileElem.click()
    fileElem.addEventListener(
      "change",
      function () {
        const { files } = this
        if (files === null) return
        const img = new Image()
        const reader = new FileReader()
        reader.addEventListener("load", () => {
          const { result } = reader
          const canvas = document.createElement("canvas")
          canvas.width = 100
          canvas.height = 100
          const ctx = canvas.getContext("2d")
          typeof result === "string" && (img.src = result)
          img.onload = () => {
            const w = img.width
            const h = img.height
            const r = w / h
            if (!ctx) return
            if (r >= 1) {
              ctx.drawImage(img, (100 - 100 * r) / 2, 0, 100 * r, 100)
            } else {
              ctx.drawImage(img, 0, (100 - 100 / r) / 2, 100, 100 / r)
            }
            const data = canvas.toDataURL("image/webp")
            settings.localStorage_keep_name &&
              localStorage.setItem("avatar", data)
            setAvatar(data)
          }
        })
        reader.readAsDataURL(files[0])
      },
      { passive: true }
    )
  }

  function changeName(name: string) {
    settings.localStorage_keep_name && localStorage.setItem("name", name.trim())
    setName(name)
  }
  return (
    <div id="top">
      <Header
        title="Submarin"
        removeBackBtn
        addBtn={
          <Link to="/settings">
            <i>settings</i>
          </Link>
        }
      />
      <main>
        <div className="container">
          <div className="avatar">
            <div
              style={{ backgroundImage: `url(${avatar})` }}
              className="img"
              role="img"
            />
            {avatar === "../img/default-avatar.png" ? (
              <Ripple>
                <button className="btn" onClick={changeAvatar}>
                  <i>add_photo_alternate</i>
                </button>
              </Ripple>
            ) : (
              <Ripple>
                <button
                  className="btn"
                  onClick={() => {
                    setAvatar("../img/default-avatar.png")
                    localStorage.removeItem("avatar")
                  }}
                >
                  <i>delete_forever</i>
                </button>
              </Ripple>
            )}
          </div>
          <input
            type="text"
            maxLength={20}
            onChange={(e) => {
              let count =
                20 -
                (
                  e.currentTarget.value
                    .trim()
                    .match(/[^\x01-\x7E\xA1-\xDF]/g) || []
                ).length
              count < 10 && (count = 10)
              e.currentTarget.maxLength = count
              changeName(e.currentTarget.value.trim().substring(0, count))
            }}
            value={name}
            placeholder="username..."
          />
        </div>
      </main>
      <footer>
        <Ripple>
          <Link
            to="/chat"
            className={name.trim() === "" ? "btn pri disabled" : "btn pri"}
          >
            オープンチャットに参加
          </Link>
        </Ripple>
      </footer>
    </div>
  )
}

export default Top
