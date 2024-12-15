import React, { useState, useEffect } from 'react';
import style from './RoleManage.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Form from '../../Forms/PersonalInfoForm'
import Features from '../Features/Features'


interface DataSource {
    key: string;
    CampaignName: string;
    StartTime: string;
    EndTime: string;
    Price: string;
    Status: string;
    MinSpend: string;
    MaxSpend: string;
    Frequency: string;
    Platform: string;
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



    const onSearch = (value: string) => setSearchText(value.toLowerCase());

    const handleCheckboxChange = (checked: boolean, column: string) => {
        setSelectedColumns((prevSelected) =>
            checked ? [...prevSelected, column] : prevSelected.filter((col) => col !== column)
        );
    };

    const dataSource: DataSource[] = [
        { key: '1', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '2', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '3', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '4', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '5', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '6', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '7', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '8', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '9', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '10', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '11', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '12', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '13', CampaignName: 'EXG4545FR01', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
        { key: '14', CampaignName: 'EXG4545FR02', StartTime: '18/8/2024', EndTime: "20/8/2024", Price: "5", Status: "Active", MinSpend: "5", MaxSpend: "500", Frequency: "Repeat", Platform: "ATM" },
    ];

    const Addhandle = () => {
        setShowForm(true);
    };

    const Backhandle = () => {
        setShowForm(false); // Show the table and hide the form
    };

    const HandleDelete = () => {
        setModalText('Are you sure you want to delete this record?');
        setOpen(true);
    }
    const HandleApprove = () => {
        setModalText('Approve Campaign');
        setOpen(true);
    }


    const actionMenu = (
        <Space direction="vertical" className={style.actions}>
            <div className={style.dropdownItem}>Edit</div>
            <div className={style.dropdownItem} onClick={HandleDelete}>Delete</div>
            <div className={style.dropdownItem} onClick={HandleApprove}>Approve</div>
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
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            width: 80,
            sorter: (a: DataSource, b: DataSource) => a.Price.localeCompare(b.Price),
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Status.localeCompare(b.Status),
            render: (Status: string) => (
                <Tag style={{ marginInlineEnd: 0 }} color="cyan">
                    {Status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Min Spend',
            dataIndex: 'MinSpend',
            key: 'MinSpend',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.MinSpend.localeCompare(b.MinSpend),
        },
        {
            title: 'Max Spend',
            dataIndex: 'MaxSpend',
            key: 'MaxSpend',
            width: 100,
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
            title: 'Platform',
            dataIndex: 'Platform',
            key: 'Platform',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Platform.localeCompare(b.Platform),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            width: 50,
            render: () => (
                <Dropdown
                    overlay={actionMenu}
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
        item.Price.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) ||
        item.MinSpend.toLowerCase().includes(searchText) ||
        item.MaxSpend.toLowerCase().includes(searchText) ||
        item.Frequency.toLowerCase().includes(searchText) ||
        item.Platform.toLowerCase().includes(searchText)
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
                    checked={selectedColumns.includes('Price')}
                    value={'Price'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Price')}
                >
                    Price
                </Checkbox>
            ),
            key: '4',
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
            key: '5',
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
            key: '6',
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
            key: '7',
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
            key: '8',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Platform')}
                    value={'Platform'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Platform')}
                >
                    Platform
                </Checkbox>
            ),
            key: '9',
        }
    ];


    useEffect(() => {
        setLoadingText(true)
        setTimeout(() => {
            setLoadingText(false)
        }, 2000)
    }, [])


    return (
        <>
            <FormModal modalTitle={modalText} Subtitle={modalText} open={open} setOpen={setOpen} onOk={() => console.log('object')} onCancel={() => console.log('Modal cancelled')} />
            {showForm ? (
                <Features Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>Role Management</h5>
                        <div className={style.btns}>
                         
                            <Button
                                Text={'Create User'}
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
                                    suffix={<CiFilter size={20} className={style.filterIcon} />}
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