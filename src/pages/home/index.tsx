import Tables from './components/tables'
import SelectedTable from './components/selectedTable'
import './home.sass'
import useTablesStore from '../../stores/tablesStore'
import OrderModal from './components/orderModal'
import useModalStore from '../../stores/modalStore'
import ChangeTableModal from './components/changeTableModal'
import OrdersModal from './components/ordersModal'
import TableResultModal from './components/tableResultModal'

const Home = () => {
  const { selectedTable } = useTablesStore()
  const {hint} = useModalStore()

  return (
    <div className='home'>
      {selectedTable && <SelectedTable />}
      <Tables />
      {hint === "order" && <OrderModal />}
      {hint === 'orders' && <OrdersModal />}
      {hint?.includes("table") && <ChangeTableModal />}
      {hint === 'result' && <TableResultModal />}
    </div>
  )
}

export default Home
