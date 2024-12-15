import React from 'react';
import { Input, Checkbox, Select } from 'antd';
import { Controller, Control, FieldErrors } from 'react-hook-form';


const { Option } = Select;

interface FormInputProps {
  control: Control<any>;
  placeholder?: string;
  className?: string;
  showLabel?: boolean;
  Label?: string;
  name: string;
  labelClass?: string;
  classInput?: string;
  type?: string;
  errors: FieldErrors;
  classError?: string;
  [key: string]: unknown;
}

const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  className,
  showLabel = true,
  Label,
  name,
  labelClass,
  control,
  classInput,
  type = "text",
  errors,
  classError,
  ...rest
}) => {
  return (
    <div className={className}>
      {showLabel && (
        <label htmlFor={name} className={labelClass}>{Label}</label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            {...field} 
            type={type}
            placeholder={placeholder}
            className={classInput}
            {...rest} 
          />
        )}
      />

      {errors[name] && (
        <span className={classError} style={{color:"red",fontSize:12}}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

interface FormCheckBoxProps {
  control: Control<any>;
  name: string;
  errors: FieldErrors;
  CheckboxClass?: string;
  isShowError?: boolean;
  labelText?: string;
  ErrorClass?: string;
  [key: string]: unknown;
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({
  name,
  errors,
  CheckboxClass,
  isShowError = false,
  labelText,
  ErrorClass,
  control,
  ...rest
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div>
            <Checkbox
              className={CheckboxClass}
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              id={name}
              {...rest}
            >
              {labelText}
            </Checkbox>
          </div>
        )}
      />
      {errors[name] && isShowError && (
        <p className={ErrorClass} style={{color:"red",fontSize:12}}>
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

interface FormSelectProps {
  control: Control<any>;
  name: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  errors: FieldErrors;
  className?: string;
  classError?: string;
  showLabel?: boolean;
  Label?: string;
  labelClass?: string;
  [key: string]: unknown;
}

const FormSelect: React.FC<FormSelectProps> = ({
  control,
  name,
  options,
  placeholder,
  errors,
  className,
  classError,
  showLabel = true,
  Label,
  labelClass,
  ...rest
}) => {
  return (
    <div style={{display:"flex", flexDirection:"column", width:'385px', marginTop:7}}>
      {showLabel && (
        <label htmlFor={name} className={labelClass} style={{margin:0, padding:0, }}>{Label}</label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={placeholder}
            style={{marginTop:"7px",height:"40px"}}
            onChange={(value) => field.onChange(value)}
            onBlur={field.onBlur}
            value={field.value}
            {...rest}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      />
      {errors[name] && (
        <span className={classError} style={{color:"red",fontSize:12}}>{String(errors[name]?.message)}</span>
      )}
    </div>
  );
};

export { FormInput, FormCheckBox,FormSelect };
