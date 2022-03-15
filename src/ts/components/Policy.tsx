import Error from "./Error"
import Header from "./Header"

export const Policy = () => {
  return (
    <div id="policy">
      <Header title="プライバシーポリシー" />
      <Error text={<>ダミーページです</>} noBtn />
    </div>
  )
}
