import React from 'react';
import { Button } from 'antd';

interface ButtonProps {
  Text: string;
  htmlType?: 'button' | 'submit' | 'reset'; 
  buttonClass?: string; 
  Disable: boolean;
  onClick: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ Text, buttonClass , htmlType="submit", Disable , onClick }) => {
  return (
    <div>
      <Button className={buttonClass}  htmlType={htmlType}  disabled={Disable} onClick={onClick}>
        {Text}
      </Button>
    </div>
  );
};

export default CustomButton;

