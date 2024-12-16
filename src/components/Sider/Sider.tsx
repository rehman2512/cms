import React, { useState, useEffect } from 'react';
import style from './sider.module.css';
import Logo from '../../Images/ahlibank.png';
import { CiGrid41 } from "react-icons/ci";
import { IoMdMenu } from "react-icons/io";
import { Menu, Input } from 'antd';
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaCarSide } from "react-icons/fa";
import { GiCarWheel } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { FaRoute } from "react-icons/fa6";
import { TbReport } from "react-icons/tb";
import type { MenuProps, TableColumnsType } from 'antd';
import PersonalInfo from '../CampaignList/CampaignList';
import Transfer from '../Transfer/Transfer'
import { CiSearch } from "react-icons/ci";
import Dashboard from '../Dashboard/dashboard';
import { MdCampaign } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { AiOutlineTransaction } from "react-icons/ai";
import CampaignWinner from '../CampaignWinner/CampaignWinner'
import BillPayment from '../BillPayment/BillPayment'
import CreditCard from "../CreditCard/CreditCard"
import DebitCard from "../DebitCard/DebitCard"
import MobileBanking from "../MobileBanking/MobileBanking"
import TradeTransaction from "../TradeTransaction/TradeTransaction"
import Reporting from "../Reporting/Reporting"
import User from '../UserManage/UserManage'
import Role from '../RoleManage/RoleManage'
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Group from '../Group/Group'






interface MenuItem {
    key: string;
    label: string | React.ReactNode;
    icon?: React.ReactNode;
    children?: MenuItem[];
    type?: 'divider';
}
interface MenuItemClose {
    key: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    type?: 'divider';
}


