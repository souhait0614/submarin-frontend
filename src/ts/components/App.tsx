import { Routes, Route, useLocation } from "react-router-dom"
import { TransitionGroup, CSSTransition } from "react-transition-group"

import Top from "./Top"
import Settings from "./Settings"
import Chat from "./Chat"
import Error from './Error'

function App() {
  const location = useLocation()
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={100}>
        <Routes location={location}>
          <Route path="/" element={<Top />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            path="/*"
            element={
              <div>
                <Error
                  text={
                    <>
                      ページが見つかりませんでした。
                    </>
                  }
                />
              </div>
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
