import { useContext, useEffect } from "react"
import { UNSAFE_NavigationContext } from "react-router-dom"

export function genUuid() {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("")
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16)
        break
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
        break
    }
  }
  return chars.join("")
}

export function byteLengthOf(s: string) {
  return new Blob([s]).size
}

export function useBackListener(callback) {
  const navigator = useContext(UNSAFE_NavigationContext).navigator

  useEffect(() => {
    const listener = ({ location, action }) => {

      if (action === "POP") {
        callback({ location, action })
      }
    }

    //@ts-ignore
    const unlisten = navigator.listen(listener)
    return unlisten
  }, [callback, navigator])
}
