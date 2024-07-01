import { useEffect, useState } from 'react'
import { FaEye, FaPlay, FaStop } from 'react-icons/fa'
import { FaRepeat } from 'react-icons/fa6'
import useTablesStore from '../../../../stores/tablesStore'
import { IoMdClose } from 'react-icons/io'
import useTariffsStore from '../../../../stores/tariffsStore'
import useDurationStore from '../../../../stores/durationsStore'
import { addHours, format, parseISO } from 'date-fns'
import { startTable, stopTable, updateRunningTable } from '../../../../services/tables'
import './selectedTable.sass'
import { Button, Tooltip } from 'antd'
import { MdFastfood, MdNextPlan } from 'react-icons/md'
import { SiFreecodecamp } from 'react-icons/si'
import useModalStore from '../../../../stores/modalStore'
import useMenuStore from '../../../../stores/menuStore'
import { toZonedTime } from 'date-fns-tz'

type SelectedTableProps = {
  tableId: number | null
  tariffId: number | null
  startTime: string
  startTimeISO?: string
  price: number
  duration?: number
}

const SelectedTable = () => {
  const { selectedTable, selectTable } = useTablesStore()

  const { runningTables } = useTablesStore()

  return (
    <div className={`selectedTable ${!selectedTable && 'hiddenTable'}`}>
      <IoMdClose className='closeIcon' onClick={() => selectTable(null)} />
      <p>Table {selectedTable?.id}</p>
      {runningTables.find(rt => rt.tableId === selectedTable?.id) ? (
        <OnlineSelectedTable />
      ) : (
        <OfflineSelectedTable />
      )}
    </div>
  )
}

export default SelectedTable

const OfflineSelectedTable = () => {
  const { selectedTable } = useTablesStore()
  const { tariffs, getTariffsToStore } = useTariffsStore()
  const { durations, getDurationsToStore } = useDurationStore()
  const { runningTables, getTablesToStore, getRunningTablesToStore } =
    useTablesStore()
  const [localSelectedTable, setLocalSelectedTable] =
    useState<SelectedTableProps>({
      tariffId: null,
      tableId: null,
      price: 0,
      startTime: '',
      startTimeISO: '',
      duration: 0
    })

  useEffect(() => {
    getTariffsToStore()
    getDurationsToStore()
  }, [])

  useEffect(() => {
    if (selectedTable) {
      const now = new Date()
      console.log('now: ', now)
      const zonedDate = toZonedTime(now, 'Asia/Baku') // Convert to UTC+4
      console.log('zonedDate: ', zonedDate)
      const formattedTime = format(zonedDate, 'HH:mm') // Format time as HH:MM for display
      console.log('formattedTime: ', formattedTime)
      setLocalSelectedTable({
        ...selectedTable,
        tariffId: tariffs[0]?.id || null,
        tableId: selectedTable.id,
        startTime: formattedTime,
        price: tariffs[0]?.price || 0
      })
    }
  }, [tariffs, selectedTable])

  const handleSelectedTable = (key: string) => (e: any) => {
    setLocalSelectedTable({
      ...localSelectedTable,
      [key]: e.target.value
    })

    if (key === 'tariffId') {
      setLocalSelectedTable({
        ...localSelectedTable,
        price: tariffs.find(t => t.id == e.target.value)?.price || 0,
        [key]: e.target.value
      })
    }
  }

  const handleTableTimer = () => {
    const tableOn = runningTables.find(rt => rt.tableId === selectedTable?.id)
    if (tableOn) {
      stopTable(localSelectedTable?.tableId || 0).finally(() => {
        getTablesToStore()
        getRunningTablesToStore()
      })
    } else {
      const dateString = format(new Date(), 'yyyy-MM-dd') // Get current date in 'YYYY-MM-DD' format
      const dateTimeString = `${dateString}T${localSelectedTable.startTime}:00.000Z` // Append time to date
      const now = new Date(dateTimeString) // Create Date object
      const formattedTimeISO = now.toISOString() // Get time in ISO 8601 format for backend
      startTable({
        ...localSelectedTable,
        startTime: formattedTimeISO
      }).finally(() => {
        getTablesToStore()
        getRunningTablesToStore()
      })
    }
  }

  return (
    <>
      <div className='controlItem'>
        <label>Tarif</label>
        <select
          value={localSelectedTable?.tariffId || tariffs[0]?.id}
          onChange={handleSelectedTable('tariffId')}
        >
          {tariffs.map(tariff => (
            <option key={tariff.id} value={tariff.id}>
              {tariff.name}
            </option>
          ))}
        </select>
      </div>
      <div className='controlItem'>
        <label>Başlama saatı</label>
        <input
          type='time'
          value={localSelectedTable.startTime}
          onChange={handleSelectedTable('startTime')}
        />
      </div>
      <div className='controlItem'>
        <label>Müddət</label>
        <select
          value={localSelectedTable?.duration || 0}
          onChange={handleSelectedTable('duration')}
        >
          {durations.map(duration => (
            <option key={duration.id} value={duration.seconds}>
              {duration.name}
            </option>
          ))}
          <option value={0}>müddətsiz</option>
        </select>
      </div>

      <div className='controlItem'>
        <label>Qiymət</label>
        <input
          type='number'
          value={
            localSelectedTable.price
          }
          onChange={handleSelectedTable('price')}
        />
      </div>
      <div className='controlBtns__main'>
        <button onClick={handleTableTimer}>
          <FaPlay className='startIcon' /> Başlat
        </button>
      </div>
    </>
  )
}

