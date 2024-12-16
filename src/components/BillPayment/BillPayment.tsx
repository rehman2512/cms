import React, { useState, useEffect } from 'react';
import style from './BillPayment.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag, message, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {  CiFilter, CiSearch } from 'react-icons/ci';
import FormModal from '../Modal/FormModal';
import Features from '../Features/Features'
import Image from '../../Images/profile_image.png'
import * as XLSX from 'xlsx';
import {  CiExport } from "react-icons/ci";



interface DataSource {
    key: string;
    TransactionID: string;
    Type: string;
    From: string;
    To: string;
    Status: string;
    Date: string;
    Time: string;
    Amount: string;
    Name: string;
    ImageSrc: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['TransactionID', 'Type', 'From', 'To', 'Status', 'Date', 'Time', 'Amount', 'Name']);
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
        { key: '1', TransactionID: 'EXG4545FR01', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Complete", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '2', TransactionID: 'EXG4545FR02', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '3', TransactionID: 'EXG4545FR01', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "In Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '4', TransactionID: 'EXG4545FR02', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '5', TransactionID: 'EXG4545FR01', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "Pending", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '6', TransactionID: 'EXG4545FR02', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '7', TransactionID: 'EXG4545FR01', Type: 'Branch', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '8', TransactionID: 'EXG4545FR02', Type: 'Branch', From: "***12345", To: "***67890", Status: "In Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '9', TransactionID: 'EXG4545FR01', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '10', TransactionID: 'EXG4545FR02', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '11', TransactionID: 'EXG4545FR01', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '12', TransactionID: 'EXG4545FR02', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '13', TransactionID: 'EXG4545FR01', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
        { key: '14', TransactionID: 'EXG4545FR02', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
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
            title: 'Transaction ID',
            dataIndex: 'TransactionID',
            key: 'TransactionID',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.TransactionID.localeCompare(b.TransactionID),

        },
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
            width: 120,
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
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Name.localeCompare(b.Name),
            render: (text: string, record: DataSource) => (
                <Space>
                    <img
                        src={record.ImageSrc}
                        alt={''}
                        style={{ width: 30, height: 30, borderRadius: '50%' }}
                    />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Status.localeCompare(b.Status),
            render: (Status: string) => {
                const color =  Status === "Active" ? "cyan" : Status === "Pending" ? "yellow" : "red";
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
        item.TransactionID.toLowerCase().includes(searchText) ||
        item.From.toLowerCase().includes(searchText) ||
        item.To.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) ||
        item.Date.toLowerCase().includes(searchText) ||
        item.Time.toLowerCase().includes(searchText) ||
        item.Amount.toLowerCase().includes(searchText) ||
        item.Name.toLowerCase().includes(searchText)
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
                    checked={selectedColumns.includes('TransactionID')}
                    value={'TransactionID'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'TransactionID')}
                >
                    Transaction ID
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
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Name')}
                    value={'Name'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Name')}
                >
                    Name
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

    const handleExport = () => {
        const data = [
            { key: '1', TransactionID: 'EXG4545FR01', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Complete", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '2', TransactionID: 'EXG4545FR02', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '3', TransactionID: 'EXG4545FR01', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "In Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '4', TransactionID: 'EXG4545FR02', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '5', TransactionID: 'EXG4545FR01', Type: 'Debit Card', From: "***12345", To: "***67890", Status: "Pending", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '6', TransactionID: 'EXG4545FR02', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '7', TransactionID: 'EXG4545FR01', Type: 'Branch', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '8', TransactionID: 'EXG4545FR02', Type: 'Branch', From: "***12345", To: "***67890", Status: "In Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '9', TransactionID: 'EXG4545FR01', Type: 'Credit Card', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '10', TransactionID: 'EXG4545FR02', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '11', TransactionID: 'EXG4545FR01', Type: 'Mobile Banking', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '12', TransactionID: 'EXG4545FR02', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '13', TransactionID: 'EXG4545FR01', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
            { key: '14', TransactionID: 'EXG4545FR02', Type: '18/8/2024', From: "***12345", To: "***67890", Status: "Active", Date: "12/8/2024", Time: "12:03", Amount: "500", Name: "John", ImageSrc: Image },
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


    return (
        <div className={style.sroll}>
            <FormModal modalTitle={modalText} Subtitle={modalText} open={open} setOpen={setOpen} onOk={() => console.log('Form submitted!')} onCancel={() => console.log('Modal cancelled')} />
            {showForm ? (
                <Features Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>Bill Payment And Transaction</h5>
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
    )
}
        </div >
    );
};


export default MultiViewTable