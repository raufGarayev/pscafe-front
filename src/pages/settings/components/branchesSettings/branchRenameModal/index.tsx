import { useContext, useEffect } from 'react'
import CustomModal from '../../../../../components/common/modal'
import { Form, Input } from 'antd'
import useBranchStore from '../../../../../stores/branchesStore'
import { AuthContext } from '../../../../../context/authContext'
import { updateBranch } from '../../../../../services/branches'
import useModalStore from '../../../../../stores/modalStore'
import { toast } from 'react-toastify'

const BranchRenameModal = () => {

    const {branches, getBranchesToStore} = useBranchStore()
    const {toggleModal} = useModalStore()
    const {user} = useContext(AuthContext)
    const [form] = Form.useForm()
    
    useEffect(() => {
        form.setFieldValue('name', branches.find(branch => branch.id === user.selectedBranch)?.name)
    }, [])

    const handleModalSubmit = () => {
      console.log(form.getFieldsValue())
      updateBranch(user.selectedBranch, form.getFieldsValue()).then(() => {
        toggleModal()
        toast.success('Filial adı dəyişdirildi')
        getBranchesToStore()
      })
    }

  return (
    <CustomModal
        onCancel={() => {}}
        onOk={handleModalSubmit}
        header='Filial adını dəyişdir'
        saveBtnText='Yadda saxla'
        cancelBtnText='Ləğv et'
    >
        <Form form={form} layout='vertical'>
            <Form.Item name='name' label="Filial adı">
                <Input />
            </Form.Item>
        </Form>
    </CustomModal>
  )
}

export default BranchRenameModal