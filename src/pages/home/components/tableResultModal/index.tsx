import { useEffect, useState } from 'react'
import CustomModal from '../../../../components/common/modal'
import useMenuStore from '../../../../stores/menuStore'
import useModalStore from '../../../../stores/modalStore'
import { MenuItem, Order } from '../../../../types/menu'
import { dateToHours, dateToRealTime } from '../../../../utils/findCost'
import useTariffsStore from '../../../../stores/tariffsStore'
import './tableResultModal.sass'

interface TableResultLocalData {
  startTime: string
  stopTime: string
  totalPlayedTime: string | number | undefined
  totalGamePrice: string | number
  orders: any[]
  totalOrdersPrice: string
}


const calculateLocalData = (
  data: any,
  menu: MenuItem[],
): TableResultLocalData => {
  const startTime = dateToRealTime(data.startTime)
  const stopTime = dateToRealTime(data.stopTime)
  const totalPlayedTime = dateToHours(data.startTime, true, data.stopTime)
  //@ts-ignore
  const totalGamePrice = data.totalPrice
  const orders = data.orders.map((order: Order) => ({
    ...order,
    //@ts-ignore
    name: menu.find((m: MenuItem) => m.id === order.menuId)?.name
  }))
  const totalOrdersPrice = Number(
    data.orders.reduce(
      (total: number, order: Order) => total + Number(order.totalPrice),
      0
    )
  ).toFixed(2)

  return {
    startTime,
    stopTime,
    totalPlayedTime,
    totalGamePrice,
    orders,
    totalOrdersPrice
  }
}

const TableResultModal = () => {
  const [localData, setLocalData] = useState<TableResultLocalData>({
    startTime: '',
    stopTime: '',
    totalPlayedTime: '',
    totalGamePrice: 0,
    orders: [],
    totalOrdersPrice: ''
  })
  const { data, toggleModal } = useModalStore()
  const { menu } = useMenuStore()
  const { tariffs } = useTariffsStore()

  useEffect(() => {
    setLocalData(calculateLocalData(data, menu))
  }, [data, menu, tariffs])

  const handleModalCancel = () => {
    toggleModal('', '', null)
  }

  return (
    <CustomModal
      onOk={() => {}}
      onCancel={handleModalCancel}
      footer={false}
      header='Hesabat'
    >
      <div className='tableResultModal'>
        <div className='tableResultModal__game'>
          <div className='tableResultModal__header'>
            <h3>Oyun</h3>
          </div>
          <div className='tableResultModal__content'>
            <div className='tableResultModal__content-item'>
              <p>Başlama vaxtı</p>
              <span>{localData.startTime}</span>
            </div>
            <div className='tableResultModal__content-item'>
              <p>Bitiş vaxtı</p>
              <span>{localData.stopTime}</span>
            </div>
            <div className='tableResultModal__content-item'>
              <p>Ümumi vaxt</p>
              <span>{localData.totalPlayedTime}</span>
            </div>
          </div>

          <p className='totalGame'>
            Ümumi oyun məbləği: <span>{localData.totalGamePrice} AZN</span>
          </p>
        </div>
        {localData.orders.length > 0 && (
          <div className='tableResultModal__menu'>
            <div className='tableResultModal__header'>
              <h3>Sifarişlər</h3>
            </div>
            <div className='tableResultModal__orders'>
              {localData.orders?.map((order: any) => (
                <div className='tableResultModal__orders-item'>
                  <span>{order.name}</span>
                  <span>x{order.amount}</span>
                  <span>{order.totalPrice} AZN</span>
                </div>
              ))}
              <p className='totalOrders'>
                Ümumi sifarişlərin məbləği:{' '}
                <span>
                  {localData.totalOrdersPrice}
                  AZN
                </span>
              </p>
            </div>
          </div>
        )}
        <div className='tableResultModal__result'>
          <p>Ümumi məbləğ</p>
          <span>
            {(
              Number(localData.totalGamePrice) +
              Number(localData.totalOrdersPrice)
            ).toFixed(2) || 0}{' '}
            AZN
          </span>
        </div>
      </div>
    </CustomModal>
  )
}

export default TableResultModal
