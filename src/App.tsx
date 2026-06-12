import { useState } from 'react'

import Button from './components/Button'
import InputText from './components/InputText'
import ButtonIcon from './components/ButtonIcon'
import TimeSelect from './components/TimeSelect'

import CalendarBlank from './assets/icons/CalendarBlank.svg?react'
import Trash from './assets/icons/Trash.svg?react'
import UserSquare from './assets/icons/UserSquare.svg?react'

export default function App() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>('')

  function handleDateSelect(date: Date | undefined) {
    setDate(date)
    console.log(date)
  }

  return (
    <div className='flex flex-col h-screen items-center justify-center gap-8'>
      <div className='flex flex-col gap-4'>
        <Button>AGENDAR</Button>
        <Button disabled>AGENDAR</Button>
      </div>
      <div className='flex flex-col gap-4'>
        <InputText
          icon={CalendarBlank}
          type='date'
          selectedDate={date}
          onDateSelect={handleDateSelect}
        />
        <InputText placeholder='Nome' icon={UserSquare} />
      </div>
      <div className='flex flex-col gap-4'>
        <ButtonIcon icon={Trash} />
      </div>
      <div className='flex flex-col gap-4'>
        <TimeSelect value={time} onSelect={setTime}>
          08:00
        </TimeSelect>
        <TimeSelect value={time} onSelect={setTime} disabled>
          09:00
        </TimeSelect>
      </div>
    </div>
  )
}
