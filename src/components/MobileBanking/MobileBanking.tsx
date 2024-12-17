import React, { useState, useEffect } from 'react';
import style from './MobileBanking.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag, message, Upload, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import ButtonP from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Features from '../Features/Features'
import Image from '../../Images/profile_image.png'
import * as XLSX from 'xlsx';
import { CiImport, CiExport } from "react-icons/ci";



interface DataSource {
    key: string;
    ReferenceID: string;
    Type: string;
    From: string;
    To: string;
    Status: string;
    Date: string;
    Time: string;
    Amount: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['ReferenceID', 'Type', 'From', 'To', 'Status', 'Date', 'Time', 'Amount',]);
    const [loadingText, setLoadingText] = useState<boolean>(true)
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');



    const onSearch = (value: string) => setSearchText(value.toLowerCase());

    const handleCheckboxChange = (checked: boolean, column: string) => {
        setSelectedColumns((prevSelected) =>
            checked ? [...prevSelected, column] : prevSelected.filter((col) => col !== column)
        );
    };

    const dataSource: DataSource[] = [
        { key: '1', ReferenceID: 'EXG4545FR01', Type: 'Email Campaign', From: "1234****5678", To: "1234****5678", Status: "Active", Date: "18/08/2024", Time: "10:00 AM", Amount: "OMR500",  },
        { key: '2', ReferenceID: 'EXG4545FR02', Type: 'Social Media Campaign', From: "5678****1234", To: "5678****1234", Status: "Pending", Date: "19/08/2024", Time: "11:30 AM", Amount: "OMR750",  },
        { key: '3', ReferenceID: 'EXG4545FR03', Type: 'SMS Campaign', From: "4321****8765", To: "4321****8765", Status: "In Active", Date: "20/08/2024", Time: "2:45 PM", Amount: "OMR300",  },
        { key: '4', ReferenceID: 'EXG4545FR04', Type: 'Push Notification', From: "8765****4321", To: "8765****4321", Status: "Active", Date: "21/08/2024", Time: "9:15 AM", Amount: "OMR1,200",  },
        { key: '5', ReferenceID: 'EXG4545FR05', Type: 'Influencer Campaign', From: "2345****6789", To: "2345****6789", Status: "Pending", Date: "22/08/2024", Time: "3:30 PM", Amount: "OMR900",  },
        { key: '6', ReferenceID: 'EXG4545FR06', Type: 'PPC Campaign', From: "6789****2345", To: "6789****2345", Status: "Active", Date: "23/08/2024", Time: "1:00 PM", Amount: "OMR1,500",  },
        { key: '7', ReferenceID: 'EXG4545FR07', Type: 'SEO Campaign', From: "1234****5678", To: "1234****5678", Status: "Active", Date: "24/08/2024", Time: "4:45 PM", Amount: "OMR600",  },
        { key: '8', ReferenceID: 'EXG4545FR08', Type: 'Affiliate Campaign', From: "5678****1234", To: "5678****1234", Status: "In Active", Date: "25/08/2024", Time: "10:30 AM", Amount: "OMR800",  },
        { key: '9', ReferenceID: 'EXG4545FR09', Type: 'Content Marketing', From: "4321****8765", To: "4321****8765", Status: "Active", Date: "26/08/2024", Time: "12:00 PM", Amount: "OMR450",  },
        { key: '10', ReferenceID: 'EXG4545FR10', Type: 'Video Marketing', From: "8765****4321", To: "8765****4321", Status: "Active", Date: "27/08/2024", Time: "2:15 PM", Amount: "OMR2,000",  },
        { key: '11', ReferenceID: 'EXG4545FR11', Type: 'Webinar Campaign', From: "2345****6789", To: "2345****6789", Status: "Pending", Date: "28/08/2024", Time: "11:00 AM", Amount: "OMR1,000",  },
        { key: '12', ReferenceID: 'EXG4545FR12', Type: 'Product Launch', From: "6789****2345", To: "6789****2345", Status: "Active", Date: "29/08/2024", Time: "3:45 PM", Amount: "OMR2,500",  },
        { key: '13', ReferenceID: 'EXG4545FR13', Type: 'Event Marketing', From: "1234****5678", To: "1234****5678", Status: "In Active", Date: "30/08/2024", Time: "5:15 PM", Amount: "OMR1,800",  },
        { key: '14', ReferenceID: 'EXG4545FR14', Type: 'Lead Generation', From: "5678****1234", To: "5678****1234", Status: "Active", Date: "31/08/2024", Time: "10:45 AM", Amount: "OMR700",  },
    ];
    
    

    const Addhandle = () => {
        setShowForm(true);
    };

    const Backhandle = () => {
        setShowForm(false); // Show the table and hide the form
    };

    const handleOpen = () => {
        setModalText('Are you sure you want to delete this record?');
        setOpen(true);
    }

    const actionMenu = (
        <Space direction="vertical" className={style.actions}>
            <div className={style.dropdownItem}>Edit</div>
            <div className={style.dropdownItem} onClick={handleOpen}>Delete</div>
        </Space>
    );
    const allColumns = [
        {
            title: 'Reference ID',
            dataIndex: 'ReferenceID',
            key: 'ReferenceID',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.ReferenceID.localeCompare(b.ReferenceID),

        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.Type.localeCompare(b.Type),
        },
        {
            title: 'From',
            dataIndex: 'From',
            key: 'From',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.From.localeCompare(b.From),
        },
        {
            title: 'To',
            dataIndex: 'To',
            key: 'To',
            width: 80,
            sorter: (a: DataSource, b: DataSource) => a.To.localeCompare(b.To),
        },

        {
            title: 'Date',
            dataIndex: 'Date',
            key: 'Date',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Date.localeCompare(b.Date),
        },
        {
            title: 'Time',
            dataIndex: 'Time',
            key: 'Time',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Time.localeCompare(b.Time),
        },
        {
            title: 'Amount',
            dataIndex: 'Amount',
            key: 'Amount',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Amount.localeCompare(b.Amount),
        },
        
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Status.localeCompare(b.Status),
            render: (Status: string) => {
                const color = Status === "Active" ? "cyan" : Status === "Pending" ? "yellow" : "red";
                return (
                    <Tag style={{ marginInlineEnd: 0 }} color={color}>
                        {Status.toUpperCase()}
                    </Tag>
                )

            },
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     fixed: 'right' as const,
        //     width: 50,
        //     render: () => (
        //         <Dropdown
        //             overlay={actionMenu}
        //             trigger={['click']}
        //             placement="bottomRight"
        //         >
        //             <CiMenuKebab className={style.actionIcon} />
        //         </Dropdown>
        //     ),
        // },
    ];

    const filteredColumns = allColumns.filter((col) => selectedColumns.includes(col.key) || col.key === 'action');

    const filteredData = dataSource.filter((item) =>
        item.Type.toLowerCase().includes(searchText) ||
        item.ReferenceID.toLowerCase().includes(searchText) ||
        item.From.toLowerCase().includes(searchText) ||
        item.To.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) ||
        item.Date.toLowerCase().includes(searchText) ||
        item.Time.toLowerCase().includes(searchText) ||
        item.Amount.toLowerCase().includes(searchText) 
    );

    const items = [
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Type')}
                    value={'Type'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Type')}
                >
                    Type
                </Checkbox>
            ),
            key: '1',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('ReferenceID')}
                    value={'ReferenceID'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'ReferenceID')}
                >
                    Reference ID
                </Checkbox>
            ),
            key: '2',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('From')}
                    value={'From'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'From')}
                >
                    From
                </Checkbox>
            ),
            key: '3',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('To')}
                    value={'To'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'To')}
                >
                    To
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
                    checked={selectedColumns.includes('Date')}
                    value={'Date'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Date')}
                >
                    Date
                </Checkbox>
            ),
            key: '6',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Time')}
                    value={'Time'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Time')}
                >
                    Time
                </Checkbox>
            ),
            key: '7',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Amount')}
                    value={'Amount'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Amount')}
                >
                    Amount
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

    const handleExport = () => {
        const data = [
            { Name: "John Doe", Age: 30, Address: "123 Main St" },
            { Name: "Jane Smith", Age: 25, Address: "456 Maple Ave" },
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

        XLSX.writeFile(workbook, "exported_data.xlsx");
        message.success("Data exported successfully!");
    };

    const handleUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            console.log("Uploaded Data:", data);
            message.success("File uploaded and processed successfully!");
        };
        reader.readAsBinaryString(file);

        return false; // Prevent default upload behavior
    };

    const uploadProps = {
        beforeUpload: handleUpload,
        accept: ".xlsx,.csv",
    };


    return (
        <div className={style.sroll}>
            <FormModal modalTitle={modalText} Subtitle={modalText} open={open} setOpen={setOpen} onOk={() => console.log('Form submitted!')} onCancel={() => console.log('Modal cancelled')} />
            {showForm ? (
                <Features Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>Mobile Banking</h5>
                        <div className={style.btns}>
                            <Button
                                type="primary"
                                onClick={handleExport}
                                className={style.createBtn2}
                            >
                                <CiExport />
                                Data Export
                            </Button>
                            {/* <Upload {...uploadProps} >
                                <Button type="primary" className={style.createBtn}>
                                    <CiImport />
                                    Data Import
                                </Button>
                            </Upload> */}
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
                            showTotal={(total) => `Total OMR{total} items`}
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
            )
            }
        </div >
    );
};


export default MultiViewTable