import { Button } from 'antd'
import MenuTable from './components/menuTable'
import './menu.sass'
import useModalStore from '../../stores/modalStore'
import MenuModal from './components/menuModal'
import useMenuStore from '../../stores/menuStore'
import { useEffect } from 'react'

const Menu = () => {

    const {setMenuToStore} = useMenuStore()
    const {toggleModal} = useModalStore()

    useEffect(() => {
        setMenuToStore()
    }, [])

    const handleModal = () => {
        toggleModal('add')
    }

  return (
    <div className='menu'>
        <div className="menu__head">
            <h3>Menyu</h3>
            <Button onClick={handleModal} type="primary">Əlavə et</Button>
        </div>
        <MenuTable />
        <MenuModal />
    </div>
  )
}

export default Menu