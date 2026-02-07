import { Select } from 'antd';

type Props = {
    listDataOfItem: Array<any>,
    onChange: any
    value: string,
    valueName?: string;
    labelName?: string;
    label: string;
}

const SelectSearchProvince = (props: Props) => {
    const {
        listDataOfItem,
        onChange,
        value,
        valueName = 'id',
        labelName = 'name',
        label
    } = props;

    return (
        <Select
            onChange={onChange}
            className="form-control"
            value={value}
        >  <Select.Option value="">-- Chọn {label.toLowerCase()} --</Select.Option>
            {
                listDataOfItem && listDataOfItem.length && listDataOfItem.map((item, index) => {
                    return (
                        <Select.Option key={index}
                            value={`${item[valueName]}-${item[labelName]}`}
                            title={item[labelName]}
                        >
                            {item[labelName]}
                        </Select.Option>
                    )
                })
            }
        </Select>
    );
};

export default SelectSearchProvince;
