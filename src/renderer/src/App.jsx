import Timer from './components/Timer'
import TopBar from './components/TopBar'
import { useEffect, useState } from 'react'

const App = () => {
  const [isOverlay, setIsOverlay] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  useEffect(() => {
    window.electron.ipcRenderer.on('overlay-mode', () => {
      setIsOverlay((prevState) => !prevState)
      setIsEditing(false)
    })
    return () => {
      window.electron.ipcRenderer.removeAllListeners('overlay-mode')
    }
  }, [])

  return (
    <div className="h-screen overflow-hidden select-none rounded-b-xl">
      <div className={!isOverlay ? 'visible' : 'invisible'}>
        <TopBar />
      </div>
      <div className={!isOverlay ? 'bg-slate-950/40 p-2 h-full' : 'bg-slate-950/40 p-2 rounded-xl'}>
        <Timer isOverlay={isOverlay} isEditing={isEditing} setIsEditing={setIsEditing} />
      </div>
    </div>
  )
}

export default App
