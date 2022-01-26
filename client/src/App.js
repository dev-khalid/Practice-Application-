import React, { useState } from 'react'
import Counter from './components/Counter'

const App = () => {
  const [show,setShow] = useState(true); 
  return (
    <div>
      {show && <Counter />}
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
    </div>
  )
}

export default App
