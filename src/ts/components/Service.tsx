import Error from "./Error"
import Header from "./Header"

export const Service = () => {
  return (
    <div id="service">
      <Header title="利用規約" />
      <Error text={<>ダミーページです</>} noBtn />
    </div>
  )
}
