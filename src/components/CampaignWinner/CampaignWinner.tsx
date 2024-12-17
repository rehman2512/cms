import React, { useState , useEffect} from "react";
import styles from "./CampaignWinner.module.css";
import LuckyImage from "../../Images/winner.png";
import winner from "../../Images/Final Render-0005 1.png";
import { SettingOutlined } from '@ant-design/icons';

import LuckyDraw from "../../Images/luckydraw.png";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { Table, Input, Pagination, Space, Dropdown, Checkbox, Tag, Button } from 'antd';
import { CiMenuKebab, CiFilter, CiSearch } from 'react-icons/ci';
import Button2 from '../Basic/button';



import Sheikh from "../../Images/oman2.png";
import Sheikh1 from "../../Images/oman3.png";
import Sheikh2 from "../../Images/oman4.png";
import Sheikh3 from "../../Images/omani1.png";
import { Card, Spin } from "antd";

const { Meta } = Card;
interface DataSource {
  key: string;
  CampaignName: string;
  StartTime: string;
  EndTime: string;
  Status: string;
  MinSpend: string;
  MaxSpend: string;
  Frequency: string;
  CampaignType: string;
}
// Define the campaign details type
const campaignDetails = {
  Transaction: {
    title: "Transaction Campaign Winner's",
    prize: "OMR 5000",
    description: "Mobile Banking",
    location: "Muscat Sultanate of Oman",
  },
  Product: {
    title: "Product Campaign Winner's",
    prize: "OMR 3000",
    description: "Product Promotion",
    location: "Salalah, Oman",
  },
  Channel: {
    title: "Channel Campaign Winner's",
    prize: "OMR 2000",
    description: "Social Media Campaign",
    location: "Sohar, Oman",
  },
} as const;

type CampaignType = keyof typeof campaignDetails;