const Sider: React.FC = () => {
    const [isMenu, setMenu] = useState<boolean>(false);
    const [isView, setView] = useState<{ key: string } | string>({ key: 'Dashboard' });
    const [isClient, setClient] = useState(false)

    useEffect(() => {
        setClient(true)
    }, [])


    const handleMenuToggle = () => {
        setMenu(!isMenu);
    };


    const items: MenuProps['items'] = [
        {
            key: 'Dashboard',
            label: 'Dashboard',
            icon: <MdDashboard style={{ fontSize: 24, }} />,

        },
        {
            type: 'divider',
            key: "",
        },
        {
            key: 'Campaign_Management',
            label: 'Campaign Mangement',
            icon: <MdCampaign style={{ fontSize: 24, }} />,
            children: [
                { key: 'CampaignList', label: 'Campaign List' },
            ],
        },
        {
            key: 'Transaction',
            label: 'Transaction',
            icon: <AiOutlineTransaction style={{ fontSize: 24, }} />,
            children: [
                { key: 'Transfer', label: 'Transfer' },
                { key: 'BillPaymentTransaction', label: 'Bill Payment Transactions' },
                { key: 'CreditCard', label: 'Credit Card' },
                { key: 'DebitCard', label: 'Debit Card' },
                { key: 'TradeTransaction', label: 'Trade Transaction' },
                { key: 'MobileBanking', label: 'Mobile Banking' },
            ],
        },
        {
            key: 'Winners',
            label: 'Winners',
            icon: <GiPodiumWinner style={{ fontSize: 24, }} />,
            children: [
                { key: 'CampaignWinner', label: 'Campaign Winner' },
            ],
        },
        {
            key: 'Reporting',
            label: 'Reporting',
            icon: <TbReport style={{ fontSize: 24, }} />,
            children: [
                { key: 'Reporting', label: 'Reporting' },
            ],
        },
        {
            key: 'User_Management',
            label: 'User Management',
            icon: <FaUserCircle style={{ fontSize: 24, }} />,
            children: [
                { key: 'Role', label: 'Role' },
                { key: 'User', label: 'User' },
                { key: 'Group', label: 'User Group' },
            ],
        },
    ];

    const itemsClose: MenuProps['items'] = [
        {
            key: 'Dashboard',
            icon: <MdDashboard style={{ fontSize: 24, }} />,
        },
        {
            type: 'divider',
            key: "",
        },
        {
            key: 'Campaign_Management',
            icon: <MdCampaign style={{ fontSize: 24, }} />,
        },
        {
            key: 'Transfer',
            icon: <AiOutlineTransaction style={{ fontSize: 24, }} />,
        },

        {
            key: 'User_Management',
            icon: <FaUserCircle style={{ fontSize: 24, }} />,
        },
    ];

    const HandleClick: MenuProps['onClick'] = (info) => {
        setView({ key: info.key });
    };




    return (
        <section>
            <div className={`container-fluid ${style.containerFluid}`}>
                <div className={`row ${style.row}`}>
                    <div className={style.sidersMenus}>
                        {isMenu ? (
                            <div className={style.ContainerClose}>
                                {isClient && (
                                    <img alt='logo' src={Logo} className={style.LogoClose} width={100} />
                                )}

                                <div className={style.sideList}>
                                    <Menu
                                        onClick={HandleClick}
                                        items={itemsClose}
                                        defaultSelectedKeys={[typeof isView === 'object' ? isView.key : '']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        style={{ border: "none", color: "#095179" }}
                                        className={`${style.sideListMenu} ${style.custommenu}`}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={style.Container}>
                                {isClient && (
                                    <img alt='logo' src={Logo} className={style.LogoOpen} width={200} />
                                )}
                                <div className={style.sideList}>
                                    <Menu
                                        onClick={HandleClick}
                                        items={items}
                                        defaultSelectedKeys={[typeof isView === 'object' ? isView.key : '']}
                                        defaultOpenKeys={['sub1']}
                                        mode="inline"
                                        style={{ border: "none", color: "#095179", fontSize: "14px" }}
                                        className={`${style.sideListMenu} ${style.custommenu}`}
                                        theme='light'

                                    />
                                </div>
                            </div>
                        )}

                        <div className={style.contentSide}>
                            <div className={style.ContainerHeader}>
                                <div className={style.headerSearch}>
                                    <IoMdMenu size={28} className={style.menuIcon} onClick={handleMenuToggle} />
                                    <Input className={style.searchInput} placeholder='Search...' prefix={<CiSearch size={24} />} />
                                </div>
                                <div className={style.profile}>
                                    <CiGrid41 className={style.amdin} size={24} />
                                    <Dropdown overlay={
                                        <Menu
                                            items={[
                                                { label: 'Profile', key: 'profile' },
                                                { label: 'Logout', key: 'logout' },
                                            ]}
                                        />
                                    } trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <IoIosNotificationsOutline className={style.amdin} size={24} />
                                            </Space>
                                        </a>
                                    </Dropdown>

                                </div>
                            </div>
                            <div>
                                {typeof isView === 'object' && isView.key === 'CampaignList' && <PersonalInfo />}
                                {typeof isView === 'object' && isView.key === 'Campaign_Management' && <PersonalInfo />}
                                {typeof isView === 'object' && isView.key === 'Dashboard' && <Dashboard />}
                                {typeof isView === 'object' && isView.key === 'Transfer' && <Transfer />}
                                {typeof isView === 'object' && isView.key === 'Transfer' && <Transfer />}
                                {typeof isView === 'object' && isView.key === 'CampaignWinner' && <CampaignWinner />}
                                {typeof isView === 'object' && isView.key === 'BillPaymentTransaction' && <BillPayment />}
                                {typeof isView === 'object' && isView.key === 'CreditCard' && <CreditCard />}
                                {typeof isView === 'object' && isView.key === 'DebitCard' && <DebitCard />}
                                {typeof isView === 'object' && isView.key === 'TradeTransaction' && <TradeTransaction />}
                                {typeof isView === 'object' && isView.key === 'MobileBanking' && <MobileBanking />}
                                {typeof isView === 'object' && isView.key === 'Reporting' && <Reporting />}
                                {typeof isView === 'object' && isView.key === 'Role' && <Role />}
                                {typeof isView === 'object' && isView.key === 'User' && <User />}
                                {typeof isView === 'object' && isView.key === 'Group' && <Group />}
                                {typeof isView === 'object' && isView.key === 'User_Management' && <User />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sider;
