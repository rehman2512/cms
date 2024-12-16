import React, { useState, useEffect } from 'react';
import style from './Group.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Form from '../../Forms/PersonalInfoForm'
import Features from '../../Forms/UserForm.'


interface DataSource {
    key: string;
    GroupName: string;
    Description: string;

}

const MultiViewTable: React.FC = ({ }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['GroupName', 'Description']);
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
        { key: '1', GroupName: 'Khaili',Description:"" },
        { key: '2', GroupName: 'Basheer',Description:"" },
        { key: '3', GroupName: 'Raheem', Description:""},
        { key: '4', GroupName: 'Bakar', Description:""},
        { key: '5', GroupName: 'Fahad', Description:""},
        { key: '6', GroupName: 'Qaboos' ,Description:""},
        { key: '7', GroupName: 'Qaboos', Description:""},
        { key: '8', GroupName: 'Qaboos', Description:""},
        { key: '9', GroupName: ' Haitham bin Tariq', Description:""},
        { key: '10', GroupName: ' Haitham bin Tariq', Description:""},
        { key: '11', GroupName: ' Haitham bin Tariq', Description:""},
        { key: '12', GroupName: 'EXG4545FR02',  Description:""},
        { key: '13', GroupName: 'EXG4545FR01',  Description:""},
        { key: '14', GroupName: 'EXG4545FR02',  Description:""},
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
            title: 'Group Name',
            dataIndex: 'GroupName',
            key: 'GroupName',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.GroupName.localeCompare(b.GroupName),

        },
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            sorter: (a: DataSource, b: DataSource) => a.Description.localeCompare(b.Description),

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
        item.GroupName.toLowerCase().includes(searchText) 
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
                    checked={selectedColumns.includes('GroupName')}
                    value={'GroupName'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'GroupName')}
                >
                    Group Name
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