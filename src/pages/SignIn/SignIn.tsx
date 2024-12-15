'use client';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput, FormCheckBox } from '../../components/Basic/FormInput';
import { useNavigate, useNavigation } from 'react-router-dom';
import { notification, Spin } from 'antd';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import style from './SignIn.module.css';
import SignInImage from '../../Images/SignIn_Image.png';
import logoring from '../../Images/logoring.png'
import LogoImage from '../../Images/ahlibank.png';
import Button from '../../components/Basic/button';

interface SignInForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}



const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format. Add `@`.').required('Email is required'),
  password: yup.string().required('Password is required'),
  rememberMe: yup.boolean(),
});

const SignIn: React.FC = () => {
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
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<SignInForm> = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
      message.open({
        message: 'Login Successful',
        description: 'You have successfully logged in.',
        type: 'success',
        duration: 0,
      })
    }, 2000);
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className='container-fluid'>
        <div className='row d-flex flex-row'>
          <div className={`col-lg-6 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            {isClient && (
              <img src={LogoImage} alt='Company Logo' className={style.Logo} width={200} />
            )}
            <h4>Sign In</h4>
            <p>Sign in to stay connected.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                placeholder='Enter Your Email'
                Label='Email'
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name='email'
                type="email"
                errors={errors}
                control={control}
              />
              <FormInput
                placeholder='Enter Your Password'
                Label='password'
                classInput={style.Input}
                className={style.inputContainer}
                labelClass={style.Label}
                classError={style.Error}
                name='password'
                type="password"
                errors={errors}
                control={control}
              />
              <div className={style.rememberContainer}>
                <FormCheckBox
                  name='rememberMe'
                  labelText='Remember me?'
                  ErrorClass={`${style.ErrorClass}`}
                  isShowError={false}
                  CheckboxClass={`${style.remember}`}
                  errors={errors}
                  control={control}

                />
                <Link to="/">Forgot Password?</Link>
              </div>
              <div className={style.btn}>
                <Button Text='Sign In' buttonClass={style.buttonSignIn} Disable={spinning} onClick={() => setIsClient} />
              </div>
            </form>
          </div>
          <div className={`col-lg-6 col-md-6 col-sm-6 ${style.imageContainer}`}>
            <img src={SignInImage} alt='Sign In Illustration' className={style.SignInImage} />
            <div className={style.righsidebottom}>
              <img src={logoring} alt='' width={60} height={60} className={style.ring} />
              <h4>We Excel together for a promising
                future in the banking sector</h4>
              <p>To be a trusted and preferred banking partner, dedicated
                to creating unique value for our employees, customers,
                shareholders, and society</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default SignIn;
