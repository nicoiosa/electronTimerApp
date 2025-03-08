import { useEffect, useState } from 'react'
import InputField from './InputField'
import alarm from '../assets/sounds/alarm-sound.mp3'

const Timer = ({ isOverlay }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
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
            setIsActive(false)
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
  return (
    <div>
      {isEditing ? (
        <div className="flex justify-center">
          <div>
            <InputField
              label={'Hours'}
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
            />
            <InputField
              label={'Minutes'}
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
            />
            <InputField
              label={'Seconds'}
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
            />
            <button
              className="bg-blue-500 text-stone-200 px-20 py-1 rounded-xl text-xl mt-1 ml-1"
              onClick={() => setIsEditing(false)}
            >
              &#10004;
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <h1 className="text-emerald-500 text-6xl">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</h1>
          </div>
          <div
            id="timer-button"
            className={
              !isOverlay
                ? 'mt-3 text-stone-500 flex justify-center bg-black/10 rounded-xl'
                : 'hidden'
            }
          >
            {isActive ? (
              <>
                <button className="text-2xl text-amber-400 m-2" onClick={() => setIsActive(false)}>
                  &#9612;&#9612;
                </button>
                <button
                  className="text-5xl text-rose-600 m-2"
                  onClick={() => {
                    setIsActive(false)
                    setHours(0)
                    setMinutes(0)
                    setSeconds(0)
                  }}
                >
                  &#9632;
                </button>
              </>
            ) : (
              <>
                <button className="text-5xl text-emerald-400 m-2" onClick={() => setIsActive(true)}>
                  &#9658;
                </button>
                <button className="text-4xl text-amber-400 m-2" onClick={() => setIsEditing(true)}>
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
