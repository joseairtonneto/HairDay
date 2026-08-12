import { Outlet } from 'react-router'

import Header from '../../components/core/Header'
import MainContent from '../../components/core/Main'

export default function Main() {
  return (
    <>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
    </>
  )
}
