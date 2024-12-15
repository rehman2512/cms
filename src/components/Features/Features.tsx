import React, { useState } from 'react';
import { Flex, Switch, Table, Tag, Transfer } from 'antd';
import type { GetProp, TableColumnsType, TableProps, TransferProps } from 'antd';
import { FaArrowLeft } from "react-icons/fa";
import style from './Feature.module.css'
import Button from '../Basic/button'
import Form from '../../Forms/PersonalInfoForm'

type TransferItem = GetProp<TransferProps, 'dataSource'>[number];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];

interface DataType {
    key: string;
    title: string;
    tag: string;
}

interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: DataType[];
    leftColumns: TableColumnsType<DataType>;
    rightColumns: TableColumnsType<DataType>;
}

// Customize Table Transfer
const TableTransfer: React.FC<TableTransferProps> = (props) => {
    const { leftColumns, rightColumns, ...restProps } = props;
    return (
        <Transfer style={{ width: '100%' }} {...restProps}>
            {({
                direction,
                filteredItems,
                onItemSelect,
                onItemSelectAll,
                selectedKeys: listSelectedKeys,
                disabled: listDisabled,
            }) => {
                const columns = direction === 'left' ? leftColumns : rightColumns;
                const rowSelection: TableRowSelection<TransferItem> = {
                    getCheckboxProps: () => ({ disabled: listDisabled }),
                    onChange(selectedRowKeys) {
                        onItemSelectAll(selectedRowKeys, 'replace');
                    },
                    selectedRowKeys: listSelectedKeys,
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
                };

                return (
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={filteredItems}
                        size="small"
                        style={{ pointerEvents: listDisabled ? 'none' : undefined }}
                        onRow={({ key, disabled: itemDisabled }) => ({
                            onClick: () => {
                                if (itemDisabled || listDisabled) {
                                    return;
                                }
                                onItemSelect(key, !listSelectedKeys.includes(key));
                            },
                        })}
                    />
                );
            }}
        </Transfer>
    );
};

const mockTags = ['cat', 'dog', 'bird'];

// const mockData = Array.from({ length: 20 }).map<DataType>((_, i) => ({
//     key: i.toString(),
//     title: `content${i + 1}`,
//     description: `description of content${i + 1}`,
//     tag: mockTags[i % 3],
// }));

const mockData = [
    {
        key: '1',
        title: ' ATM Cards transactions',
        tag: 'ACT',
    },
    {
        key: '2',
        title: 'POS Cards transactions',
        tag: 'PCT',
    },
    {
        key: '3',
        title: 'ONLINE Cards transactions',
        tag: 'OCT',
    },
    {
        key: '4',
        title: 'Transfers – Local or International',
        tag: 'TLI',
    },
    {
        key: '5',
        title: 'Credit Card',
        tag: 'CC',
    },
    {
        key: '6',
        title: 'Debit Card',
        tag: 'DC',
    },

]

const columns: TableColumnsType<DataType> = [
    {
        title: 'Feature Name',
        dataIndex: 'title',
    },
    {
        title: 'Tag',
        dataIndex: 'tag',
        render: (tag: string) => (
            <Tag style={{ marginInlineEnd: 0 }} color="cyan">
                {tag.toUpperCase()}
            </Tag>
        ),
    },

];

interface PersonalProps {
    Back: () => void;
}

const filterOption = (input: string, item: DataType) =>
    item.title?.includes(input) || item.tag?.includes(input);

const App: React.FC<PersonalProps> = ({ Back }) => {
    const [targetKeys, setTargetKeys] = useState<TransferProps['targetKeys']>([]);
    const [disabled, setDisabled] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);


    const onChange: TableTransferProps['onChange'] = (nextTargetKeys) => {
        setTargetKeys(nextTargetKeys);
    };

    const Addhandle = () => {
        setShowForm(true);
    };


    const Backhandle = () => {
        if (Back) {
            setShowForm(false);
            Back();
        }
    };

    const toggleDisabled = (checked: boolean) => {
        setDisabled(checked);
    };

    return (
        <>
            {showForm ? (
                <Form Back={Backhandle} />
            ) : (
                <div className={style.containerFluid}>
                    <FaArrowLeft size={24} onClick={Back} className={style.backArrow} />
                    <div className={style.container}>
                        <Flex align="start" gap="middle" vertical className={style.feature}>
                            <TableTransfer
                                dataSource={mockData}
                                targetKeys={targetKeys}
                                disabled={disabled}
                                showSearch
                                className={style.Table}
                                showSelectAll={false}
                                onChange={onChange}
                                filterOption={filterOption}
                                leftColumns={columns}
                                rightColumns={columns}
                                titles={['Available Features', 'Selected Features']} 
                            />

                        </Flex>
                        <div style={{padding:20, paddingRight:0}}>
                            <Button
                                Text={'Next'}
                                buttonClass={style.buttonAdd}
                                onClick={Addhandle}
                                Disable={showForm} />
                        </div>
                    </div>

                </div>
            )
            }
        </>
    );
};

export default App;