import React from 'react';
import { Tooltip } from 'antd';
type Props = {
    detail: string,
    onClickDetail: Function,
    approve: string,
    onClickApprove: Function,
    show: string,
    onClickShow: Function,
    remove: string,
    onClickDelete: Function,
}
export const ActionAdvangeCommon = (props: Props) => {
    const {
        detail,
        onClickDetail,
        approve,
        onClickApprove,
        show,
        onClickShow,
        remove,
        onClickDelete
    } = props;
    return (
        <div className='action-common flex justify-center gap-1 whitespace-nowrap'>
            {
                detail
                &&
                <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={detail}>
                    <div onClick={() => onClickDetail()} className='option p-1 cursor-pointer'>
                        <div className='option-select'>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                    </div>
                </Tooltip>
            }
            {
                approve
                &&
                <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={approve}>
                    <div onClick={() => onClickApprove()} className='option p-1 cursor-pointer'>
                        <div className='option-select'>
                            <i className="fa fa-check-square" aria-hidden="true"></i>
                        </div>
                    </div>
                </Tooltip>
            }
            {
                show
                &&
                <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={show}>
                    <div onClick={() => onClickShow()} className='option p-1 cursor-pointer'>
                        <div className='option-select'>
                            <i className="fa fa-eye" aria-hidden="true"></i>
                        </div>
                    </div>
                </Tooltip>
            }
            {
                remove
                &&
                <Tooltip color={'#fff'} overlayInnerStyle={{ color: "#666666" }} title={"Xóa"}>
                    <div onClick={() => onClickDelete()} className='option p-1 cursor-pointer'>
                        <div className='option-select'>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                    </div>
                </Tooltip>
            }

        </div>
    )
}
