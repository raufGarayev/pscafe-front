import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import useBranchStore from '../../../stores/branchesStore'
import { Dropdown, MenuProps } from 'antd'
import { FaAngleDown } from "react-icons/fa6";
import './header.sass'


const Header = () => {
  const { user } = useContext(AuthContext)
  const { branches } = useBranchStore()

  const items: MenuProps['items'] = [
    {
      label: 'Filialı dəyiş',
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: 'Çıxış',
      key: '1',
      onClick: () => {
        localStorage.removeItem('psToken')
        window.location.reload()
      }
    },
  ];

  return (
    <div className='header'>
      <div className='container'>
        <div className='header_logo'>
          <Link to='/'>
            <h3>LOGO</h3>
          </Link>
        </div>
        <div className='header_nav'>
          <ul>
            <li>
              <Link to='/menu'>Menyu</Link>
            </li>
            <li>
              <Link to='#'>Statistika</Link>
            </li>
            <li>
              <Link to='/settings'>Sazlamalar</Link>
            </li>
          </ul>
        </div>
        <div className='header_user'>
          
          <Dropdown menu={{ items }} trigger={['click']}>
            <a onClick={e => e.preventDefault()}>
            <button className='header_user__profile'>
            <span>{user.cafeName}</span>
            <span>
              [{branches.find(b => b.id === user.selectedBranch)?.name}]
            </span>
            <FaAngleDown />
          </button>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header
