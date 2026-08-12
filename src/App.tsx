import { BrowserRouter, Routes, Route } from 'react-router'

import LayoutMain from './pages/layouts/Main'

import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutMain />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
