import { Ripple } from "@rmwc/ripple"

function SettingItem({
  label = "",
  input = <></>,
}: {
  label: string | JSX.Element
  input: JSX.Element
}) {
  return (
    <div className="item_container">
      <Ripple>
        <label className="item" title="設定を切り替え">
          <span>{label}</span>
          {input}
        </label>
      </Ripple>
    </div>
  )
}

export default SettingItem
