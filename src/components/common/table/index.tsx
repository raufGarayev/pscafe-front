import { Table } from 'antd'
import React from 'react'

interface CustomTableProps {
    data: any[]
    columns: any[]
    paginationOptions?: any
}

const CustomTable = (props: CustomTableProps) => {
  return (
    <Table  dataSource={props.data} columns={props.columns} pagination={props.paginationOptions}/>
  )
}

export default CustomTable