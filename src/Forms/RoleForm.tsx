import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from '../components/RoleManage/RoleManage.module.css';
import styles from './Form.module.css'
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import { SettingOutlined } from '@ant-design/icons';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { FaArrowLeft } from "react-icons/fa";
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag, Switch } from 'antd';
import { render } from '@testing-library/react';

interface Form {
  UserName: string;
  Email: string;
  PhoneNumber: string;
  Role: string;
  StartDate: string;
  EndDate: string;
}
interface DataSource {
  key: string;
  RoleName: string;
  Edit: any;
  Create: any;
  Delete: any;
  Approve: any;
  Read: any;
  Other: any[];

}


interface PersonalProps {
  Back: () => void;
}

const validationSchema = yup.object().shape({
  UserName: yup.string().required('Field required'),
  Email: yup.string().email('Invalid email').required('Field required'),
  PhoneNumber: yup.string().required('Field required'),
  Role: yup.string().required('Field required'),
  StartDate: yup.string().required('Field required'),
  EndDate: yup.string().required('Field required'),
});

const PersonalInfoForm: React.FC<PersonalProps> = ({ Back }) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['RoleName', 'Edit', 'Create', 'Delete', 'Approve', 'Read', 'Description', 'Other']);
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
    { key: '1', RoleName: 'Manage Campaign', Edit: <Checkbox>Update</Checkbox>, Create: <Checkbox>Create</Checkbox>, Delete: <Checkbox>Delete</Checkbox>, Approve: <Checkbox>Approve</Checkbox>, Read: <Checkbox>Read</Checkbox>, Other: [<Checkbox>Active</Checkbox>, <Checkbox>In Active</Checkbox>] },
    { key: '1', RoleName: 'Campaign Execute', Edit: '', Create: '', Delete: '', Approve: '', Read: <Checkbox>Read</Checkbox>, Other: [<Checkbox>Execute</Checkbox>] },
    { key: '2', RoleName: 'Transfer', Edit: "", Create: "", Delete: "", Approve: "", Read: <Checkbox>Read</Checkbox>, Other: [] },
    { key: '3', RoleName: 'Credit Card', Edit: "", Create: "", Delete: "", Approve: '', Read: <Checkbox>Read</Checkbox>, Other: [] },
    { key: '4', RoleName: 'Debit', Edit: "", Create: "", Delete: "", Approve: "", Read: <Checkbox>Read</Checkbox>, Other: [] },
    { key: '5', RoleName: 'Trade Transaction', Edit: "", Create: "", Delete: "", Approve: "", Read: <Checkbox>Read</Checkbox>, Other: [] },
    { key: '6', RoleName: 'Mobile Banking', Edit: "", Create: "", Delete: "", Approve: "", Read: <Checkbox>Read</Checkbox>, Other: [] },
    { key: '7', RoleName: 'Manage User', Edit: <Checkbox>Update</Checkbox>, Create: <Checkbox>Create</Checkbox>, Delete: <Checkbox>Delete</Checkbox>, Approve: <Checkbox>Approve</Checkbox>, Read: <Checkbox>Read</Checkbox>, Other: [<Checkbox>Active</Checkbox>, <Checkbox>In Active</Checkbox>] },
    { key: '8', RoleName: 'Manage Role', Edit: <Checkbox>Update</Checkbox>, Create: <Checkbox>Create</Checkbox>, Delete: <Checkbox>Delete</Checkbox>, Approve: <Checkbox>Approve</Checkbox>, Read: <Checkbox>Read</Checkbox>, Other: [<Checkbox>Active</Checkbox>, <Checkbox>In Active</Checkbox>] },
    { key: '9', RoleName: 'Manage User Group', Edit: <Checkbox>Update</Checkbox>, Create: <Checkbox>Create</Checkbox>, Delete: <Checkbox>Delete</Checkbox>, Approve: <Checkbox>Approve</Checkbox>, Read: <Checkbox>Read</Checkbox>, Other: [<Checkbox>Active</Checkbox>, <Checkbox>In Active</Checkbox>] },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Form>({
    defaultValues: {
      UserName: '',
      Email: '',
      PhoneNumber: '',
      Role: '',
      StartDate: '',
      EndDate: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Form> = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      message.open({
        message: 'User Created',
        description: 'You have successfully created the User.',
        type: 'success',
        duration: 2,
      });
    }, 2000);
    setTimeout(() => {
      Back();
    }, 3000);
  };


  const allColumns = [
    {
      title: 'Roles',
      dataIndex: 'RoleName',
      key: 'RoleName',
      width: 300,
      sorter: (a: DataSource, b: DataSource) => a.RoleName.localeCompare(b.RoleName),
    },

    {
      title: 'Update',
      dataIndex: 'Edit',
      key: 'Edit',
      width: 100,
      sorter: (a: DataSource, b: DataSource) => a.Edit.localeCompare(b.Edit),
      // render: () => {
      //   return <Checkbox ></Checkbox>;
      // }
    },
    {
      title: 'Create',
      dataIndex: 'Create',
      key: 'Create',
      width: 100,
      sorter: (a: DataSource, b: DataSource) => a.Create.localeCompare(b.Create),
      // render: () => {
      //   return <Checkbox ></Checkbox>;
      // }
    },
    {
      title: 'Read',
      dataIndex: 'Read',
      key: 'Read',
      width: 100,

      sorter: (a: DataSource, b: DataSource) => a.Create.localeCompare(b.Create),
      // render: () => {
      //   return <Checkbox ></Checkbox>;
      // }
    },


    {
      title: 'Approve',
      dataIndex: 'Approve',
      key: 'Approve',
      width: 100,

      sorter: (a: DataSource, b: DataSource) => a.Create.localeCompare(b.Create),
      // render: () => {
      //   return <Checkbox ></Checkbox>;
      // }
    },

    {

      title: 'Delete',
      dataIndex: 'Delete',
      key: 'Delete',
      width: 100,
      sorter: (a: DataSource, b: DataSource) => a.Edit.localeCompare(b.Edit),
      // render: () => {
      //   return <Checkbox ></Checkbox>;
      // }
    },
    {
      title: 'Other',
      dataIndex: 'Other',
      key: 'Other',
      width: 100,
      sorter: (a: DataSource, b: DataSource) => a.Edit.localeCompare(b.Edit),

    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   fixed: 'right' as const,
    //   width: 50,
    //   render: () => (
    //     <Dropdown
    //       overlay={actionMenu}
    //       trigger={['click']}
    //       placement="bottomRight"
    //     >
    //       <CiMenuKebab className={style.actionIcon} />
    //     </Dropdown>
    //   ),
    // },
  ];
  const Addhandle = () => {
    setShowForm(true);
    setLoadingText(true)
    setTimeout(() => {
      setLoadingText(false)
      Back()
    }, 2000);

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
      <div className={style.dropdownItem} onClick={HandleApprove}>Approve</div>
    </Space>
  );

  const filteredColumns = allColumns.filter((col) => selectedColumns.includes(col.key) || col.key === 'action');

  const filteredData = dataSource.filter((item) =>
    item.RoleName.toLowerCase().includes(searchText) ||
    item.Edit.toLowerCase().includes(searchText) ||
    item.Create.toLowerCase().includes(searchText) ||
    item.Delete.toLowerCase().includes(searchText) ||
    item.Approve.toLowerCase().includes(searchText) ||
    item.Read.toLowerCase().includes(searchText)
  );




  useEffect(() => {
    setLoadingText(true)
    setTimeout(() => {
      setLoadingText(false)
    }, 2000)
  }, [])



  return (
    <>
      {contextHolder}
      <div className={style.Route}>
        <h5><FaArrowLeft onClick={Back} /> Role Management / Role Create</h5>
        <div className={style.btns}>

          <Button
            Text={'Save'}
            buttonClass={style.createBtn}
            onClick={Addhandle}
            Disable={loadingText}
          />
        </div>
      </div>
      <div className={style.container}>
        <Space className={style.SearchTable}>
          <div className={style.SearchBar}>
            <div className={styles.field}>
              <FormInput
                Label="Role Name"
                placeholder="Enter Role Name"
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name="UserName"
                type="text"
                errors={errors}
                control={control}
              />
            </div>
            <div className={styles.field}>

              <FormInput
                Label="Role Description"
                placeholder="Enter Role Description"
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name="UserName"
                type="text"
                errors={errors}
                control={control}
              />
            </div>
            <div className={styles.field}>
               <h6>Active</h6>
              <Switch />
            </div>
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
  );
};

export default PersonalInfoForm;
