import { Ripple } from "@rmwc/ripple"
import { useEffect, useRef, useState } from "react"

function HelpItem({
  label = "",
  children = <></>,
}: {
  label: string | JSX.Element
  children: JSX.Element
}) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState(0)

  const content = useRef<HTMLDivElement>(null)

  function setItemHeight() {
    let h = 0
    for (const e of content.current.children) {
      h += e.scrollHeight
    }
    setHeight(h)
  }

  useEffect(() => {
    const observer = new ResizeObserver(setItemHeight)

    content.current && observer.observe(content.current)

    setItemHeight()

    return () => observer.disconnect()
  }, [])

  return (
    <section className="item_container">
      <Ripple>
        <button
          title="項目を開閉"
          onClick={() => {
            setOpen((p) => (p = !p))
          }}
        >
          <h2>{label}</h2>
          <i>{open ? "expand_less" : "expand_more"}</i>
        </button>
      </Ripple>
      <div
        style={{
          height: open ? height : 0,
          paddingTop: open ? null : 0,
        }}
        ref={content}
      >
        {children}
      </div>
    </section>
  )
}

export default HelpItem
