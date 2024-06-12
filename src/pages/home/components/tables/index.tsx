import { useEffect } from 'react'
import useTablesStore from '../../../../stores/tablesStore'
import { calculatePrice, dateToHours, formatDuration } from '../../../../utils/findCost'
import './tables.sass'
import useTariffsStore from '../../../../stores/tariffsStore'
import { RunningTable, Table } from '../../../../types/tables'
import { addHours } from 'date-fns'
import { toast } from 'react-toastify'
import { stopTable } from '../../../../services/tables'
import useModalStore from '../../../../stores/modalStore'

const Tables = () => {
  const {
    selectTable,
    tables,
    getTablesToStore,
    runningTables,
    getRunningTablesToStore,
    selectedTable
  } = useTablesStore()
  const { tariffs } = useTariffsStore()
  const {toggleModal} = useModalStore()

  useEffect(() => {
    getTablesToStore()
    getRunningTablesToStore()
  }, [])

  const calculateTariffPrice = (runningTable: RunningTable) => {
    const tariff = tariffs.find(t => t.id === runningTable.tariffId);
    if (tariff && tariff.onOffPrice > 0) {
      //@ts-ignore
      const hours = +dateToHours(runningTable.startTime, false);
      if (hours <= 0.5) {
        return tariff.price;
      }
    }
    return calculatePrice(
      dateToHours(runningTable.startTime, false),
      runningTable.price
    );
  }



  const calculateRemainingTime = (startTime: Date, duration: number, table: Table) => {
    const now = addHours(new Date(), 4)
    const endTime = new Date(startTime.getTime() + duration * 1000);
    const remainingTimeInSeconds = Math.max(Math.floor((endTime.getTime() - now.getTime()) / 1000), 0);

    if(remainingTimeInSeconds <= 0) {
      toast.error(`Masa ${table.id} vaxtı bitdi`, {
        autoClose: false,
        closeOnClick: true,
        onClick: () => {
          stopTable(table.id).then((res) => {
            // toggleModal()
            // toast.success(res.data.message)
            // getTablesToStore()
            // getRunningTablesToStore()
            toast.success(res.data.message)
            getTablesToStore()
            getRunningTablesToStore()
            toggleModal('stop', 'result', res.data.data)
        })
      }})
    }
    return formatDuration(remainingTimeInSeconds);
  }

  return (
    <div className='tables' style={selectedTable ? { gap: 20 } : {}}>
      {tables.map(table => {
        const runningTable = runningTables.find(rt => rt.tableId == table.id);
        const price = runningTable ? calculateTariffPrice(runningTable) : 0;
        return (
          <div
            key={table.id}
            className={`singleTable ${
              selectedTable?.id === table.id && 'selectedSingleTable'
            }`}
          >
            <div
              onClick={() => selectTable(table)}
              className={`monitor turned${runningTable ? 'On' : 'Off'} `}
            >
              {(
                Number(price) +
                runningTable?.orders.reduce(
                  (total, order) => total + parseFloat(order.totalPrice),
                  0
                )
              ).toFixed(2)}{' '}
              AZN
            </div>
            <span>Table {table.id}</span>
            {
              runningTable && (
                <span>
                  {runningTable.duration ? calculateRemainingTime(new Date(runningTable.startTime), runningTable.duration, table) : dateToHours(runningTable.startTime)}
                </span>
              )
            }
          </div>
        )
      })}
    </div>
  )
}

export default Tables