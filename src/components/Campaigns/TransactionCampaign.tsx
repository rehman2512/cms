import React, { useState, useEffect } from 'react'
import style from './campaign.module.css'
import { Card, List, Typography, Row, Col, Button, Space, Select } from 'antd';
import { ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts';
import { MdOutlineAnalytics } from 'react-icons/md';
import { LuDot } from "react-icons/lu";
import { MdOutlineCampaign } from "react-icons/md";
import { LuNotepadText } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { GrAtm } from "react-icons/gr";
import { FaSignal } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { PiUserCircleCheckFill } from "react-icons/pi";
import { CiMoneyBill } from "react-icons/ci";
import Cityimage1 from '../../Images/city1.png'
import Cityimage2 from '../../Images/city2.png'
import Cityimage3 from '../../Images/city3.png'
import { FaMobile } from "react-icons/fa";




const { Text, Title } = Typography;
const { Option } = Select;

const data = [
    { name: '01-06', Reward: 10, 'Non-Reward': 10 },
    { name: '01-07', Reward: 150, 'Non-Reward': 10 },
    { name: '08-14', Reward: 450, 'Non-Reward': 780 },
    { name: '15-21', Reward: 850, 'Non-Reward': 500 },
    { name: '22-30', Reward: 950, 'Non-Reward': 550 },
];

const areas = [
    { name: 'City Centre', views: '121k', color: '#E2E5FE', image: Cityimage1 },
    { name: 'North Centre', views: '64k', color: '#E2E5FE', image: Cityimage2 },
    { name: 'South Centre', views: '112k', color: '#E2E5FE', image: Cityimage3 },
];

const data2 = [
    { name: 'National Day', value: 310, color: '#000000', icon: <LuDot size={30} color='#3884ff' /> },
    { name: 'Eid Celebrations', value: 217, color: '#000000', icon: <LuDot size={30} color='#3884ff' /> },
    { name: 'New Year', value: 351, color: '#000000', icon: <LuDot size={30} color='#7161ef' /> },
];


const datapie = [
    { name: "ATM", value: 2992 },
    { name: "POS", value: 8243 },
    { name: "Mobile Banking", value: 5672  },
    { name: "Bill Payment", value: 8243 }
];

const transactions = [
    {
        icon: <GrAtm size={24} color="#3fd0c9" />,
        title: 'ATM Withdrawal Processed',
        id: '#12OQKL',
        color: "#3884ff"

    },
    {
        icon: <MdOutlineCancel size={24} color="#ff7eb3" />,
        title: 'Bill Payment',
        description: '$150 failed customer (1002)',
        id: '#24CCML',
        color: "#3884ff"

    },
    {
        icon: <LuBox size={24} color="#3884ff" />,
        title: 'Funds Transfer Successful',
        id: '#01QAMB',
        color: "#3884ff"

    },
    {
        icon: <FiDownload size={24} color="#7161ef" />,
        title: 'Mobile Recharge Processed',
        id: '#08OMLB',
        color: "#3884ff"

    },
    {
        icon: <GrAtm size={24} color="#3fd0c9" />,
        title: 'Balance Inquiry Completed',
        description: 'Account ***1225',
        id: '#14OFKS',
        color: "#3884ff"

    },
    {
        icon: <MdOutlineCancel size={24} color="#ff758c" />,
        title: 'Electricity Bill Payment Confirmed',
        id: '#20ITHP',
        color: "#3884ff"

    },
    {
        icon: <FiDownload size={24} color="#3884ff" />,
        title: 'Subscription Payment Processed',
        id: '#08OFGK',
        color: "#3884ff"
    },
    {
        icon: <FiDownload size={24} color="#3884ff" />,
        title: 'Subscription Payment Processed',
        id: '#08OFGK',
        color: "#3884ff"
    },
];

interface CampaignData {
    title: string;
    amount: string;
    percentageChange: string;
    transactions: number;
    lastMonth: string;
    iconColor: string;
    icon: React.ReactNode;
}


const TransactionCampaign: React.FC = () => {
    const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() => {
        const fetchCampaigns = async () => {
            const data: CampaignData[] = [
                {
                    title: "ATM",
                    amount: "OMR 2,992",
                    percentageChange: "19%",
                    transactions: 1455,
                    lastMonth: "Last Month",
                    iconColor: "blue",
                    icon: <LuNotepadText size={24} color='#095179' />
                },
                {
                    title: "POS",
                    amount: "OMR 5,672",
                    percentageChange: "12%",
                    transactions: 2350,
                    lastMonth: "Last Month",
                    iconColor: "green",
                    icon: <FaRegEye size={24} color='green' />

                },

                {
                    title: "Bill Payment",
                    amount: "OMR 8,243",
                    percentageChange: "25%",
                    transactions: 3255,
                    lastMonth: "Last Month",
                    iconColor: "orange",
                    icon: <PiUserCircleCheckFill size={24} color='#c58804' />
                },
                {
                    title: "Mobile Banking",
                    amount: "OMR 8,243",
                    percentageChange: "25%",
                    transactions: 3255,
                    lastMonth: "Last Month",
                    iconColor: "orange",
                    icon: <FaMobile size={24} color='#c58804' />
                },
            ];
            setCampaigns(data);
        };

        fetchCampaigns();
    }, []);
    return (
        <div className={`container-fluid ${style.container}`}>
            <div className="row">
                <div className={`col-lg-5 ${style.boxes}`}>
                    {campaigns.map((campaign, index) => (
                        <div className="col-lg-4" key={index} >
                            <Space>
                                <Card
                                    style={{
                                        width: 240,
                                        borderRadius: 10,
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        // flex:'0 1 calc(40% - 10px)',
                                        boxSizing: 'border-box'

                                    }}
                                >
                                    <Row justify="space-between" align="middle">
                                        <Col className={style.cardTitle}>
                                            <Text>{campaign.icon}</Text>
                                            <Text strong style={{ fontSize: 12, marginLeft: 5 }}>
                                                {campaign.title}
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Title level={5}>
                                        {campaign.amount} <Text className={style.numTitle}><ArrowUpOutlined /> {campaign.percentageChange}</Text>{' '}
                                        <Text className={style.lastM}>{campaign.lastMonth}</Text>
                                    </Title>
                                    <Text type="secondary" className={style.Text}>
                                        Last Month
                                    </Text>
                                    <Text className={style.Text}>
                                        Number of transactions: <strong>{campaign.transactions}</strong>
                                    </Text>
                                    <Row>
                                        <Button
                                            type="link"
                                            className={style.btn}
                                            onClick={() => alert(`Viewing details for ${campaign.title}`)}
                                        >
                                            View Details
                                            <ArrowRightOutlined />
                                        </Button>
                                    </Row>
                                </Card>
                            </Space>
                        </div>
                    ))}
                    <div className={`col-lg-4 ${style.chart}`}>
                        <Card
                            style={{
                                borderRadius: 10,
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                padding: '5px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <MdOutlineAnalytics size={24} color="blue" />
                                    <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
                                        Channel Wise Analytics
                                    </Text>
                                </div>
                                <Select defaultValue="Last month" style={{ width: 120 }}>
                                    <Option value="lastMonth">Last month</Option>
                                    <Option value="thisMonth">This month</Option>
                                </Select>
                            </div>
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: "space-between" }}>
                                <Text strong className={style.Legend}>
                                    <Text type="secondary">
                                        <LuDot color="#5550cd" size={24} />ATM
                                    </Text>
                                </Text>
                                <Text strong className={style.Legend2}>
                                    <Text type="secondary">
                                        <LuDot color="#6adddb" size={24} />POS
                                    </Text>
                                </Text>
                                <Text strong className={style.Legend2}>
                                    <Text type="secondary">
                                        <LuDot color="#6adddb" size={24} />Bill Payment
                                    </Text>
                                </Text>
                                <Text strong className={style.Legend2}>
                                    <Text type="secondary">
                                        <LuDot color="#6adddb" size={24} />Mobile Banking
                                    </Text>
                                </Text>
                            </div>

                            <ResponsiveContainer width={'100%'} height={210} className={style.PieChart}>
    <PieChart>
        <Tooltip formatter={(value: number, name: string, props: any) =>
            `${((value / datapie.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(2)}%`
        } />
        <Pie
            data={datapie}
            cx={210}
            cy={115}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={(entry) =>
                `${((entry.value / datapie.reduce((acc, cur) => acc + cur.value, 0)) * 100).toFixed(2)}%`
            }
        >
            {datapie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
    </PieChart>
</ResponsiveContainer>


                        </Card>
                    </div>

                </div>
                <div className="col-lg-4">
                    <Card
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            // width: 300,
                        }}
                    >
                        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                            <Col>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaSignal size={24} color="#095179" />
                                    <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
                                        Area Wise Analytic
                                    </Text>
                                </div>
                            </Col>
                            <Col>
                                <Button type="link" style={{ padding: 0 }}>
                                    View More
                                </Button>
                            </Col>
                        </Row>

                        <div style={{ marginBottom: '20px' }}>
                            <Title level={2} style={{ margin: 0 }}>
                                297,000{' '}
                                <Text style={{ color: 'green', fontSize: '16px' }}>
                                    <ArrowUpOutlined /> 8%
                                </Text>
                            </Title>
                            <Text type="secondary">Total Views from 3 areas</Text>
                        </div>

                        {areas.map((area, index) => (
                            <Row
                                key={index}
                                justify="space-between"
                                align="middle"
                                style={{
                                    backgroundColor: area.color.includes('linear-gradient') ? undefined : area.color,
                                    backgroundImage: area.color.includes('linear-gradient') ? area.color : undefined,
                                    padding: '10px 15px',
                                    borderRadius: 8,
                                    marginBottom: '10px',
                                }}
                            >

                                <Col>
                                    {area.image && <img src={area.image} alt={area.name} style={{ marginRight: '10px' }} />}
                                    <Text strong>{area.name}</Text>
                                </Col>
                                <Col>
                                    <Text strong>{area.views}</Text>
                                </Col>
                            </Row>
                        ))}
                    </Card>
                    <Card
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            marginTop: '20px',
                            height: 440
                        }}>
                        <Row justify="space-between" align="middle" style={{ marginBottom: '20px' }}>
                            <Col>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <MdOutlineCampaign size={24} color="blue" />
                                    <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
                                        Total Campaigns
                                    </Text>
                                </div>
                            </Col>
                            <Col>
                            <Select defaultValue="Last month" style={{ width: 120 }}>
                                    <Option value="lastMonth">3 month</Option>
                                    <Option value="thisMonth">6 month</Option>
                                    <Option value="thisMonth">12 month</Option>
                                </Select>
                            </Col>
                        </Row>

                        <div style={{ marginBottom: '20px', display: "flex", justifyContent: "space-between", flexWrap:'wrap' }}>
                            {data2.map((item, index) => (
                                <Row key={index} justify="space-between" style={{ marginBottom: '10px', display: "flex", flexDirection: "column", alignItems:'center',  }}>
                                    <Col className='d-flex, align-center '>
                                        <Text >
                                            {item.icon}
                                        </Text>
                                        <Text strong style={{ color: item.color , fontSize:12}}>
                                            {item.name}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Title level={5} style={{ margin: 0, color: item.color }}>
                                            {item.value} K
                                        </Title>
                                    </Col>
                                </Row>
                            ))}
                        </div>
<ResponsiveContainer width="100%" height={225}>
    <BarChart data={data2} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <YAxis domain={[0, 500]} type="number" />
        <XAxis 
            type="category" 
            dataKey="name" 
            angle={-45} 
            textAnchor="end"
            fontSize={12}
            height={70} // Increase height for better spacing
        />
        <Tooltip />
        <Bar dataKey="value">
            {data2.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Bar>
    </BarChart>
</ResponsiveContainer>

                    </Card>

                </div>
                <div className="col-lg-3">
                    <Card
                        style={{
                            borderRadius: 10,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                        title={
                            <Row align="middle">
                                <LuBox size={24} color="blue" />
                                <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
                                    Recent Transactions
                                </Text>
                            </Row>
                        }
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions}
                            renderItem={(item) => (
                                <List.Item>
                                    <div>
                                        <div className={style.content}>
                                            <div>{item.icon}</div>
                                            <div style={{ marginLeft: 5 }}>
                                                <Text style={{ fontSize: 14 }}>{item.title}</Text>
                                                <Text style={{ fontSize: 12 }}>{item.description}</Text> <br />
                                                <Text type='secondary' style={{ fontSize: 14 }}>{item.id}</Text>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TransactionCampaign
