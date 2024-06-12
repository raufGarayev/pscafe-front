import { Button } from "antd"
import { FaEdit, FaTrash } from "react-icons/fa"
import '../../styles/columns.sass'
import { MenuItem } from "../../types/menu"

export const menuColumns = (handleMenuEdit: (menu: MenuItem) => void, handleMenuDel: (menu: MenuItem) => void) => {
  return [
    {
        title: <span>№</span>,
        render: (_: any, __: any, index: number) => <span>{index + 1}</span>,
        width: '10%'
    },
    {
        title: <span>Ad</span>,
        render: ({name}: {name: string}) => <span>{name}</span>,
        width: '50%'
    },
    {
        title: <span>Qiymət</span>,
        render: ({price}: {price: number}) => <span>{price}</span>,
        width: '20%'
    },
    {
        title: <span>Əməliyyatlar</span>,
        render: (_: any, record: MenuItem) => (
            <div className="colBtns">
                <Button className="colEditBtn" onClick={() => handleMenuEdit(record)}><FaEdit className="colEditIcon" /></Button>
                <Button className="colDelBtn" onClick={() => handleMenuDel(record)}><FaTrash className="colDelIcon" /></Button>
            </div>
        ),
        width: '20%'
    }
  ]
}
