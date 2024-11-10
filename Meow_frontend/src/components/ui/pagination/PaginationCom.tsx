import React from 'react'
import { Pagination } from 'antd';
import './paginationCom.css'

type Props = {
    total: number
    pageSize: number
    default: number
}

const paginationComponent = (props: Props) => {
    return (
        <div>
            <Pagination
                defaultCurrent={props.default}
                pageSize={props.pageSize}
                total={props.total}
            />
        </div>
    )
}

export default Pagination