import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Parking from './components/Parking'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Parking />
    </>
  )
}

export default App
