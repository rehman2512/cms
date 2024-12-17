import React, { useState, useEffect } from 'react';
import style from './UserManage.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Form from '../../Forms/PersonalInfoForm'
import Features from '../../Forms/UserForm.'


interface DataSource {
    key: string;
    UserName: string;
    Role: string;
    EmailAddress: string;
    PhoneNumber: string;
    StartDate: string;
    EndDate: string;
}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['UserName', 'Role', 'EmailAddress', 'PhoneNumber', 'StartDate', 'EndDate']);
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
        { key: '1', UserName: 'Khaili', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022"  },
        { key: '2', UserName: 'Basheer', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '3', UserName: 'Raheem', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '4', UserName: 'Bakar', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '5', UserName: 'Fahad', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '6', UserName: 'Qaboos', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '7', UserName: 'Qaboos', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '8', UserName: 'Qaboos', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022" },
        { key: '9', UserName: ' Haitham bin Tariq', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022",  },
        { key: '10', UserName: ' Haitham bin Tariq', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022", },
        { key: '11', UserName: ' Haitham bin Tariq', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022", },
        { key: '12', UserName: 'EXG4545FR02', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022",  },
        { key: '13', UserName: 'EXG4545FR01', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022", },
        { key: '14', UserName: 'EXG4545FR02', Role: 'Viewer', EmailAddress: "Test@gmail.com", PhoneNumber: "+968 123-4567", StartDate: "10/7/2018", EndDate: "10/7/2022", },
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
            <div className={style.dropdownItem} onClick={Addhandle}>Edit</div>
            <div className={style.dropdownItem} onClick={HandleDelete}>Delete</div>
        </Space>
    );
    const allColumns = [
        {
            title: 'User Name',
            dataIndex: 'UserName',
            key: 'UserName',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.UserName.localeCompare(b.UserName),

        },
        {
            title: 'Role',
            dataIndex: 'Role',
            key: 'Role',
            width: 120,
            sorter: (a: DataSource, b: DataSource) => a.Role.localeCompare(b.Role),
        },
        {
            title: 'Email Address',
            dataIndex: 'EmailAddress',
            key: 'EmailAddress',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.EmailAddress.localeCompare(b.EmailAddress),
        },
        {
            title: 'PhoneNumber',
            dataIndex: 'PhoneNumber',
            key: 'PhoneNumber',
            width: 80,
            sorter: (a: DataSource, b: DataSource) => a.PhoneNumber.localeCompare(b.PhoneNumber),
        },
        {
            title: 'Start Date',
            dataIndex: 'StartDate',
            key: 'StartDate',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.StartDate.localeCompare(b.StartDate),
          
        },
        {
            title: 'End Date',
            dataIndex: 'EndDate',
            key: 'EndDate',
            width: 100,
            sorter: (a: DataSource, b: DataSource) => a.EndDate.localeCompare(b.EndDate),
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
        item.Role.toLowerCase().includes(searchText) ||
        item.UserName.toLowerCase().includes(searchText) ||
        item.EmailAddress.toLowerCase().includes(searchText) ||
        item.PhoneNumber.toLowerCase().includes(searchText) ||
        item.StartDate.toLowerCase().includes(searchText) ||
        item.EndDate.toLowerCase().includes(searchText) 
    );

    const items = [
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Role')}
                    value={'Role'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Role')}
                >
                    Start Time
                </Checkbox>
            ),
            key: '1',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('UserName')}
                    value={'UserName'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'UserName')}
                >
                    User Name
                </Checkbox>
            ),
            key: '2',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('EmailAddress')}
                    value={'EmailAddress'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'EmailAddress')}
                >
                    Email Address
                </Checkbox>
            ),
            key: '3',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('PhoneNumber')}
                    value={'PhoneNumber'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'PhoneNumber')}
                >
                    Phone Number
                </Checkbox>
            ),
            key: '4',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('StartDate')}
                    value={'StartDate'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'StartDate')}
                >
                    Star tDate
                </Checkbox>
            ),
            key: '5',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('EndDate')}
                    value={'EndDate'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'EndDate')}
                >
                    End Date
                </Checkbox>
            ),
            key: '6',
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
            {showForm ? (
                <Features Back={Backhandle} />
            ) : (
                // Render the table when not showing the form
                <>
                    <div className={style.Route}>
                        <h5>User Managerment</h5>
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
            )}
        </>
    );
};


export default MultiViewTable