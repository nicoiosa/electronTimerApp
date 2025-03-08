const TopBar = () => {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  return (
    <div
      className="relative rounded-t-xl bg-gray-950 w-screen h-9"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div
        id='"control-button'
        className="text-slate-300 text-2xl absolute bottom-0 right-0 pe-2"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <button id="minimize" className="pr-2 btnMinimize" onClick={handleMinimize}>
          &#128469;
        </button>
        <button id="close" className="" onClick={handleClose}>
          &#10006;
        </button>
      </div>
    </div>
  )
}

export default TopBar
