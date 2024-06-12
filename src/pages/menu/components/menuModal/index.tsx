import React, { useEffect } from 'react'
import useModalStore from '../../../../stores/modalStore'
import CustomModal from '../../../../components/common/modal'
import { Form, Input } from 'antd'
import useMenuStore from '../../../../stores/menuStore'
import { createMenuItem, deleteMenuItem, updateMenuItem } from '../../../../services/menu'
import { toast } from 'react-toastify'

const MenuModal = () => {

    const {toggleModal, type} = useModalStore()
    const {selectedMenu, setSelectedMenu, setMenuToStore} = useMenuStore()
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue(selectedMenu)
    }, [selectedMenu])

    const handleFormChange = (values: any) => {
        setSelectedMenu({...selectedMenu, ...values})
    }

    const handleModalSubmit = () => {
        if(type === 'edit') {
            updateMenuItem(selectedMenu).then(res => {
                setSelectedMenu(null)
                toggleModal()
                toast.success(res.data.message)
                setMenuToStore()
            })
        } else if (type === 'add'){
            createMenuItem(selectedMenu).then(res => {
                setSelectedMenu(null)
                toggleModal()
                toast.success(res.data.message)
                setMenuToStore()
            })
        } else {
            deleteMenuItem(selectedMenu.id).then(res => {
                setSelectedMenu(null)
                toggleModal()
                toast.success(res.data.message)
                setMenuToStore()
            })
        }
    }

    const handleModalCancel = () => {
        setSelectedMenu(null)
        toggleModal()
        form.resetFields()
    }

  return (
    <CustomModal
        onOk={handleModalSubmit}
        onCancel={handleModalCancel}
        header={`Menyu ${type === 'edit' ? 'redaktə' : 'əlavə'} et`}
        saveBtnText='Yadda saxla'
        cancelBtnText='Ləğv et'
    >
        <Form form={form} layout='vertical' onValuesChange={handleFormChange}>
            <Form.Item label="Ad" name={'name'}>
                <Input />
            </Form.Item>
            <Form.Item label="Qiymət" name={'price'}>
                <Input />
            </Form.Item>
        </Form>
    </CustomModal>
  )
}

export default MenuModal