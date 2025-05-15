import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'


function App() {
  const [text, setText] = useState('') // store the text
  const textareaRef = useRef(null) // get access to the box

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto'; // reset height
      el.style.height = el.scrollHeight + 'px'; // grow to fit content
    }
  }, [text]); // re-run this whenever text changes

    // Auto-save logic (debounced)
  useEffect(() => {
    const timeout = setTimeout(() => {
      axios.put('http://localhost:5000/api/notes/1', { content: text })
        .then(res => console.log("Saved"))
        .catch(err => console.error("Save failed", err))
    }, 1000)

    return () => clearTimeout(timeout) // reset debounce on new keystroke
  }, [text])

  return (
    <>
      <div className='top'>
          
          <h1 className='selectable-heading' onClick={() => console.log(text)}>bert</h1> 
        
                 
          <img src={reactLogo} className="logo" alt="React logo" />
      </div>

      <textarea 
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder ="What's on your mind"
        className='container'/>

    </>
  )
}

export default App
