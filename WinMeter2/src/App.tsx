import { BrowserRouter, Routes, Route }from 'react-router-dom'

import { HomeAlt } from "./pages/HomeAlt"
import { CreateMatch } from "./pages/CreateMatch"
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<HomeAlt />} />
          {/* <Route path="/createMatch" element={<CreateMatch />} /> */}
          <Route path="/newMatch" element={<CreateMatch />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
