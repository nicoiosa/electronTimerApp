
const TopBar = () => {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }
  const handleClose = () => {
    window.lectron.ipcRenderer.send('close-window')
  }
  return (
    <div>
      <div
        className=" rounded-t bg-blue-400 w-screen h-5"
        style={{ WebkitAppRegion: 'drag' }}
      ></div>
      <div className="bg-blue-400 w-screen h-5"></div>
      <div id='"control-button' className="text-stone-200 absolute top-1 right-0 pe-2">
        <button id="minimize" className="p1" onClick={handleMinimize}>
          &#128469;
        </button>
        <button id="close" className="p1" onClick={handleClose}>
          &#10006;
        </button>
      </div>
    </div>
  )
}

export default TopBar
