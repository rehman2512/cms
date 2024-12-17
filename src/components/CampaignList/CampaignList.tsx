import React, { useState, useEffect } from 'react';
import style from './CampaignList.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/CampaignModal';
import Form from '../../Forms/PersonalInfoForm'
import Features from '../Features/Features'


interface DataSource {
    key: string;
    CampaignName: string;
    StartTime: string;
    EndTime: string;
    Status: string;
    MinSpend: string;
    MaxSpend: string;
    Frequency: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['CampaignName', 'StartTime', 'EndTime', 'Price', 'Status', 'MinSpend', 'MaxSpend', 'Frequency', 'Platform']);
    const [loadingText, setLoadingText] = useState<boolean>(true)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('')
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [currentRowKey, setCurrentRowKey] = useState<string | null>(null);
    const [dataSource, setDataSource] = useState<DataSource[]>([
        { key: '1', CampaignName: 'National Day', StartTime: '18/11/2024', EndTime: "23/11/2024",  Status: "Approved", MinSpend: "50", MaxSpend: "500", Frequency: "Recurring", },
        { key: '2', CampaignName: 'New Year', StartTime: '1/9/2024', EndTime: "20/9/2024",  Status: "Decline", MinSpend: "75", MaxSpend: "500", Frequency: "Recurring", },
        { key: '3', CampaignName: 'Eid Celebration', StartTime: '18/7/2024', EndTime: "20/7/2024",  Status: "Pending", MinSpend: "100", MaxSpend: "500", Frequency: "Once", },
        { key: '4', CampaignName: 'Mid Year', StartTime: '01/6/2024', EndTime: "30/6/2024",  Status: "Approved", MinSpend: "500", MaxSpend: "1000", Frequency: "Once", },
        { key: '6', CampaignName: 'Eid Celebration', StartTime: '10/4/2024', EndTime: "13/4/2024",  Status: "Pending", MinSpend: "50", MaxSpend: "500", Frequency: "Recurring", },
        { key: '5', CampaignName: 'Ramzan Kareem', StartTime: '10/3/2024', EndTime: "10/4/2024",  Status: "Decline", MinSpend: "30", MaxSpend: "400", Frequency: "Once", },
        { key: '7', CampaignName: 'New Year', StartTime: '01/1/2024', EndTime: "30/1/2024",  Status: "Approved", MinSpend: "150", MaxSpend: "350", Frequency: "Once", },
        { key: '8', CampaignName: 'New Year', StartTime: '01/1/2024', EndTime: "30/1/2024",  Status: "Pending", MinSpend: "200", MaxSpend: "450", Frequency: "Recurring", },
        { key: '9', CampaignName: 'Spend & Win', StartTime: '01/9/2023', EndTime: "30/9/2023",  Status: "Hold", MinSpend: "15", MaxSpend: "250", Frequency: "Recurring", },
        { key: '10', CampaignName: 'Eid ul Adha', StartTime: '15/8/2023', EndTime: "21/8/2023",  Status: "Pending", MinSpend: "200", MaxSpend: "1500", Frequency: "Once", },
        { key: '11', CampaignName: 'Spend & Win', StartTime: '01/2/2023', EndTime: "01/3/2023",  Status: "Pending", MinSpend: "300", MaxSpend: "3000", Frequency: "Once", },

        // ...other data entries
    ])



    const onSearch = (value: string) => setSearchText(value.toLowerCase());

    const handleCheckboxChange = (checked: boolean, column: string) => {
        setSelectedColumns((prevSelected) =>
            checked ? [...prevSelected, column] : prevSelected.filter((col) => col !== column)
        );
    };



    const Addhandle = () => {
        setShowForm(true);
    };

    const Backhandle = () => {
        setShowForm(false);
    };

    const HandleDelete = () => {
        setModalText('Are you sure you want to delete this record?');
        setOpen(true);
    }
    const HandleApprove = (key: string) => {
        setModalText('Approve Campaign');
        setCurrentRowKey(key);
        setOpen(true);
    }


    const actionMenu = (key: string) => (
        <Space direction="vertical" className={style.actions}>
            <div className={style.dropdownItem} onClick={Addhandle}>Edit</div>
            <div
                className={style.dropdownItem}
                onClick={() => console.log(`Delete ${key}`)}
            >
                Delete
            </div>
            <div
                className={style.dropdownItem}
                onClick={() => HandleApprove(key)}
            >
                Approve
            </div>
        </Space>
    );

    const allColumns = [
        {
            title: 'Campaign Name',
            dataIndex: 'CampaignName',
            key: 'CampaignName',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.CampaignName.localeCompare(b.CampaignName),

        },
        {
            title: 'Start Time',
            dataIndex: 'StartTime',
            key: 'StartTime',
            width: 120,
            sorter: (a: DataSource, b: DataSource) => a.StartTime.localeCompare(b.StartTime),
        },
        {
            title: 'End Time',
            dataIndex: 'EndTime',
            key: 'EndTime',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.EndTime.localeCompare(b.EndTime),
        },

        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Status.localeCompare(b.Status),
            render: (Status: string) => {
                const Color = Status === 'Pending' ? 'yellow' : Status === 'Approved' ? 'green' : 'red';
                return (
                    <Tag style={{ marginInlineEnd: 0 }} color={Color}>
                        {Status.toUpperCase()}
                    </Tag>
                )
            },
        },
        {
            title: 'Min Spend (OMR)',
            dataIndex: 'MinSpend',
            key: 'MinSpend',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.MinSpend.localeCompare(b.MinSpend),
        },
        {
            title: 'Max Spend (OMR)',
            dataIndex: 'MaxSpend',
            key: 'MaxSpend',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.MaxSpend.localeCompare(b.MaxSpend),
        },
        {
            title: 'Frequency',
            dataIndex: 'Frequency',
            key: 'Frequency',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Frequency.localeCompare(b.Frequency),
        },
        
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            width: 50,
            render: (_: any, record: DataSource) => (
                <Dropdown
                    overlay={actionMenu(record.key)}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <CiMenuKebab className={style.actionIcon} />
                </Dropdown>
            ),
        },
    ];

    const filteredColumns = allColumns.filter((col) => selectedColumns.includes(col.key) || col.key === 'action');

    const filteredData = dataSource.filter((item) =>
        item.StartTime.toLowerCase().includes(searchText) ||
        item.CampaignName.toLowerCase().includes(searchText) ||
        item.EndTime.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) ||
        item.MinSpend.toLowerCase().includes(searchText) ||
        item.MaxSpend.toLowerCase().includes(searchText) ||
        item.Frequency.toLowerCase().includes(searchText) 
    );

    const items = [
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('StartTime')}
                    value={'StartTime'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'StartTime')}
                >
                    Start Time
                </Checkbox>
            ),
            key: '1',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('CampaignName')}
                    value={'CampaignName'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CampaignName')}
                >
                    Campaign Name
                </Checkbox>
            ),
            key: '2',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('EndTime')}
                    value={'EndTime'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'EndTime')}
                >
                    End Time
                </Checkbox>
            ),
            key: '3',
        },
        
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Status')}
                    value={'Status'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Status')}
                >
                    Status
                </Checkbox>
            ),
            key: '4',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('MinSpend')}
                    value={'MinSpend'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'MinSpend')}
                >
                    Min Spend
                </Checkbox>
            ),
            key: '5',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('MaxSpend')}
                    value={'MaxSpend'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'MaxSpend')}
                >
                    Max Spend
                </Checkbox>
            ),
            key: '8',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Frequency')}
                    value={'Frequency'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Frequency')}
                >
                    Frequency
                </Checkbox>
            ),
            key: '9',
        },
        
    ];


    useEffect(() => {
        setLoadingText(true)
        setTimeout(() => {
            setLoadingText(false)
        }, 2000)
    }, [])



    const confirmApproval = () => {
        setLoadingText(true)

        setTimeout(() => {
            if (currentRowKey) {
                setDataSource((prevDataSource) =>
                    prevDataSource.map((item) =>
                        item.key === currentRowKey
                            ? { ...item, Status: 'Approved' }
                            : item
                    )
                );
                setCurrentRowKey(null);
            }
            setLoadingText(false)
        }, 2000);
        setOpen(false);
    };


    const cancelApproval = () => {
        setLoadingText(true)


        setTimeout(() => {
            if (currentRowKey) {
                setDataSource((prevDataSource) =>
                    prevDataSource.map((item) =>
                        item.key === currentRowKey
                            ? { ...item, Status: 'Decline' }
                            : item
                    )
                );
                setCurrentRowKey(null);
            }
            setLoadingText(false)
        }, 2000);
        setOpen(false);
    };


    return (
        <>
            <FormModal modalTitle={modalText} Subtitle={modalText} open={open} setOpen={setOpen} onOk={confirmApproval} onCancel={cancelApproval} okText='Approve' cancelText='Decline' />
            {showForm ? (
                <Features Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>Campaign List</h5>
                        <div className={style.btns}>

                            <Button
                                Text={'Create campaign'}
                                buttonClass={style.createBtn}
                                onClick={Addhandle}
                                Disable={loadingText}
                            />
                        </div>
                    </div>
                    <div className={style.container}>
                        <Space className={style.SearchTable}>
                            <div className={style.SearchBar}>
                                <Input
                                    placeholder="Search..."
                                    prefix={<CiSearch size={20} />}
                                    // suffix={<CiFilter size={20} className={style.filterIcon} />}
                                    onChange={(e) => onSearch(e.target.value)}
                                    style={{ width: 200 }}
                                    className={style.inputSearch}
                                />
                                <Dropdown
                                    menu={{ items }}
                                    trigger={['click']}
                                >
                                    <SettingOutlined className={style.tableSettings} />
                                </Dropdown>
                            </div>
                        </Space>
                        <Table
                            loading={loadingText}
                            columns={filteredColumns}
                            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                            pagination={false}
                            rowSelection={{
                                type: 'checkbox',
                                onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                            }}
                            size="small"
                            onChange={(pagination, filters, sorter) => {
                                if (!Array.isArray(sorter)) {
                                    console.log('Field:', sorter.field);
                                    console.log('Order:', sorter.order);
                                }
                            }}
                        />
                        <Pagination
                            align="end"
                            showTotal={(total) => `Total ${total} items`}
                            current={currentPage}
                            total={filteredData.length}
                            pageSize={pageSize}
                            onChange={(page, newSize) => {
                                setCurrentPage(page);
                                setPageSize(newSize);
                            }}
                            style={{ marginTop: 16 }}
                        />
                    </div>
                </>
            )}
        </>
    );
};


export default MultiViewTable