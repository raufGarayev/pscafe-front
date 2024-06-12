import { Button, Modal } from 'antd';
import useModalStore from '../../../stores/modalStore';
import './modal.sass';

interface CustomModalProps {
    children?: React.ReactNode;
    onOk: () => void;
    onCancel: () => void;
    saveBtnText?: string;
    cancelBtnText?: string;
    header?: string;
    delBtnText?: string;
    footer?: boolean;
}

const CustomFooter = ({ onCancel, onOk, delBtnText }: CustomModalProps) => (
    <div className='modalFooter'>
        <Button onClick={onCancel}>Ləğv et</Button>
        <Button type='primary' onClick={onOk} danger>
            {delBtnText ? delBtnText : 'Sil'}
        </Button>
    </div>
);

const DefaultFooter = ({ onCancel, onOk, saveBtnText, cancelBtnText }: CustomModalProps) => (
    <div className='modalFooter'>
        <Button className='cancelBtnModal' onClick={onCancel}>{cancelBtnText}</Button>
        <Button className='saveBtnModal' type='primary' onClick={onOk}>
            {saveBtnText}
        </Button>
    </div>
);

const CustomModal = ({footer = true, ...props}: CustomModalProps) => {

    const {isOpen, type} = useModalStore()

    return (
        <Modal
            className='customModal'
            open={isOpen}
            onOk={props.onOk}
            onCancel={props.onCancel}
            okText={props.saveBtnText}
            cancelText={props.cancelBtnText}
            destroyOnClose
            footer={
                footer ? (
                    type === 'del' ? <CustomFooter {...props} /> : <DefaultFooter {...props} />
                ) : null
            }
        >
            {!(type === 'del') && (
                <div className='modalHeader'>
                    <div className='headerContent'>{props.header}</div>
                </div>
            )}
            {type === 'del' ? (
                <div className='modalDel'>
                    <p>Bunu etmək istədiyinizdən əminsiniz?</p>
                </div>
            ) : (
                <div className='modalContent'>{props.children}</div>
            )}
        </Modal>
    );
};

export default CustomModal;