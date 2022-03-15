import { Ripple } from "@rmwc/ripple"
import { useRef, useState } from "react"

function HelpItem({
  label = "",
  children = <></>,
}: {
  label: string | JSX.Element
  children: JSX.Element
}) {
  const [open, setOpen] = useState(false)

  const content = useRef<HTMLDivElement>(null)
  const height = useRef(0)
  return (
    <div className="item_container">
      <Ripple>
        <button
          title="項目を開閉"
          onClick={() => {
            height.current = 0
            for (const e of content.current.children) {
              height.current += e.scrollHeight
            }
            setOpen((p) => (p = !p))
          }}
        >
          <span>{label}</span>
        </button>
      </Ripple>
      <div
        style={{
          height: open ? height.current : 0,
          paddingTop: open ? null : 0,
        }}
        ref={content}
      >
        {children}
      </div>
    </div>
  )
}

export default HelpItem
