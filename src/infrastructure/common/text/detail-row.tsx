import React from 'react'
import '../../../asset/css/admin/view.css'
type Props = {
    label: string
    value: string
}

export const DetailRowCommon = (props: Props) => {
    const { label, value } = props;
    return (
        <div className="detail-row">
            <div className="detail-label">
                <span>{label} </span>
            </div>
            {
                label.toLocaleLowerCase().includes('email')
                    ?
                    <div className="detail-value">
                        <a href={`mailto:${value}`} className="contact-link">
                            {value}
                        </a>
                    </div>
                    :
                    <div className="detail-value">
                        {value}
                    </div>
            }

        </div>

    )
}

type ComponentProps = {
    label: string
    value: any
}
export const DetailRowComponent = (props: ComponentProps) => {
    const { label, value } = props;
    return (
        <div className="detail-row">
            <div className="detail-label">
                <span>{label} </span>
            </div>
            <div className="detail-value">
                {value}
            </div>
        </div>

    )
}