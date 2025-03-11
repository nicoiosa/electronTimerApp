const TopBar = () => {
  const handleMinimize = () => {
    window.electron.ipcRenderer.send('minimize-window')
  }
  const handleClose = () => {
    window.electron.ipcRenderer.send('close-window')
  }
  return (
    <div
      className="relative rounded-t-xl bg-slate-950 w-screen h-9"
      style={{ WebkitAppRegion: 'drag' }}
    >
      <div
        id='"control-button'
        className="text-slate-300 text-2xl absolute bottom-0 right-0 pe-2"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <button
          id="minimize"
          className="hover:brightness-150 cursor-pointer pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          onClick={handleMinimize}
        >
          &#128469;
        </button>
        <button
          id="close"
          className="hover:brightness-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          onClick={handleClose}
        >
          &#10006;
        </button>
      </div>
      <div
        id='"control-button'
        className="text-slate-300 text-2xl absolute bottom-0 left-0 ps-3"
        style={{ WebkitAppRegion: 'no-drag' }}
      >
        <div className="relative group">
          <span className="hover:brightness-150">&#8520;</span>
          <span className="font-mono absolute invisible group-hover:visible w-[200px] bg-emerald-900/50 text-slate-100 text-[12px] text-center py-1 rounded-md z-10 top-1 left-[250%] after:absolute after:top-[25%] after:right-full after:-mt-1 after:border-[5px] after:border-solid after:border-transparent after:border-r-emerald-900/50">
            Presiona Ctrl+7 para el modo superposición.
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopBar
