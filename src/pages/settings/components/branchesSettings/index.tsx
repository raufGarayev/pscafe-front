import { Button } from 'antd'
import BranchesTable from './branchesTable'
import './branchesSettings.sass'
import useModalStore from '../../../../stores/modalStore'
import BranchRenameModal from './branchRenameModal'

const BranchesSettings = () => {

  const {toggleModal} = useModalStore()

  const openBranchRenameModal = () => {
    toggleModal('edit')
  }

  return (
    <div className='branchesSettings'>
        <div className="branchesSettings__header">
            <h3>Filiallar</h3>
            <Button className='renameBranchBtn' onClick={openBranchRenameModal}>Hazırki filial adını dəyiş</Button>
        </div>
        <BranchesTable />
        <BranchRenameModal />
    </div>
  )
}

export default BranchesSettings