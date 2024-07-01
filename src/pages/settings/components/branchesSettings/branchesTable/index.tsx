import CustomTable from '../../../../../components/common/table'
import { branchesColumns } from '../../../../../utils/tableColumns/branchesColumns'
import useBranchStore from '../../../../../stores/branchesStore'

const BranchesTable = () => {

    const {branches} = useBranchStore()

  return (
    <div className='branchesTableWrapper'>
        <CustomTable data={branches} columns={branchesColumns()} />
    </div>
  )
}

export default BranchesTable