const OnlineSelectedTable = () => {
  const { selectedTable } = useTablesStore()
  const { toggleModal } = useModalStore()
  const { tariffs, getTariffsToStore } = useTariffsStore()
  const { durations, getDurationsToStore } = useDurationStore()
  const { runningTables, getTablesToStore, getRunningTablesToStore } =
    useTablesStore()
  const { setMenuToStore } = useMenuStore()
  const [localSelectedTable, setLocalSelectedTable] =
    useState<SelectedTableProps>({
      tariffId: null,
      tableId: null,
      price: 0,
      startTime: '',
      startTimeISO: '',
      duration: 0
    })

  useEffect(() => {
    getTariffsToStore()
    getDurationsToStore()
    setMenuToStore()
  }, [])

  const handleSelectedTable = (key: string) => (e: any) => {
    setLocalSelectedTable({
      ...localSelectedTable,
      [key]: e.target.value
    })

    if (key === 'tariffId') {
      setLocalSelectedTable({
        ...localSelectedTable,
        price: tariffs.find(t => t.id == e.target.value)?.price || 0,
        [key]: e.target.value
      })
    }
  }

  useEffect(() => {
    if (selectedTable && tariffs[0]?.id) {
      const stringedTime = addHours(
        parseISO(
          //@ts-ignore
          runningTables.find(rt => rt.tableId === selectedTable.id)?.startTime
        ),
        -4
      )

      const localedStringedTime = format(stringedTime, 'HH:mm')
      setLocalSelectedTable({
        ...selectedTable,
        tariffId:
          runningTables.find(rt => rt.tableId === selectedTable.id)?.tariffId ||
          tariffs[0]?.id,
        tableId: selectedTable.id,
        startTime: localedStringedTime,
        price:
          runningTables.find(rt => rt.tableId === selectedTable.id)?.price ||
          tariffs[0]?.price
      })
    }
  }, [tariffs, selectedTable])

  const handleTableTimer = (action: string) => (/* e: any */) => {
    if (action === 'stop') {
      /* stopTable(selectedTable.id).finally(() => {
        getTablesToStore()
        getRunningTablesToStore()
      }) */
      toggleModal('del', 'table stop')
    } else {
      /* startTable({
        ...selectedTable,
        startTime: localSelectedTable.startTimeISO
      }).finally(() => {
        getTablesToStore()
        getRunningTablesToStore()
      }) */
      // updating running table
      // updateRunningTable({
        
      // })
      const dateString = format(new Date(), 'yyyy-MM-dd') // Get current date in 'YYYY-MM-DD' format
      const dateTimeString = `${dateString}T${localSelectedTable.startTime}:00.000Z` // Append time to date
      const now = new Date(dateTimeString) // Create Date object
      const formattedTimeISO = now.toISOString() // Get time in ISO 8601 format for backend
      updateRunningTable({
        ...localSelectedTable,
        startTime: formattedTimeISO
      }).finally(() => {
        getTablesToStore()
        getRunningTablesToStore()
      })
    }
  }

  const handleOrderModal = () => {
    toggleModal('add', 'order')
  }

  const handleChangeTableModal = () => {
    toggleModal('edit', 'table')
  }

  const handleFreeTableModal = () => {
    toggleModal('del', 'table')
  }

  const handleOrdersModal = () => {
    toggleModal('edit', 'orders')
  }

  return (
    <>
      <div className='controlItem'>
        <label>Tarif</label>
        <select
          value={localSelectedTable?.tariffId || tariffs[0]?.id}
          onChange={handleSelectedTable('tariffId')}
          disabled
        >
          {tariffs.map(tariff => (
            <option key={tariff.id} value={tariff.id}>
              {tariff.name}
            </option>
          ))}
        </select>
      </div>
      <div className='controlItem'>
        <label>Başlama saatı</label>
        <input
          type='time'
          value={localSelectedTable.startTime}
          onChange={handleSelectedTable('startTime')}
        />
      </div>
      <div className='controlItem'>
        <label>Müddət</label>
        <select
          value={localSelectedTable?.duration || 0}
          onChange={handleSelectedTable('duration')}
        >
          {durations.map(duration => (
            <option key={duration.id} value={duration.seconds}>
              {duration.name}
            </option>
          ))}
          <option value={0}>müddətsiz</option>
        </select>
      </div>
      <div className='controlItem'>
        <label>Menyu xərci</label>
        {/* <InputNumber
          disabled
          value={
            runningTables
              .find(table => table.tableId === selectedTable.id)
              ?.orders.reduce((total, order) => total + order.totalPrice, 0) || 0
          }
        /> */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input
            type='text'
            value={Number(
              runningTables
                .find(table => table.tableId === selectedTable?.id)
                ?.orders.reduce(
                  (total, order) => total + parseFloat(order.totalPrice),
                  0
                )
            ).toFixed(2)}
            disabled
            style={{ width: '80%' }}
            prefix='AZN'
          />
          <Tooltip title='Sifarişlər' color='orange'>
            <Button onClick={handleOrdersModal} className='checkOrdersBtn'>
              <FaEye className='checkOrdersIcon' />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className='controlItem'>
        <label>Qiymət</label>
        <input
          type='number'
          value={localSelectedTable.price}
          onChange={handleSelectedTable('price')}
        />
      </div>
      <div className='controlBtns'>
        <div className='controlBtns__helpers'>
          <Tooltip title='Menyu' color='orange'>
            <Button onClick={handleOrderModal}>
              <MdFastfood />
            </Button>
          </Tooltip>
          <Tooltip title='Masa dəyişdir' color='blue'>
            <Button onClick={handleChangeTableModal}>
              <MdNextPlan />
            </Button>
          </Tooltip>
          <Tooltip title='Pulsuz dayandır' color='red'>
            <Button onClick={handleFreeTableModal}>
              <SiFreecodecamp />
            </Button>
          </Tooltip>
        </div>
        <div className='controlBtns__main'>
          <button className='updateBtn' onClick={handleTableTimer('update')}>
            <FaRepeat className='startIcon' /> Güncəllə
          </button>
          <button className='stopBtn' onClick={handleTableTimer('stop')}>
            <FaStop className='stopIcon' /> Dayandır
          </button>
        </div>
      </div>
    </>
  )
}
