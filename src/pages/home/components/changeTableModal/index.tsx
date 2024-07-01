import  {  useState } from 'react'
import CustomModal from '../../../../components/common/modal'
import useModalStore from '../../../../stores/modalStore'
import { Select } from 'antd'
import useTablesStore from '../../../../stores/tablesStore'
import { Table } from '../../../../types/tables'
import { stopTable, transferTable } from '../../../../services/tables'
import { toast } from 'react-toastify'

const ChangeTableModal = () => {
  const { toggleModal, type, hint } = useModalStore()
  const { tables, selectedTable, getTablesToStore, getRunningTablesToStore } =
    useTablesStore()
  const [selectedNewTable, setSelectedNewTable] = useState<number | null>(null)

  const handleModalCancel = () => {
    toggleModal()
  }

  const handleModalSubmit = () => {
    if (type === 'edit') {
      if (selectedTable?.id) {
        transferTable({
          tableId: selectedTable.id,
          newTableId: selectedNewTable
        }).then(res => {
          toggleModal()
          toast.success(res.data.message)
          getTablesToStore()
          getRunningTablesToStore()
        })
      }
    } else if (type === 'del' && !hint?.includes('stop')) {
      if (selectedTable?.id) {
        stopTable(selectedTable.id, { free: true }).then(res => {
          toggleModal()
          toast.success(res.data.message)
          getTablesToStore()
          getRunningTablesToStore()
        })
      }
    } else if (type === 'del' && hint?.includes('stop')) {
      if (selectedTable?.id) {
        stopTable(selectedTable.id).then((res) => {
          // toggleModal()
          // toast.success(res.data.message)
          // getTablesToStore()
          // getRunningTablesToStore()
          toast.success(res.data.message)
          getTablesToStore()
          getRunningTablesToStore()
          toggleModal()
          toggleModal('stop', 'result', res.data.data)
        })
        
      }
    }
  }

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header='Menyu əlavə et'
      saveBtnText='Yadda saxla'
      cancelBtnText='Ləğv et'
      delBtnText='Dayandır'
    >
      <div className='orderModal'>
        <label>Masa seçin</label>
        <Select
          className='orderModal__Select'
          options={tables.map((item: Table) => ({
            label: `Table ${item.id}`,
            value: item.id
          }))}
          value={selectedNewTable}
          onChange={value => setSelectedNewTable(value)}
        />
      </div>
    </CustomModal>
  )
}

export default ChangeTableModal
