import { useEffect, useState } from 'react'
import InputField from './InputField'
import alarm from '../assets/sounds/alarm-sound.mp3'

const Timer = ({ isOverlay, isEditing, setIsEditing }) => {
  const [isActive, setIsActive] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [initialTime, setInitialTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const audio = new Audio(alarm)
  useEffect(() => {
    let intervalId
    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else {
          if (minutes === 0 && hours == 0) {
            audio.play()
            clearInterval(intervalId)
            resetTimer()
          } else {
            if (minutes === 0) {
              setHours((hours) => hours - 1)
              setMinutes(59)
            } else {
              setMinutes((minutes) => minutes - 1)
            }
            setSeconds(59)
          }
        }
      }, 1000)
    } else {
      clearInterval(intervalId)
    }
    return () => clearInterval(intervalId)
  }, [isActive, hours, minutes, seconds])
  const handleStart = () => {
    if (seconds !== 0 || minutes !== 0 || hours !== 0) {
      setIsActive(true)
    }
  }
  const handleSetTime = () => {
    setInitialTime({ hours, minutes, seconds })
    setIsEditing(false)
  }
  const handleSetHours = (e) => {
    const newHours = parseInt(e.target.value)
    if (newHours >= 0 && newHours <= 9999) {
      setHours(newHours)
    }
  }
  const handleSetMinutes = (e) => {
    const newMinutes = parseInt(e.target.value)
    if (newMinutes >= 0 && newMinutes <= 59) {
      setMinutes(newMinutes)
    }
  }
  const handleSetSeconds = (e) => {
    const newSeconds = parseInt(e.target.value)
    if (newSeconds >= 0 && newSeconds <= 59) {
      setSeconds(newSeconds)
    }
  }
  const resetTimer = () => {
    setIsActive(false)
    setHours(initialTime.hours)
    setMinutes(initialTime.minutes)
    setSeconds(initialTime.seconds)
  }
  return (
    <div>
      {isEditing ? (
        <div className="w-full flex justify-center font-mono relative">
          <div>
            <InputField label={'Hours'} value={hours} onChange={(e) => handleSetHours(e)} />
            <InputField label={'Minutes'} value={minutes} onChange={(e) => handleSetMinutes(e)} />
            <InputField label={'Seconds'} value={seconds} onChange={(e) => handleSetSeconds(e)} />
            <button
              className="hover:brightness-120 cursor-pointer bg-emerald-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-100"
              onClick={handleSetTime}
            >
              &#10004;
            </button>
            <button
              className="absolute -bottom-1 right-1 hover:brightness-150 cursor-pointer text-3xl text-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              onClick={() => {
                setHours(0), setMinutes(0), setSeconds(0)
              }}
            >
              &#8634;
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <h1 className="text-emerald-500 font-mono text-6xl">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
          </div>
          <div
            id="timer-button"
            className={
              !isOverlay
                ? 'mt-3 text-stone-500 flex justify-center bg-slate-950/10 rounded-xl'
                : 'hidden'
            }
          >
            {isActive ? (
              <>
                <button
                  className="hover:brightness-150 cursor-pointer text-2xl text-amber-400 m-2"
                  onClick={() => setIsActive(false)}
                >
                  &#9612;&#9612;
                </button>
                <button
                  className="hover:brightness-150 cursor-pointer text-5xl text-rose-600 m-2"
                  onClick={resetTimer}
                >
                  &#9632;
                </button>
              </>
            ) : (
              <>
                <button
                  className="hover:brightness-150 cursor-pointer text-5xl text-emerald-400 m-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                  onClick={handleStart}
                >
                  &#9658;
                </button>
                <button
                  className="hover:brightness-150 cursor-pointer text-4xl text-amber-400 m-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  onClick={() => setIsEditing(true)}
                >
                  &#9998;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Timer
