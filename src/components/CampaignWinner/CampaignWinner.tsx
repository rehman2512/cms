import React, { useState } from "react";
import styles from "./CampaignWinner.module.css";
import LuckyImage from "../../Images/winner.png";
import winner from "../../Images/Final Render-0005 1.png";
import LuckyDraw from "../../Images/luckydraw.png";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import Sheikh from "../../Images/oman2.png";
import Sheikh1 from "../../Images/oman3.png";
import Sheikh2 from "../../Images/oman4.png";
import Sheikh3 from "../../Images/omani1.png";
import { Card, Button } from "antd";

const { Meta } = Card;

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

  const lastMonthWinners = [
    { name: "Sheikh Fahad", image: Sheikh },
    { name: "Sheikh Khalil", image: Sheikh1 },
    { name: "Sheikh Fahad", image: Sheikh2 },
    { name: "Sheikh Fahad", image: Sheikh3 },
    { name: "Al Raheem", image: Sheikh },
    { name: "Basheer", image: Sheikh1 },
  ];

  const handleCampaignSelection = (campaign: CampaignType) => {
    setActiveCampaign(campaign);
  };

  const handleBackClick = () => {
    setActiveCampaign("");
  };

  return (
    <>
      {activeCampaign ? (
        <div className={`container-fluid ${styles.container}`}>
          {/* Back Icon */}
          <div className={styles.backIcon} onClick={handleBackClick}>
            <FaArrowLeft size={24} style={{ cursor: "pointer", margin: "10px" }} />
          </div>
          <div className={`row ${styles.headrow}`}>
            <div className={`col-lg-7 ${styles.winner}`}>
              <div className={styles.heading}>
                <h1>Congratulations,<br /></h1>
                <h3>{campaignDetails[activeCampaign].title}</h3>
                <div className={styles.btn}>
                  <Button className={styles.button}>Lucky Draw</Button>
                  <Button className={styles.button2}>
                    <FaCheckCircle color="green" />
                    Selected
                  </Button>
                </div>
              </div>
            </div>
            <div className={`col-lg-4 ${styles.imageCol}`}>
              <img src={LuckyDraw} alt="Lucky Draw" className={styles.winnerImage} />
            </div>
          </div>
          <div className="row">
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
              <h1>{campaignDetails[activeCampaign].prize}</h1>
              <h2>Current Month</h2>
            </div>
          </div>
          <div className={`row ${styles.LastwinnerContainer}`}>
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
          </div>
        </div>
      ) : (
        <div className="m-5 d-flex">
          <Card
            hoverable
            style={{ width: 350, borderRadius: "8px", overflow: "hidden", marginLeft: "10px", marginRight: "10px" }}
            cover={
              <img
                alt="campaign"
                src={winner}
                style={{ height: 350, objectFit: "contain" }}
              />
            }
          >
            <Meta
              title="Transaction Campaign"
              description="Click below to check the winners of the campaign and celebrate their success!"
              style={{ marginBottom: "16px" }}
            />
            <Button
              type="primary"
              block
              className={styles.btnOFcam}
              onClick={() => handleCampaignSelection("Transaction")}
            >
              Winner's
            </Button>
          </Card>
          <Card
            hoverable
            style={{ width: 350, borderRadius: "8px", overflow: "hidden", marginLeft: "10px", marginRight: "10px" }}
            cover={
              <img
                alt="campaign"
                src={winner}
                style={{ height: 350, objectFit: "contain" }}
              />
            }
          >
            <Meta
              title="Product Campaign"
              description="Click below to check the winners of the campaign and celebrate their success!"
              style={{ marginBottom: "16px" }}
            />
            <Button
              type="primary"
              block
              className={styles.btnOFcam}
              onClick={() => handleCampaignSelection("Product")}
            >
              Winner's
            </Button>
          </Card>
          <Card
            hoverable
            style={{ width: 350, borderRadius: "8px", overflow: "hidden", marginLeft: "10px", marginRight: "10px" }}
            cover={
              <img
                alt="campaign"
                src={winner}
                style={{ height: 350, objectFit: "contain" }}
              />
            }
          >
            <Meta
              title="Channel Campaign"
              description="Click below to check the winners of the campaign and celebrate their success!"
              style={{ marginBottom: "16px" }}
            />
            <Button
              type="primary"
              block
              className={styles.btnOFcam}
              onClick={() => handleCampaignSelection("Channel")}
            >
              Winner's
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default LuckyDrawScreen;
