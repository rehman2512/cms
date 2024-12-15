import React from 'react';
import { Input, Checkbox } from 'antd';
import { Controller, Control, FieldErrors } from 'react-hook-form';



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
        <span className={classError}>{String(errors[name]?.message)}</span>
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
        <p className={ErrorClass}>
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};

export { FormInput, FormCheckBox };
