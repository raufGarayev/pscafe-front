import { useContext } from 'react'
import './generalSettings.sass'
import { AuthContext } from '../../../../context/authContext'
import { updateUserSettings } from '../../../../services/auth'

const GeneralSettings = () => {

    const {user, setUser} = useContext(AuthContext)

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        updateUserSettings({
            ...user,
            totalTables: +user.totalTables
        }).then((res) => {
            if (res) {
                setUser(res)
            }
        })
    }

    const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prevUser: any) => ({
            ...prevUser,
            [key]: e.target.value
        }))
    }

  return (
    <div className='generalSettings'>
        <h3>Ümumi sazlamalar</h3>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor='cafeName'>Cafe adı</label>
                <input type='text' id='cafeName' value={user.cafeName} onChange={handleInputChange('cafeName')} />
            </div>
            {/* <div>
                <label htmlFor="branchName">Filial adı</label>
                <input type="text" id="branchName" value={user.branchName} onChange={handleInputChange('branchName')} />
            </div> */}
            <div>
                <label htmlFor='totalTables'>Masa sayı</label>
                <input type='number' id='totalTables'  value={+user.totalTables} onChange={handleInputChange('totalTables')}/>
            </div>
            
            <button type='submit'>Yadda saxla</button>
        </form>
    </div>
  )
}

export default GeneralSettings