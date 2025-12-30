import React from 'react';
import "../../../../assets/styles/components/action.css"
import { Tooltip } from 'antd';
type Props = {
    onClickDetail: Function,
}
export const ActionEditCommon = (props: Props) => {
    const { onClickDetail } = props;
    return (
        <div className='action-common flex justify-center whitespace-nowrap'>
            <Tooltip className="custom-tooltip" color={'#fff'} overlayInnerStyle={{ color: "#475f7b" }} title={"Sửa"}>
                <div onClick={() => onClickDetail()} className='option p-1 cursor-pointer'>
                    <div className='option-select'>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                </div>
            </Tooltip>
        </div>
    )
}
