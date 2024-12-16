import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { FaArrowLeft } from "react-icons/fa";

interface Form {
    UserName: string;
    Email: string;
    PhoneNumber: string;
    Role: string;
    StartDate: string;
    EndDate: string;
    Active:string;
    Password: string
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
    Active: yup.string().required('Field required'),
    Password: yup.string().required('Field required'),
});

const PersonalInfoForm: React.FC<PersonalProps> = ({ Back }) => {
    const [message, contextHolder] = notification.useNotification();
    const [spinning, setSpinning] = useState(false);
    const [isClient, setIsClient] = useState(false);
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
            Active: '',
            Password: '',
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

    return (
        <>
            {contextHolder}
            <Spin spinning={spinning} fullscreen />
            <div className={`container-fluid ${style.Container}`}>
                <FaArrowLeft size={24} onClick={Back} className={style.backArrow}  />
                <div className={`row ${style.row}`}>
                    <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={style.formSetting}>
                                <div className={style.field}>
                                    <FormInput
                                        Label="User Name"
                                        placeholder="Enter User Name"
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

                                <div className={style.field}>
                                    <FormInput
                                        Label="Email Address"
                                        placeholder="Enter Email Address"
                                        classInput={style.Input}
                                        className={style.inputContainer}
                                        labelClass={style.Label}
                                        classError={style.Error}
                                        name="Email"
                                        type="email"
                                        errors={errors}
                                        control={control}
                                    />
                                </div>

                                <div className={style.field}>
                                    <FormInput
                                        Label="Phone Number"
                                        placeholder="Enter Phone Number"
                                        classInput={style.Input}
                                        className={style.inputContainer}
                                        labelClass={style.Label}
                                        classError={style.Error}
                                        name="PhoneNumber"
                                        type="text"
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                            </div>

                            <div className={style.formSetting}>
                                <div className={style.field}>
                                    <FormSelect
                                        control={control}
                                        name="Role"
                                        options={[
                                            { label: "Administrator", value: "Administrator" },
                                            { label: "IT Admin", value: "IT Admin" },
                                            { label: "Ops Admin", value: "Ops Admin" },
                                            { label: "Product Officer", value: "Product Officer" },
                                            { label: "Product Manager", value: "Product Manager" },
                                            { label: "IT Specialist", value: "IT Specialist" },
                                            { label: "Campaign Manager", value: "Campaign Manager" },
                                            { label: "Campaign Executor", value: "Campaign Executor" },
                                        ]}
                                        placeholder="Select Role"
                                        errors={errors}
                                        className="form-select-container"
                                        classError={style.Error}
                                        showLabel={true}
                                        Label="Role"
                                        labelClass={style.Label}
                                    />
                                </div>

                                <div className={style.field}>
                                    <FormInput
                                        Label="Start Date"
                                        placeholder="Select Start Date"
                                        classInput={style.Input}
                                        className={style.inputContainer}
                                        labelClass={style.Label}
                                        classError={style.Error}
                                        name="StartDate"
                                        type="date"
                                        errors={errors}
                                        control={control}
                                    />
                                </div>

                                <div className={style.field}>
                                    <FormInput
                                        Label="Expire Date"
                                        placeholder="Expire Date"
                                        classInput={style.Input}
                                        className={style.inputContainer}
                                        labelClass={style.Label}
                                        classError={style.Error}
                                        name="EndDate"
                                        type="date"
                                        errors={errors}
                                        control={control}
                                    />
                                </div>
                            </div>
                            <div className={style.formSetting}>
                                <div className={style.field}>
                                    <FormSelect
                                        control={control}
                                        name="Active"
                                        options={[
                                            { label: "Active", value: "Active" },
                                            { label: "In Active", value: "In Actives" },
                                        ]}
                                        placeholder="Active"
                                        errors={errors}
                                        className="form-select-container"
                                        classError={style.Error}
                                        showLabel={true}
                                        Label="Active"
                                        labelClass={style.Label}
                                    />
                                </div>

                                <div className={style.field}>
                                    <FormInput
                                        Label="Password"
                                        placeholder="Enter your password"
                                        classInput={style.Input}
                                        className={style.inputContainer}
                                        labelClass={style.Label}
                                        classError={style.Error}
                                        name="Password"
                                        type="Password"
                                        errors={errors}
                                        control={control}
                                    />
                                </div>

                                <div className={style.field}>
                                    
                                </div>
                            </div>

                            <Button
                                Text="Create User"
                                buttonClass={style.buttonSignIn}
                                Disable={spinning}
                                onClick={() => setSpinning}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PersonalInfoForm;
