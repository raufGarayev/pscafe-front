import { useEffect } from 'react'
import CustomModal from '../../../../components/common/modal'
import { Form, InputNumber, Select } from 'antd'
import useMenuStore from '../../../../stores/menuStore'
import { MenuItem } from '../../../../types/menu'
import './orderModal.sass'
import useModalStore from '../../../../stores/modalStore'
import useTablesStore from '../../../../stores/tablesStore'
import { addMenuToTable } from '../../../../services/tables'
import { toast } from 'react-toastify'

const OrderModal = () => {
  const { setMenuToStore, menu } = useMenuStore()
  const {selectedTable, selectTable} = useTablesStore()
  const { toggleModal } = useModalStore()
  const [form] = Form.useForm()

  useEffect(() => {
    setMenuToStore()
  }, [])

  const handleModalCancel = () => {
    toggleModal('')
  }


  const handleModalSubmit = () => {
    addMenuToTable({
        ...form.getFieldsValue(),
        runningTableId: selectedTable?.id,
        //@ts-ignore
        totalPrice: menu.find((item: MenuItem) => item.id === form.getFieldValue('menuId'))?.price * form.getFieldValue('amount')
    }).then(res => {
        toggleModal()
        selectTable(null)
        toast.success(res.data.message)
    })
  }

  return (
    <CustomModal
      onOk={handleModalSubmit}
      onCancel={handleModalCancel}
      header='Menyu əlavə et'
      saveBtnText='Yadda saxla'
      cancelBtnText='Ləğv et'
    >
      <div className='orderModal'>
        <Form layout='vertical' form={form}>
          <Form.Item label='Sifariş seçin' name={'menuId'}>
            <Select
              className='orderModal__Select'
              options={menu.map((item: MenuItem) => ({
                label: item.name,
                value: item.id
              }))}
            />
          </Form.Item>
          <Form.Item label='Ədəd' name={'amount'}>
            <InputNumber />
          </Form.Item>
        </Form>
      </div>
    </CustomModal>
  )
}

export default OrderModal