const LuckyDrawScreen: React.FC = () => {
  const [activeCampaign, setActiveCampaign] = useState<CampaignType | "">("");
  const [spinning, setSpinning] = useState(false);
  const [boom, setBoom] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(['CampaignName', 'StartTime', 'EndTime', 'Price', 'Status', 'MinSpend', 'MaxSpend', 'Frequency', 'Platform' ,'CampaignType']);

      const [currentPage, setCurrentPage] = useState<number>(1);
      const [pageSize, setPageSize] = useState<number>(9);
      const [loadingText, setLoadingText] = useState<boolean>(true)
      const [buttonLoading, setButtonLoading] = useState<boolean>(false);
      const [open, setOpen] = useState(false);
      const [showForm, setShowForm] = useState<boolean>(false);
      const [modalText, setModalText] = useState<string>('')
      const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
      const [currentRowKey, setCurrentRowKey] = useState<string | null>(null);
      const [dataSource, setDataSource] = useState<DataSource[]>([
          { key: '1', CampaignName: 'National Day',CampaignType:"Transaction Campaign", StartTime: '18/11/2024', EndTime: "23/11/2024",  Status: "Completed", MinSpend: "50", MaxSpend: "500", Frequency: "Recurring", },
          { key: '2', CampaignName: 'New Year',CampaignType:"Channel Campaign", StartTime: '1/9/2024', EndTime: "20/9/2024",  Status: "Completed", MinSpend: "75", MaxSpend: "500", Frequency: "Recurring", },
          { key: '3', CampaignName: 'Eid Celebration',CampaignType:"Product Campaign",  StartTime: '18/7/2024', EndTime: "20/7/2024",  Status: "Completed", MinSpend: "100", MaxSpend: "500", Frequency: "Once", },
          { key: '4', CampaignName: 'Mid Year', CampaignType:"Product Campaign", StartTime: '01/6/2024', EndTime: "30/6/2024",  Status: "Completed", MinSpend: "500", MaxSpend: "1000", Frequency: "Once", },
          { key: '6', CampaignName: 'Eid Celebration',CampaignType:"Channel Campaign",  StartTime: '10/4/2024', EndTime: "13/4/2024",  Status: "Completed", MinSpend: "50", MaxSpend: "500", Frequency: "Recurring", },
          { key: '5', CampaignName: 'Ramzan Kareem', CampaignType:"Transaction Campaign", StartTime: '10/3/2024', EndTime: "10/4/2024",  Status: "Completed", MinSpend: "30", MaxSpend: "400", Frequency: "Once", },
          { key: '7', CampaignName: 'New Year', CampaignType:"Product Campaign", StartTime: '01/1/2024', EndTime: "30/1/2024",  Status: "Completed", MinSpend: "150", MaxSpend: "350", Frequency: "Once", },
          { key: '8', CampaignName: 'New Year',CampaignType:"Transaction Campaign",  StartTime: '01/1/2024', EndTime: "30/1/2024",  Status: "Completed", MinSpend: "200", MaxSpend: "450", Frequency: "Recurring", },
          { key: '9', CampaignName: 'Spend & Win', CampaignType:"Transaction Campaign", StartTime: '01/9/2023', EndTime: "30/9/2023",  Status: "Completed", MinSpend: "15", MaxSpend: "250", Frequency: "Recurring", },
          { key: '10', CampaignName: 'Eid ul Adha',CampaignType:"Channel Campaign",  StartTime: '15/8/2023', EndTime: "21/8/2023",  Status: "Completed", MinSpend: "200", MaxSpend: "1500", Frequency: "Once", },
          { key: '11', CampaignName: 'Spend & Win', CampaignType:"Channel Campaign", StartTime: '01/2/2023', EndTime: "01/3/2023",  Status: "Completed", MinSpend: "300", MaxSpend: "3000", Frequency: "Once", },
  
      ])
  
      const onSearch = (value: string) => setSearchText(value.toLowerCase());

      const handleCheckboxChange = (checked: boolean, column: string) => {
          setSelectedColumns((prevSelected) =>
              checked ? [...prevSelected, column] : prevSelected.filter((col) => col !== column)
          );
      };
  

  const lastMonthWinners = [
    { name: "Sheikh Fahad", image: Sheikh },
    { name: "Sheikh Khalil", image: Sheikh1 },
    { name: "Sheikh Fahad", image: Sheikh2 },
    { name: "Sheikh Fahad", image: Sheikh3 },
    { name: "Al Raheem", image: Sheikh },
    { name: "Basheer", image: Sheikh1 },
  ];

  const handleCampaignSelection = (campaign: CampaignType) => {
    setSpinning(true);

    setTimeout(() => {
      setActiveCampaign(campaign);
      setTimeout(() => {
        setBoom(true)
      }, 1000)
      setSpinning(false);

    }, 2000);
  };

  const handleBackClick = () => {
    setActiveCampaign("");
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

  useEffect(() => {
        setLoadingText(true)
        setTimeout(() => {
            setLoadingText(false)
        }, 2000)
    }, [])



  const allColumns = [
    {
      title: 'Campaign Name',
      dataIndex: 'CampaignName',
      key: 'CampaignName',
      width: 150,
      sorter: (a: DataSource, b: DataSource) => a.CampaignName.localeCompare(b.CampaignName),

    },
    {
      title: 'Campaign Type',
      dataIndex: 'CampaignType',
      key: 'CampaignType',
      width: 200,
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
        const Color = Status === 'Pending' ? 'yellow' : Status === 'Completed' ? 'green' : 'red';
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
         <Button onClick={() => {
          const campaignType: CampaignType =
            record.CampaignType.includes('Transaction Campaign')
              ? 'Transaction'
              : record.CampaignType.includes('Product Campaign')
              ? 'Product'
              : 'Channel';
          handleCampaignSelection(campaignType);
        }}
      >Execute</Button>
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
          {
            label: (
                <Checkbox
                    checked={selectedColumns.includes('CampaignType')}
                    value={'CampaignType'}
                    onChange={(e) => handleCheckboxChange(e.target.checked, 'CampaignType')}
                >
                    Campaign Type
                </Checkbox>
            ),
            key: '10',
        },
          
          
      ];



  const actionMenu = (key: string) => (
    <Space direction="vertical" className={styles.actions}>
      <div className={styles.dropdownItem} onClick={Addhandle}>Edit</div>
      <div
        className={styles.dropdownItem}
        onClick={() => console.log(`Delete ${key}`)}
      >
        Delete
      </div>
      <div
        className={styles.dropdownItem}
        onClick={() => HandleApprove(key)}
      >
        Approve
      </div>
    </Space>
  );


  return (
    <>
      <Spin spinning={spinning} fullscreen />
      {boom && <div className={styles.boom}></div>}
      {activeCampaign ? (
        <div className={`container-fluid ${styles.container2}`}>
          {/* Back Icon */}
          <div className={styles.backIcon} onClick={handleBackClick}>
            <FaArrowLeft color="#095179" size={24} style={{ cursor: "pointer", margin: "10px" }} />
          </div>
          <div className={`row ${styles.headrow}`}>
            <div className={`col-lg-7 ${styles.winner}`}>
              <div className={styles.heading}>
                <h1>Congratulations,<br /></h1>
                <h3>{campaignDetails[activeCampaign].title}</h3>
                
              </div>
            </div>
            <div className={`col-lg-4 ${styles.imageCol}`}>
              <img src={LuckyDraw} alt="Lucky Draw" className={styles.winnerImage} />
            </div>
          </div>
          <div className="row ">
            <div className={`col-lg-7 ${styles.WinnerAnnauce}`}>
              <div className={styles.imagewinner}>
                <img src={LuckyImage} width={100} alt="Winner" />
                <span className="mx-3">
                  <h2>SHEIKH FAHAD</h2>
                  <h6>{campaignDetails[activeCampaign].location}</h6>
                </span>
              </div>
              <div className={styles.imageContent}>
                <span className={styles.Prize}>
                  <h4>PRIZE</h4>
                  <p>Winner</p>
                </span>
                <span className={styles.disc}>
                  <p>{campaignDetails[activeCampaign].description}</p>
                </span>
              </div>
            </div>
            <div className={`col-lg-4 ${styles.Amount}`}>
              <h6>Winner</h6>
              <h1>OMR 5000</h1>
              <h2>Current Month</h2>
            </div>
          </div>
          <div className="row mt-3">
            <div className={`col-lg-7 ${styles.WinnerAnnauce2nd}`}>
              <div className={styles.imagewinner}>
                <img src={Sheikh} width={60} alt="Winner" />
                <span className="mx-3">
                  <h4>SHEIKH FAHAD</h4>
                  <h6>{campaignDetails[activeCampaign].location}</h6>
                </span>
              </div>
              <div className={styles.imageContent}>
              
              </div>
            </div>
            <div className={`col-lg-4 ${styles.Amount}`}>
              <h6>2nd Winner</h6>
              <h1>OMR 3000</h1>
            </div>
          </div>
          <div className="row mt-3">
            <div className={`col-lg-7 ${styles.WinnerAnnauce2nd}`}>
              <div className={styles.imagewinner}>
                <img src={Sheikh1} width={60} alt="Winner" />
                <span className="mx-3">
                  <h4>SHEIKH FAHAD</h4>
                  <h6>{campaignDetails[activeCampaign].location}</h6>
                </span>
              </div>
              <div className={styles.imageContent}>
              
              </div>
            </div>
            <div className={`col-lg-4 ${styles.Amount}`}>
              <h6>3rd Winner</h6>
              <h1>OMR 2000</h1>
            </div>
          </div>


          {/* <div className={`row ${styles.LastwinnerContainer}`}>
            <h6>Last Month Winner's</h6>
            <div className={`col-lg-12 ${styles.colLastMnth}`}>
              {lastMonthWinners.map((winner, index) => (
                <div key={index} className={styles.lastWinner}>
                  <img src={winner.image} alt={winner.name} className={styles.LastWinnerImage} />
                  <span className="mx-3 p-2">
                    <h5>Winner</h5>
                    <h6>{winner.name}</h6>
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      ) : (
        <>
        <div className={styles.Route}>
            <h5>Campaign Winner's</h5>
            <div className={styles.btns}>

                
            </div>
        </div>
        <div className={styles.container}>
            <Space className={styles.SearchTable}>
                <div className={styles.SearchBar}>
                    <Input
                        placeholder="Search..."
                        prefix={<CiSearch size={20} />}
                        // suffix={<CiFilter size={20} className={styles.filterIcon} />}
                        onChange={(e) => onSearch(e.target.value)}
                        style={{ width: 200 }}
                        className={styles.inputSearch}
                    />
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                    >
                        <SettingOutlined className={styles.tableSettings} />
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

export default LuckyDrawScreen;
