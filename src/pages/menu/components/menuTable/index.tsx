import React from 'react'
import CustomTable from '../../../../components/common/table'
import { menuColumns } from '../../../../utils/tableColumns/menuColumns'
import useMenuStore from '../../../../stores/menuStore'
import { MenuItem } from '../../../../types/menu'
import useModalStore from '../../../../stores/modalStore'

const MenuTable = () => {

    const {menu, setSelectedMenu} = useMenuStore()
    const {toggleModal} = useModalStore()

    const handleMenuEdit = (menu: MenuItem) => {
        setSelectedMenu(menu)
        toggleModal('edit')
    }

    const handleMenuDel = (menu: MenuItem) => {
        setSelectedMenu(menu)
        toggleModal('del')
    }

  return (
   <CustomTable data={menu} columns={menuColumns(handleMenuEdit, handleMenuDel)} />
  )
}

export default MenuTable