import { useEffect } from 'react'
import './tariffSettings.sass'
import { createTariff, deleteTariff, updateTariff } from '../../../../services/tariffs'
import { Tariff } from '../../../../types/tariffs'
import useTariffsStore from '../../../../stores/tariffsStore'

const TariffSettings = () => {
  const { tariffs, selectedTariff, setTariffs, setSelectedTariff, getTariffsToStore } = useTariffsStore()

  useEffect(() => {
    getTariffsToStore()
  }, [])

  const handleInputChange =
    (key: string, id?: number | undefined) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (id) {
        setTariffs(
          tariffs.map((tariff) => {
            if (tariff.id === id) {
              return {
                ...tariff,
                [key]: e.target.value
              }
            }
            return tariff
          })
        )
      } else {
        //@ts-ignore
        setSelectedTariff({
          ...selectedTariff,
          [key]: e.target.value
        })
      }
    }

    const handleNewTariff = () => {
      createTariff(selectedTariff).then((res) => {
        if (res) {
          setTariffs([...tariffs, res])
          setSelectedTariff(null)
        }
      })
    }

    const handleTariffUpdate = (tariff: Tariff) => () => {
      updateTariff(tariff).then((res) => {
        if (res) {
          setTariffs(
            tariffs.map((t) => {
              if (t.id === tariff.id) {
                return res
              }
              return t
            })
          )
        }
      })
    }

    const handleTariffDelete = (id?: number) => () => {
      if(id) {
        deleteTariff(id).then((res) => {
          if (res) {
            setTariffs(tariffs.filter((t) => t.id !== id))
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
        <span>Qiymət</span>
        <span>İlk 30 dəq qiymət</span>
        <span>Əməliyyatlar</span>
      </div>

      <div className='tariffs'>
        <div className='tariff'>
          <span>#</span>
          <input type='text' className='tariffName' value={selectedTariff?.name || ''} onChange={handleInputChange('name')} />
          <input type='number' className='tariffPrice' value={selectedTariff?.price || ''} onChange={handleInputChange('price')}/>
          <input type='number' className='tariffOnOffPrice' value={selectedTariff?.onOffPrice || ''} onChange={handleInputChange('onOffPrice')} />
          <div>
            <button onClick={handleNewTariff} className='saveBtn'>Əlavə et</button>
          </div>
        </div>
        {tariffs.map((tariff, index) => (
          <div key={tariff.id} className='tariff'>
            <span>{index + 1}</span>
            <input
              type='text'
              className='tariffName'
              value={tariff.name}
              onChange={handleInputChange('name', tariff.id)}
            />
            <input
              type='number'
              className='tariffPrice'
              value={tariff.price}
              onChange={handleInputChange('price', tariff.id)}
            />
            <input
              type='number'
              className='tariffOnOffPrice'
              value={tariff.onOffPrice}
              onChange={handleInputChange('onOffPrice', tariff.id)}
            />
            <div>
              <button className='saveBtn' onClick={handleTariffUpdate(tariff)}>Yadda saxla</button>
              <button className='delBtn' onClick={handleTariffDelete(tariff.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TariffSettings
