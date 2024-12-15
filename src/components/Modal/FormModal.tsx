import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import style from './FormModal.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInput } from '../Basic/FormInput';

interface ModalFormProps {
    modalTitle: string;
    width?: number;
    onOk?: () => void;
    onCancel?: () => void;
    open: boolean;
    Subtitle: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalForm: React.FC<ModalFormProps> = ({
    modalTitle,
    onOk,
    onCancel,
    open,
    setOpen,
    Subtitle
}) => {
 
    const handleOk = () => {
        if (onOk) {
            onOk();
        }
        setOpen(false);
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setOpen(false);
    };

    return (
        <>
            <Modal
                title={modalTitle}
                centered
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    style: { backgroundColor: '#095179', color: '#ffffff' },
                }}
            >
             {Subtitle}
            </Modal>
        </>
    );
};

export default ModalForm;
