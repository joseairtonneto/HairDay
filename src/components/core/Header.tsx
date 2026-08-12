import Icon from '../Icon'

import Logo from '../../assets/images/Logo.svg?react'

export default function Header() {
  return (
    <nav className='bg-gray-600 px-5 py-3 rounded-br-xl w-fit z-10 absolute top-0 left-0'>
      <Icon svg={Logo} className='w-25 h-8 fill-yellow-light' />
    </nav>
  )
}
