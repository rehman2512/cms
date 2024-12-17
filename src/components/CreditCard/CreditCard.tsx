import React, { useState, useEffect } from 'react';
import style from './CreditCard.module.css';
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
    CreditCardID: string;
    CardType: string;
    TransactionID: string;
    To: string;
    Status: string;
    Date: string;
    Time: string;
    Amount: string;
    CardHolderName: string;
    From: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['CreditCardID', 'CardType', 'TransactionID', 'To', 'Status', 'Date', 'Time', 'Amount', 'CardHolderName', 'From']);
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
        { key: '1', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:00", Amount: "OMR 500", CardHolderName: "Ahmed Al-Muqbali" },
        { key: '2', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:01", Amount: "OMR 500", CardHolderName: "Salim Al-Rashdi" },
        { key: '3', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Pending", Date: "12/12/2024", Time: "12:02", Amount: "OMR 500", CardHolderName: "Fatima Al-Kharusi" },
        { key: '4', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:03", Amount: "OMR 500", CardHolderName: "Hassan Al-Lawati" },
        { key: '5', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Pending", Date: "12/12/2024", Time: "12:04", Amount: "OMR 500", CardHolderName: "Mubarak Al-Balushi" },
        { key: '6', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:05", Amount: "OMR 500", CardHolderName: "Aisha Al-Zadjali" },
        { key: '7', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:06", Amount: "OMR 500", CardHolderName: "Khalid Al-Harthy" },
        { key: '8', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Pending", Date: "12/12/2024", Time: "12:07", Amount: "OMR 500", CardHolderName: "Amna Al-Hinai" },
        { key: '9', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:08", Amount: "OMR 500", CardHolderName: "Ali Al-Saadi" },
        { key: '10', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:09", Amount: "OMR 500", CardHolderName: "Said Al-Farsi" },
        { key: '11', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:10", Amount: "OMR 500", CardHolderName: "Fatima Al-Nabhani" },
        { key: '12', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:11", Amount: "OMR 500", CardHolderName: "Nadia Al-Habsi" },
        { key: '13', CreditCardID: '***4545FR01', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:12", Amount: "OMR 500", CardHolderName: "Sultan Al-Zadjali" },
        { key: '14', CreditCardID: '***4545FR02', CardType: 'MasterCard', TransactionID: "31452145", From: "***10/5/2021", To: "***5", Status: "Complete", Date: "12/12/2024", Time: "12:13", Amount: "OMR 500", CardHolderName: "Zainab Al-Siyabi" },
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
            title: 'Credit Card ID',
            dataIndex: 'CreditCardID',
            key: 'CreditCardID',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.CreditCardID.localeCompare(b.CreditCardID),

        },
        {
            title: 'Card Type',
            dataIndex: 'CardType',
            key: 'CardType',
            width: 120,
            sorter: (a: DataSource, b: DataSource) => a.CardType.localeCompare(b.CardType),
        },
        {
            title: 'Transaction ID',
            dataIndex: 'TransactionID',
            key: 'TransactionID',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.TransactionID.localeCompare(b.TransactionID),
        },
        {
            title: 'From',
            dataIndex: 'From',
            key: 'From',
            width: 80,
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
            title: 'Card Holder Name',
            dataIndex: 'CardHolderName',
            key: 'CardHolderName',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.CardHolderName.localeCompare(b.CardHolderName),
           
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.Status.localeCompare(b.Status),
            render: (Status: string) => {
                const color =  Status === "Complete" ? "cyan" : Status === "Pending" ? "yellow" : "red";
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
        item.CardType.toLowerCase().includes(searchText) ||
        item.CreditCardID.toLowerCase().includes(searchText) ||
        item.TransactionID.toLowerCase().includes(searchText) ||
        item.To.toLowerCase().includes(searchText) ||
        item.Status.toLowerCase().includes(searchText) ||
        item.Date.toLowerCase().includes(searchText) ||
        item.Time.toLowerCase().includes(searchText) ||
        item.Amount.toLowerCase().includes(searchText) ||
        item.CardHolderName.toLowerCase().includes(searchText)
    );

    const items = [
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('CardType')}
                    value={'CardType'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CardType')}
                >
                    Card Type
                </Checkbox>
            ),
            key: '1',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('CreditCardID')}
                    value={'CreditCardID'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CreditCardID')}
                >
                    Credit Card ID
                </Checkbox>
            ),
            key: '2',
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
            key: '3',
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
            key: '4',
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
            key: '5',
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
            key: '6',
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
            key: '7',
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
            key: '8',
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
            key: '9',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('CardHolderName')}
                    value={'CardHolderName'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CardHolderName')}
                >
                    Card Holder Name
                </Checkbox>
            ),
            key: '10',
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
            const workbook = XLSX.read(binaryStr, { CardType: 'binary' });
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
                        <h5>Credit Card</h5>
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