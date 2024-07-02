import { Link } from 'react-router-dom'
import './header.sass'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import useBranchStore from '../../../stores/branchesStore'

const Header = () => {

  const {user} = useContext(AuthContext)
  const {branches} = useBranchStore()

  return (
    <div className='header'>
      <div className='container'>
        <div className='header_logo'>
          <Link to="/"><h3>LOGO</h3></Link>
        </div>
        <div className='header_nav'>
          <ul>
            <li>
              <Link to="/menu">Menyu</Link>
            </li>
            <li>
              <Link to="#">Statistika</Link>
            </li>
            <li>
              <Link to='/settings'>Sazlamalar</Link>
            </li>
          </ul>
        </div>
        <div className='header_user'>
          <button className='header_user__profile'>
            <span>{user.cafeName}</span>
            <span>[{branches.find(b => b.id === user.selectedBranch)?.name}]</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
