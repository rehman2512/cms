import React, { useState, useEffect } from 'react';
import style from './Reporting.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag , message, Button} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import FormModal from '../Modal/FormModal';
import Form from '../../Forms/PersonalInfoForm'
import Features from '../Features/Features'
import * as XLSX from 'xlsx';



interface DataSource {
    key: string;
    CampaignName: string;
    StartTime: string;
    EndTime: string;
    CampaignType: string;
    Status: string;
   
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['CampaignName', 'StartTime', 'EndTime', 'CampaignType', 'Status', 'MinSpend', 'MaxSpend', 'Frequency', ]);
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
        { key: '1', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete"},
        { key: '2', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete"},
        { key: '3', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
        { key: '4', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete" },
        { key: '5', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete",},
        { key: '6', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
        { key: '7', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
        { key: '8', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete", },
        { key: '9', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete", },
        { key: '10', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete" },
        { key: '11', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete",  },
        { key: '12', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete",},
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

    const handleExport = () => {
        const data = [
            { key: '1', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete"},
            { key: '2', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete"},
            { key: '3', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
            { key: '4', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete" },
            { key: '5', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete",},
            { key: '6', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
            { key: '7', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete", },
            { key: '8', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete", },
            { key: '9', CampaignName: 'National Day', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Product Campaign", Status: "Complete", },
            { key: '10', CampaignName: 'Credit Card', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete" },
            { key: '11', CampaignName: 'Eid Celebrations', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Transaction Campaign", Status: "Complete",  },
            { key: '12', CampaignName: 'Product Campaign', StartTime: '18/8/2024', EndTime: "20/8/2024", CampaignType: "Channel Campaign", Status: "Complete",},
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        XLSX.writeFile(workbook, "exported_data.xlsx");
        message.success("Data exported successfully!");
    };


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
            title: 'CampaignType',
            dataIndex: 'CampaignType',
            key: 'CampaignType',
            width: 80,
            sorter: (a: DataSource, b: DataSource) => a.CampaignType.localeCompare(b.CampaignType),
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
            render: (Status: string) => (
                <Tag style={{ marginInlineEnd: 0 }} color="cyan">
                    {Status.toUpperCase()}
                </Tag>
            ),
        },
     
     
        {
            title: 'Action',
            key: 'action',
            fixed: 'right' as const,
            width: 50,
            render: () => <Button onClick={handleExport} style={{backgroundColor:"#095179",color:"#ffff"}}>Export</Button>
        },
    ];

    const filteredColumns = allColumns.filter((col) => selectedColumns.includes(col.key) || col.key === 'action');

    const filteredData = dataSource.filter((item) =>
        item.StartTime.toLowerCase().includes(searchText) ||
        item.CampaignName.toLowerCase().includes(searchText) ||
        item.EndTime.toLowerCase().includes(searchText) ||
        item.CampaignType.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) 
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
                    checked={selectedColumns.includes('CampaignType')}
                    value={'CampaignType'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CampaignType')}
                >
                    CampaignType
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
            {/* {showForm ? (
                <Features Back={Backhandle} />
            ) : ( */}
                <>
                    <div className={style.Route}>
                        <h5>Reporting</h5>
                        <div className={style.btns}>
                        
                     
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
            {/* )} */}
        </>
    );
};


export default MultiViewTable