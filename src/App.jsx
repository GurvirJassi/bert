import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><div className='card'>
      <div className="logo-container">
          
        <h1>Vite + React</h1>

        <div className="card"></div> {/* used as padding */}

        <a></a> {/* logo doesn't spin without this for some reason */}
        <a href="https://react.dev" /*target="_blank"*/>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      
      
      
        empty as frick
   

      </div>
    </>
  )
}

export default App
