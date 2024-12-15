import React from 'react';
import style from './dashboard.module.css';
import { Tabs, Button, Upload, message } from 'antd';
import type { TabsProps } from 'antd';
import TransactionCampaign from '../Campaigns/TransactionCampaign';
import ProductCampaign from '../Campaigns/ProducrCampaign';
import ChannelCampaign from '../Campaigns/ChannelCampaign';
import { CiImport, CiExport } from "react-icons/ci";
import * as XLSX from 'xlsx';


const Dashboard: React.FC = () => {
    const onChange = (key: string) => {
        console.log(key);
    };

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

    const uploadProps = {
        beforeUpload: handleUpload,
        accept: ".xlsx,.csv",
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Transaction Campaign',
            children: <TransactionCampaign />,
        },
        {
            key: '2',
            label: 'Product Campaign',
            children: <ProductCampaign />,
        },
        {
            key: '3',
            label: 'Channel Usage Campaign',
            children: <ChannelCampaign />,
        },
    ];

    return (
        <div className={`container-fluid ${style.container}`}>
            <div className={`row ${style.row}`}>
                <Tabs
                    rootClassName={style.tabs}
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    style={{ fontSize: 14, fontWeight: 600 }}
                    tabBarExtraContent={{
                        right: (
                            <>
                                {/* <Button
                                    type="primary"
                                    onClick={handleExport}
                                    className={style.filterBtn}
                                >
                                    <CiExport />
                                    Data Export
                                </Button> */}
                                {/* <Upload {...uploadProps} className={style.filterBtn2}>
                                    <Button type="primary" className={style.filterBtn2}>
                                        <CiImport />
                                        Data Import
                                    </Button>
                                </Upload> */}
                            </>
                        ),
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
