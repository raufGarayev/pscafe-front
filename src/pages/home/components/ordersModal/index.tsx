import { useEffect, useState } from 'react'
import CustomModal from '../../../../components/common/modal'
import CustomTable from '../../../../components/common/table'
import { ordersColumns } from '../../../../utils/tableColumns/ordersColumns'
import useTablesStore from '../../../../stores/tablesStore'
import useMenuStore from '../../../../stores/menuStore'
import useModalStore from '../../../../stores/modalStore'
import { MenuItem, Order } from '../../../../types/menu'

const OrdersModal = () => {

    const [orders, setOrders] = useState<Order[]>([])
    const {selectedTable, runningTables} = useTablesStore()
    const {menu} = useMenuStore()
    const {toggleModal} = useModalStore()

    useEffect(() => {
       if(selectedTable?.id) {
        let uOrders: Order[] = runningTables.find((rt) => rt.tableId === selectedTable.id)?.orders || [] as Order[];
        if (selectedTable) {
            setOrders(uOrders.map(order => {
                const menuItem = menu.find((item: MenuItem) => item.id === order.menuId) || {} as MenuItem;
                return {
                    ...order,
                    name: menuItem?.name
                };
            }));
        }
       }
    }, []);

    const handleCancelModal = () => {
        toggleModal('');
    }

  return (
    <CustomModal
        onOk={() => {}}
        onCancel={handleCancelModal}
        header='Sifarişlər'
        footer={false}

    >
        <CustomTable
            data={orders}
            columns={ordersColumns()}
            paginationOptions={false}
        />
    </CustomModal>
  )
}

export default OrdersModal