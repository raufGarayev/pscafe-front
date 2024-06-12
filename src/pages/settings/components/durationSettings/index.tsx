import { useEffect, useState } from 'react'
import '../tariffSettings/tariffSettings.sass'
import useDurationStore from '../../../../stores/durationsStore'
import { createDuration, deleteDuration, updateDuration } from '../../../../services/durations'
import { Duration } from '../../../../types/durations'

const DurationSettings = () => {
  const { durations, getDurationsToStore, selectedDuration, setDurations, setSelectedDuration } = useDurationStore()

  useEffect(() => {
    getDurationsToStore()
  }, [])

  const handleInputChange =
    (key: string, id?: number | undefined) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (id) {
        setDurations(
          durations.map((duration) => {
            if (duration.id === id) {
              return {
                ...duration,
                [key]: e.target.value
              }
            }
            return duration
          })
        )
      } else {
        //@ts-ignore
        setSelectedDuration({
          ...selectedDuration,
          [key]: e.target.value
        })
      }
    }

    const handleNewDuration = () => {
      createDuration(selectedDuration).then((res) => {
        if (res) {
          setDurations([...durations, res])
          setSelectedDuration(null)
        }
      })
    }

    const handleDurationUpdate = (duration: Duration) => () => {
      updateDuration(duration).then((res) => {
        if (res) {
          setDurations(
            durations.map((t) => {
              if (t.id === duration.id) {
                return res
              }
              return t
            })
          )
        }
      })
    }

    const handleDurationDelete = (id?: number) => () => {
      if(id) {
        deleteDuration(id).then((res) => {
          if (res) {
            setDurations(durations.filter((t) => t.id !== id))
          }
        })
      }
    }

  return (
    <div className='tariffSettings'>
      <h3>Tariflər</h3>

      <div className='tariffsHead'>
        <span>#</span>
        <span>Ad</span>
        <span>Dəqiqə</span>
        <span>Əməliyyatlar</span>
      </div>

      <div className='tariffs'>
        <div className='tariff'>
          <span>#</span>
          <input type='text' className='tariffName' value={selectedDuration?.name || ''} onChange={handleInputChange('name')} />
          <input type='number' className='tariffPrice' value={selectedDuration?.minutes || ''} onChange={handleInputChange('minutes')}/>
          <div>
            <button onClick={handleNewDuration} className='saveBtn'>Əlavə et</button>
          </div>
        </div>
        {durations.map((duration, index) => (
          <div key={duration.id} className='tariff'>
            <span>{index + 1}</span>
            <input
              type='text'
              className='tariffName'
              value={duration.name}
              onChange={handleInputChange('name', duration.id)}
            />
            <input
              type='number'
              className='tariffPrice'
              value={duration.seconds / 60}
              onChange={handleInputChange('price', duration.id)}
            />
            <div>
              <button className='saveBtn' onClick={handleDurationUpdate(duration)}>Yadda saxla</button>
              <button className='delBtn' onClick={handleDurationDelete(duration.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DurationSettings
