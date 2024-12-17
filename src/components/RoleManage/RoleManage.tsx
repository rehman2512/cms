import React, { useState, useEffect } from 'react';
import style from './RoleManage.module.css';
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../Basic/button';
import FormModal from '../Modal/FormModal';
import Features from '../../Forms/RoleForm'


interface DataSource {
    key: string;
    RoleName: string;
    Description: string;
    Active: string;
  
}

const MultiViewTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(9);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['RoleName', 'Description', 'Active', ]);
    const [loadingText, setLoadingText] = useState<boolean>(true)
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
        { key: '1', RoleName: 'Administrator',   Description: "Responsible for managing system-wide configurations and users", Active: "Active" },
        { key: '2', RoleName: 'IT Admin',   Description: "Handles IT-related operations and support", Active: "In Active" },
        { key: '3', RoleName: 'Ops Admin',   Description: "Oversees operational processes and tasks", Active: "Active" },
        { key: '4', RoleName: 'Product Officer',   Description: "Manages departmental product strategies and goals", Active: "In Active" },
        { key: '5', RoleName: 'Product Manager',   Description: "Leads product development and lifecycle management", Active: "Active" },
        { key: '6', RoleName: 'IT Specialist',   Description: "Focuses on IT security and specialized systems", Active: "In Active" },
        { key: '7', RoleName: 'Campaign Manager',   Description: "Plans and oversees marketing campaigns", Active: "Active" },
        { key: '8', RoleName: 'Campaign Executor',   Description: "Executes and monitors campaign deliverables", Active: "In Active" },
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
            title: 'RoleName',
            dataIndex: 'RoleName',
            key: 'RoleName',
            width: 150,
            sorter: (a: DataSource, b: DataSource) => a.RoleName.localeCompare(b.RoleName),

        },
     
      
        {
            title: 'Description',
            dataIndex: 'Description',
            key: 'Description',
            width: 450,
            sorter: (a: DataSource, b: DataSource) => a.Description.localeCompare(b.Description),
        },
        {
            title: 'Active',
            dataIndex: 'Active',
            key: 'Active',
            sorter: (a: DataSource, b: DataSource) => a.Active.localeCompare(b.Active),
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
        item.RoleName.toLowerCase().includes(searchText) ||
        item.Description.toLowerCase().includes(searchText) ||
        item.Active.toLowerCase().includes(searchText) 
    );

    const items = [

        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('RoleName')}
                    value={'RoleName'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'RoleName')}
                >
                    RoleName
                </Checkbox>
            ),
            key: '2',
        },
     
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Description')}
                    value={'Description'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Description')}
                >
                    Description
                </Checkbox>
            ),
            key: '4',
        },
        {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('Active')}
                    value={'Active'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'Active')}
                >
                    Active
                </Checkbox>
            ),
            key: '5',
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
                        <h5>Role Management</h5>
                        <div className={style.btns}>
                         
                            <Button
                                Text={'Create Role'}
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