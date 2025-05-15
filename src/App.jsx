import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'

function App() {
  const noteId = 1
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  // ✅ Load note with async/await
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notes/get/${noteId}`)
        setText(res.data.Content || '')
        setHasLoaded(true)
      } catch (err) {
        console.error('❌ Failed to load note:', err.message)
      }
    }

    fetchNote()
  }, [noteId])

  // ✏️ Auto-resize
  useEffect(() => {
    const el = textareaRef.current
    if (el) {
      el.style.height = 'auto'
      el.style.height = el.scrollHeight + 'px'
    }
  }, [text])

  // 💾 Auto-save with debounce
  useEffect(() => {
    if (!hasLoaded) return

    const timeout = setTimeout(() => {
      axios.put(`http://localhost:5000/api/notes/${noteId}`, { content: text })
        .then(() => console.log(" Auto-saved"))
        .catch(err => console.error(" Save failed:", err))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [text, noteId, hasLoaded])

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
        placeholder="What's on your mind"
        className='container'
      />
    </>
  )
}

export default App
