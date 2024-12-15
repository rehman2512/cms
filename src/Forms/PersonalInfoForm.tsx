import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";



interface Form {
  Campaign: string;
  StartDate: string;
  EndDate: string;
  MinSpeed: string;
  MaxSpeed: string;
  SelectRegion:string;
  Frequency:string;
  OldAccount:string;
  CampaignType:string;
}

interface PersonalProps {
  Back: () => void;
}


const validationSchema = yup.object().shape({
  Campaign: yup.string().required('field required'),
  StartDate: yup.string().required('field required'),
  EndDate: yup.string().required('field required'),
  MinSpeed: yup.string().required('field required'),
  MaxSpeed: yup.string().required('field required'),
  SelectRegion: yup.string().required('field required'),
  Frequency: yup.string().required('field required'),
  OldAccount: yup.string().required('field required'),
  CampaignType: yup.string().required('field required'),
 
});

const PersonalInfoForm: React.FC<PersonalProps> = ({ Back }) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
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
      Campaign: '',
      StartDate: '',
      EndDate: '',
      MinSpeed: '',
      MaxSpeed: '',
      SelectRegion:'',
      Frequency:'',
      OldAccount:'',
      CampaignType:'',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Form> = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
      message.open({
        message: 'Campaign Created',
        description: 'You have successfully Campaign Created.',
        type: 'success',
        duration: 0,
      })
    }, 2000);
    setTimeout(() => {
      Back()
    }, 3000);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <FaArrowLeft size={24} onClick={Back} className={style.backArrow} />
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormInput
                    Label='Define campaign name'
                    placeholder='Define campaign name'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Campaign'
                    type="Define campaign name"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                <FormSelect
                    control={control}
                    name="CampaignType"
                    options={[
                      { label: "Transaction Campaign", value: 1 },
                      { label: "Product Campaign", value: 2 },
                      { label: "Channel Campaign", value: 3 },
                    ]}
                    placeholder="Campaign Type"
                    errors={errors}
                    className="form-select-container"
                    classError="form-error-message"
                    showLabel={true}
                    Label="Campaign Type"
                    labelClass="form-label"
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='Date'
                    Label='Start Date'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='StartDate'
                    type="Date"
                    errors={errors}
                    control={control}
                  />
                </div>
            
              </div>
              <div className={style.formSetting}>
              <div className={style.field}>
                  <FormInput
                    placeholder='Contact'
                    Label='End Date'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='EndDate'
                    type="Date"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    Label='Min Spend'
                    placeholder='5'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='MinSpeed'
                    type="number"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    placeholder='500'
                    Label='Max Spend'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='MaxSpeed'
                    type="number"
                    errors={errors}
                    control={control}
                  />
                </div>
                {/* <div className={style.field}>
                  <FormInput
                    placeholder='Prize'
                    Label='Prize'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Prize'
                    type="number"
                    errors={errors}
                    control={control}
                  />
                </div> */}
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                {/* <FormSelect
                    control={control}
                    name="Status"
                    options={[
                      { label: "Active", value: 1 },
                      { label: "Inactive", value: 2 },
                      { label: "Pending", value: 3 },
                    ]}
                    placeholder="Status"
                    errors={errors}
                    className="form-select-container"
                    classError="form-error-message"
                    showLabel={true}
                    Label="Status"
                    labelClass="form-label"
                  /> */}
                </div>
                <div className={style.field}>
                {/* <FormSelect
                    control={control}
                    name="Platform"
                    options={[
                      { label: "ATM", value: 1 },
                      { label: "Credit Card", value: 2 },
                      { label: "Debit Card", value: 3 },
                      { label: "Mobile Banking", value: 3 },
                    ]}
                    placeholder="Platform"
                    errors={errors}
                    className="form-select-container"
                    classError="form-error-message"
                    showLabel={true}
                    Label="Platform"
                    labelClass="form-label"
                  /> */}
                </div>
                <div className={style.field}>
               
                </div>
              </div>
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormInput
                    Label='Open Account Date'
                    placeholder='5'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='OldAccount'
                    type="Date"
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                <FormSelect
                    control={control}
                    name="Frequency"
                    options={[
                      { label: "Reoccurring", value: 1 },
                      { label: "One Time", value: 2 },
                    ]}
                    placeholder="Frequency"
                    errors={errors}
                    className="form-select-container"
                    classError="form-error-message"
                    showLabel={true}
                    Label="Frequency"
                    labelClass="form-label"
                  />

                </div>
                <div className={style.field}>
                  <FormSelect
                    control={control}
                    name="SelectRegion"
                    options={[
                      { label: "Sindh", value: 1 },
                      { label: "Punjab", value: 2 },
                      { label: "Balochistan", value: 3 },
                      { label: "KPK", value: 3 },
                    ]}
                    placeholder="Select Region"
                    errors={errors}
                    className="form-select-container"
                    classError="form-error-message"
                    showLabel={true}
                    Label="Select Region"
                    labelClass="form-label"
                  />

                </div>
              </div>
              <Button Text='Create Campaign' buttonClass={style.buttonSignIn} Disable={spinning} onClick={() => setSpinning} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default PersonalInfoForm;
