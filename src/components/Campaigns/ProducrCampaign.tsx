import React, { useState, useEffect } from 'react'
import style from './campaign.module.css'
import { Card, List, Typography, Row, Col, Button, Space, Select } from 'antd';
import { ArrowRightOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie,PieChart } from 'recharts';
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
import { MdAccountBalance } from "react-icons/md";
import { FaCcMastercard } from "react-icons/fa6";

import { FaRegCreditCard } from "react-icons/fa";


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
    { name: 'City Centre', views: '121k', color: '#dcc670' },
    { name: 'North Centre', views: '64k', color: 'linear-gradient(to right, #eadaa4, #dcc670)' },
    { name: 'South Centre', views: '112k', color: '#eadaa4' },
];

const data2 = [
    { name: 'Shopee', value: 310, color: '#000000', icon: <LuDot size={24} color='#3884ff' /> },
    { name: 'Tokopedia', value: 217, color: '#000000', icon: <LuDot size={24} color='#3884ff' /> },
    { name: 'Website', value: 351, color: '#000000', icon: <LuDot size={24} color='#7161ef' /> },
];

const transactions = [
    {
        icon: <GrAtm size={24} color="#3fd0c9" />,
        title: 'ATM Withdrawal Processed',
        description: '$200',
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
        description: '$500',
        id: '#01QAMB',
        color: "#3884ff"

    },
    {
        icon: <FiDownload size={24} color="#7161ef" />,
        title: 'Mobile Recharge Processed',
        description: '$30',
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
        description: '$75',
        id: '#20ITHP',
        color: "#3884ff"

    },
    {
        icon: <FiDownload size={24} color="#3884ff" />,
        title: 'Subscription Payment Processed',
        description: '$45',
        id: '#08OFGK',
        color: "#3884ff"
    },
];

const datapie = [
    { name: 'Reward', value: 809 },
    { name: 'Non-Reward', value: 811 },
    { name: 'Multi-Reward', value: 600 },
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

    useEffect(() => {
        const fetchCampaigns = async () => {
            const data: CampaignData[] = [
                {
                    title: "Credit Card",
                    amount: "$2,992",
                    percentageChange: "19%",
                    transactions: 1455,
                    lastMonth: "Last Month",
                    iconColor: "blue",
                    icon: <FaRegCreditCard size={24} color='#095179' />
                },
                {
                    title: "Debit Card",
                    amount: "$5,672",
                    percentageChange: "12%",
                    transactions: 2350,
                    lastMonth: "Last Month",
                    iconColor: "green",
                    icon: <FaCcMastercard size={24} color='green' />

                },

                {
                    title: "Prepaid Card",
                    amount: "$8,243",
                    percentageChange: "25%",
                    transactions: 3255,
                    lastMonth: "Last Month",
                    iconColor: "orange",
                    icon: <FaRegCreditCard size={24} color='c58804' />
                },
                {
                    title: "Accounts",
                    amount: "$8,243",
                    percentageChange: "25%",
                    transactions: 3255,
                    lastMonth: "Last Month",
                    iconColor: "orange",
                    icon: <MdAccountBalance size={24} color='c58804' />
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
                                        width: 230,
                                        borderRadius: 10,
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        // flex:'0 1 calc(40% - 10px)',
                                        boxSizing: 'border-box'

                                    }}
                                >
                                    <Row justify="space-between" align="middle">
                                        <Col className={style.cardTitle}>
                                            <Text>{campaign.icon}</Text>
                                            <Text strong style={{ fontSize: 12 }}>
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
                                        Reward Analytic
                                    </Text>
                                </div>
                                <Select defaultValue="Last month" style={{ width: 120 }}>
                                    <Option value="lastMonth">Last month</Option>
                                    <Option value="thisMonth">This month</Option>
                                </Select>
                            </div>
                            <div style={{ marginBottom: '20px', display: 'flex', justifyContent:"space-between" }}>
                                <Text strong className={style.Legend}>
                                    809<Text type="secondary">
                                        <LuDot color="#5550cd" size={24} />Reward
                                    </Text>
                                </Text>
                                <Text strong className={style.Legend2}>
                                    811<Text type="secondary">
                                        <LuDot color="#6adddb" size={24} />Multi-Reward
                                    </Text>
                                </Text>
                                <Text strong className={style.Legend2}>
                                    611<Text type="secondary">
                                        <LuDot color="#6adddb" size={24} />Non-Reward
                                    </Text>
                                </Text>
                            </div>
                            <ResponsiveContainer width="100%" height={210}>

                                <PieChart >
                                    <Tooltip  />
                                    <Pie data={datapie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#eadaa4" />
                                    <Pie data={datapie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} fill="#095179" />
                                    <Pie data={datapie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={80} outerRadius={100} fill="#dcc670" label />
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
                                <Button type="link" style={{ padding: 5 }}>
                                    View More
                                </Button>
                            </Col>
                        </Row>

                        <div style={{ marginBottom: '20px', display: "flex", justifyContent: "space-between" }}>
                            {data2.map((item, index) => (
                                <Row key={index} justify="space-between" style={{ marginBottom: '10px', display: "flex", flexDirection: "column" }}>
                                    <Col>
                                        <Text>
                                            {item.icon}
                                        </Text>
                                        <Text strong style={{ color: item.color }}>
                                            {item.name}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Title level={5} style={{ margin: 0, color: item.color }}>
                                            {item.value} Trn
                                        </Title>
                                    </Col>
                                </Row>
                            ))}
                        </div>

                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={data2} layout="vertical" >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" domain={[0, 500]} />
                                <YAxis hide={true} dataKey="" type="category" />
                                <Tooltip />
                                <Bar dataKey="value" fill="#eadaa4" radius={[0, 5, 5, 0]} />
                                <Bar dataKey="value" fill="#eadaa4" radius={[0, 5, 5, 0]} />
                                <Bar dataKey="value" fill="#dcc670" radius={[0, 5, 5, 0]} />
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
