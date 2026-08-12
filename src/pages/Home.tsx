import Schedule from '../components/core/Schedule'
import SideBar from '../components/core/SideBar'

export default function Home() {
  return (
    <div className='flex col-2 gap-3 justify-center items-start'>
      <SideBar />
      <Schedule />
    </div>
  )
}
