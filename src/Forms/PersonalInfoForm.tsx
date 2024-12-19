import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import style from './Form.module.css';
import { FormInput, FormSelect } from '../components/Basic/FormInput';
import Button from '../components/Basic/button';
import { useNavigate } from 'react-router-dom';
import { notification, Spin, Modal, Button as AntButton, Table, Input, Tag } from 'antd';
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { DataType } from '../components/Features/Features';
import { text } from 'stream/consumers';
import Operation from 'antd/es/transfer/operation';
import { Placeholder } from 'react-bootstrap';
import { FaShieldHalved } from 'react-icons/fa6';

interface NewFieldForm {
  FieldName: string;
  FieldType: string;
  FieldOptions?: string; // Optional field for select options
  GroupFields?: string;
  filterType?: string;  
  StartValue?: string;  // Optional field for 'between' filter
  EndValue?: string; // Optional field for grouped fields
}

interface Form {
  Campaign: string;
  StartDate: string;
  EndDate: string;
  WinnerAnnouncement?:string;
  WinnerBranchExcluded?: string;
  NoOfWinners?:string; 
}



interface PersonalProps {
  Back: () => void;
  selectedFeatures: DataType[];
}

const fieldArr: any= [
  { label: 'Transaction Amount (number)', value: '1', type: 'number', valuePlaceholder: 'Transaction Amount' },
  { label: 'Date Of Birth (date)', value: '2', type: 'date', valuePlaceholder: 'Date Of Birth' },
  { label: 'Region (string)', value: '3', type: 'text', valuePlaceholder: 'Region' },
  { label: 'Nationality (string)', value: '4', type: 'text', valuePlaceholder: 'Nationality' },
  { label: 'Bank Branch (string)', value: '5', type: 'text', valuePlaceholder: 'Bank Branch' },
  { label: 'Customer Type (string)', value: '6', type: 'text', valuePlaceholder: 'Customer Type' },
  { label: 'Age (number)', value: '7', type: 'number', valuePlaceholder: 'Age' },
  { label: 'Spent Amount (number)', value: '7', type: 'number', valuePlaceholder: 'Spent Amount' },
  { label: 'Monthly Spent Amount (number)', value: '7', type: 'number', valuePlaceholder: 'Monthly Spent Amount' }
];

const arrOperations: any = [
  { label: 'Less Than', value: '1', operator: '<', applicableType: ['number', 'date'] },
  { label: 'Less Than or Equal', value: '2', operator: '<=', applicableType: ['number', 'date'] },
  { label: 'Greater Than', value: '3', operator: '>', applicableType: ['number', 'date'] },
  { label: 'Greater Than or Equal', value: '4', operator: '>=', applicableType: ['number', 'date'] },
  { label: 'Equal To', value: '5', operator: '=', applicableType: ['number', 'text', 'date'] },
  { label: 'In List', value: '6', operator: 'in', applicableType: ['number', 'text', 'date'] },
  { label: 'Not In List', value: '7', operator: 'not in', applicableType: ['number', 'text', 'date'] },
  { label: 'Between Range', value: '8', operator: 'between', applicableType: ['number', 'date'] }
];


// let fieldData: Object = {
//   fieldName: '',
//   fieldType: '',
//   fieldOperation: '',
//   fieldValue: '',
//   fieldRangeValue: {
//     value1: '',
//     value2: ''
//   },
//   fieldArrValue: [],
// }

const validationSchema = yup.object().shape({
  Campaign: yup.string().required('Campaign Name is required'),
  StartDate: yup.string().required('Start Date is required'),
  EndDate: yup.string().required('End Date is required').typeError('End Date must be a valid date'),
  WinnerAnnouncement: yup.string(),
  WinnerBranchExcluded: yup.string(),
  NoOfWinners: yup.string(),
});

type FieldDataType = {
  fieldId: number;
  fieldName: string;
  fieldType: string;
  fieldOperation: string;
  fieldOperationLabel: string;
  fieldValue: string;
  fieldValuePlaceholder: string;
  fieldRangeValue: {
    value1: string;
    value2: string;
  };
  fieldArrValue: string[]; // Specify the type for fieldArrValue
};


const PersonalInfoForm: React.FC<PersonalProps> = ({ Back ,selectedFeatures }) => {
  const [message, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dynamicFields, setDynamicFields] = useState<NewFieldForm[]>([]);
  const [selectedFieldType, setSelectedFieldType] = useState<string>('');
  const [selectedFieldLabel, setSelectedFieldLabel] = useState<string>(''); 
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]); // <string[]> type explicitly defined
  const [inputValue, setInputValue] = useState<string>('');
  const [applicableOperations, setApplicableOperations] = useState<[]>([]);
  const [fieldData, setFieldData] = useState<FieldDataType>({
    fieldId: 0,
    fieldName: '',
    fieldType: '',
    fieldOperation: '',
    fieldOperationLabel: '',
    fieldValue: '',
    fieldValuePlaceholder: '',
    fieldRangeValue: {
      value1: '',
      value2: ''
    },
    fieldArrValue: [],
  }); 

  const navigate = useNavigate();

  console.log(selectedFieldLabel ,'asda')


  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Form>({
    defaultValues: {
      Campaign: '',
      StartDate: '',
      EndDate: '',
      WinnerAnnouncement:'',
      WinnerBranchExcluded:'',
      NoOfWinners:'',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const {
    control: modalControl,
    formState: { errors: modalErrors },
    handleSubmit: handleModalSubmit,
    reset: resetModal,
    getValues,
  } = useForm<NewFieldForm>({
    defaultValues: { FieldName: '', FieldType: '', FieldOptions: '', GroupFields: '' },
  });

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    resetModal();
    setIsModalOpen(false);
  };

  const onMainSubmit: SubmitHandler<Form> = (data) => {
    const combinedData = {
      ...data, // Form data
      dynamicFields, // Table data
    };

    console.log('Combined Data:', combinedData);

    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      message.open({
        message: 'Campaign Created',
        description: 'You have successfully created a campaign.',
        type: 'success',
        duration: 2,
      });
      Back();
    }, 3000);
  };

  const fieldTypeLabels: Record<string, string> = {
    number: 'Transaction Amount',
    date: 'Date of Birth',
    text: 'Text Field',
    'Region (string)': 'Region',
    'Nationality (string)': 'Nationality',
    'Bank Branch (string)': 'Bank Branch',
    'Customer Type (string)': 'Customer Type',
    'Age (number)': 'Age',
  };
  const filterTypeLabels: Record<string, string> = {
    '<': 'Less Than',
    '<=': 'Less Than or Equal',
    '>': 'Greater Than',
    '>=': 'Greater Than or Equal',
    '=': 'Equal To',
    in: 'In List',
    between: 'Between Range',
  };


  const onModalSubmit: SubmitHandler<NewFieldForm> = (data) => {
    // if(['=', '<', '<=', '>', '>='].includes(fieldData.fieldOperation)) {
    //   setFieldData({
    //     ...fieldData,
    //     fieldValue: getValues('StartValue') || ''
    //   });
    // } else if (fieldData.fieldOperation === 'between') {
    //   setFieldData({
    //     ...fieldData,
    //     fieldRangeValue: {
    //       value1: getValues('StartValue') || '',
    //       value2: getValues('EndValue') || ''
    //     }
    //   });
    // }
    // console.log('fieldData:', fieldData );


    // // const label = fieldTypeLabels[selectedFieldType] || 'Unknown Field';
    // const label = fieldTypeLabels[selectedFieldType.trim()] || `Unknown Field (${selectedFieldType})`;
    // const filterLabel = filterTypeLabels[selectedFilter] || 'No Filter';
    // console.log("Selected Field Type Label:", label); // Debugging


    
    const startValue = getValues('StartValue') || '';
    const endValue = getValues('EndValue') || '';
    const betweenValue = fieldData.fieldOperation === 'between' ? `${startValue} & ${endValue}` : '';
    const inValue = ['in', 'not in'].includes(fieldData.fieldOperation) ? tags.join(', ') : '';
    const singleValue = ['=', '<', '<=', '>', '>='].includes(fieldData.fieldOperation)
      ? data.StartValue || ''
      : '';
  
  
    const newField = {
      FieldName: fieldData.fieldName || 'Unknown Field', // Use label from mapping
      FieldType: fieldData.fieldType|| data.FieldType,
      FieldOptions: fieldData.fieldOperation,
      filterType:fieldData.fieldOperationLabel,
      Value: betweenValue || inValue || singleValue || 'N/A',// Add Value for 'between' or default
    };
  
  
    setDynamicFields((prevFields) => [...prevFields, newField]);
  
    setFieldData({
      ...fieldData,
      fieldId: 0,
      fieldName: '',
      fieldType: '',
      fieldValuePlaceholder: '',
      fieldOperation: '',
      fieldOperationLabel: '',
      fieldValue: '',
      fieldRangeValue: {
        value1: '',
        value2: ''
      },
      fieldArrValue: []
    })

    resetModal();
    setSelectedFieldType('');
    setSelectedFilter('');
    setSelectedFieldLabel('');
    setIsModalOpen(false);
  };
  
  

  const handleDeleteField = (index: number) => {
    setDynamicFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleFieldTypeChange = (value: string) => {
    setSelectedFieldType(value);
    setSelectedFilter(''); // Reset filter when field type changes
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    setSelectedFieldType(value);

  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setFieldData({
        ...fieldData,
        fieldArrValue: tags
      })
    }
    setInputValue('');
  };

  // Tag ko delete karna
  const handleTagClose = (removedTag: string) => {
    setTags(tags.filter(tag => tag !== removedTag));
    setFieldData({
      ...fieldData,
      fieldArrValue: tags
    })
  };

  const columns = [
    {
      title: 'Field Name',
      dataIndex: 'FieldName',
      key: 'FieldName',
    },
    {
      title: 'Field Type',
      dataIndex: 'FieldType',
      key: 'FieldType',
    },
    {
      title: 'Values',
      dataIndex: 'Value',
      key: 'Value',
      render: (text: string) => text || '-', // Show '-' if FieldOptions is empty
    },
    {
      title: 'Filter Type',
      dataIndex: 'filterType',
      key: 'filterType',
      render: (text: string) => text || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any, index: number) => (
        <FaTrash
          className={style.deleteIcon}
          onClick={() => handleDeleteField(index)}
          title="Delete Field"
        />
      ),
    },
  ];
  

  return (
    <>
      {contextHolder}
      <Spin spinning={spinning} fullscreen />
      <div className={`container-fluid ${style.Container}`}>
        <div className={style.addbtn}>
          <FaArrowLeft size={24} onClick={Back} className={style.backArrow} />
          <Button Text='Add Field' buttonClass={style.buttonSignIn} Disable={spinning} onClick={showModal} />
        </div>
        <div className='d-flex mx-3'>
                {selectedFeatures.map((feature) => (
                    <span key={feature.key} className='mx-1' style={{color:"green", fontSize:12}} >
                       {feature.title} 
                    </span>
                ))}
            </div>
        <div className={`row ${style.row}`}>
          <div className={`col-lg-12 col-md-6 col-sm-6 ${style.SignInContainer}`}>
            <form onSubmit={handleSubmit(onMainSubmit)}>
              <div className={style.formSetting}>
                <div className={style.field}>
                  <FormInput
                    Label='Campaign Name'
                    placeholder='Campaign Name'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='Campaign'
                    type='text'
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    Label='Start Date'
                    placeholder='Start Date'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='StartDate'
                    type='date'
                    errors={errors}
                    control={control}
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    Label='End Date'
                    placeholder='End Date'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='EndDate'
                    type='date'
                    errors={errors}
                    control={control}
                  />
                </div>
              </div>
              <div className={style.formSetting}>
               
                <div className={style.field}>
                  <FormSelect
                    control={modalControl}
                    options={[
                      { label: 'End Of Campaign', value: 'End Of Campaign ' },
                      { label: 'Weekly Winner', value: 'Weekly Winner' },
                      { label: 'Monthly Winner', value: 'Monthly Winner' },
                    ]}
                    placeholder='Select Field Type'
                    errors={modalErrors}
                    className='form-select-container'
                    classError='form-error-message'
                    showLabel={true}
                    Label='Winner Announcement'
                    name='WinnerAnnouncement'
                    labelClass='form-label'
                    
                  />
                </div>
                <div className={style.field}>
                  <FormInput
                    Label='No Of Winners'
                    placeholder='No Of Winners'
                    classInput={style.Input}
                    className={style.inputContainer}
                    labelClass={style.Label}
                    classError={style.Error}
                    name='NoOfWinners'
                    errors={errors}
                    control={control}
                  />
                </div>  
                <div className={style.field}>
                  <FormSelect
                    control={modalControl}
                    name='WinnerBranchExcluded'
                    options={[
                      { label: 'Yes', value: 'Yes' },
                      { label: 'No', value: 'No' },
                    ]}
                    placeholder='Select Field Type'
                    errors={modalErrors}
                    className='form-select-container'
                    classError='form-error-message'
                    showLabel={true}
                    Label='Winner Branch Excluded'
                    labelClass='form-label'
                    
                  />
                </div>
               
              </div>

              <div className={style.tableContainer}>
                {dynamicFields.length > 0 ? (
                  <>
                  <h6>Campaign Parameters Configuration</h6>
                  <Table
                    columns={columns}
                    dataSource={dynamicFields.map((field, index) => ({ ...field, key: index }))}
                    pagination={false}
                    rowKey="key"
                    size="small"

                  />
                  </>
                ) : (
                  ""
                )}
              </div>

              <Button onClick={() => setSpinning} Text='Create Campaign' buttonClass={style.buttonSignIn} Disable={spinning} />
            </form>

            <Modal title='Add New Field' open={isModalOpen} onCancel={handleCancel} footer={null} className={style.modal}>
              <form onSubmit={handleModalSubmit(onModalSubmit)} className={style.selectField} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); } }}>

                <div className={style.field}>
                  <FormSelect
                    control={modalControl}
                    name='FieldType'
                    
                    options={fieldArr}
                    placeholder='Select Field Type'
                    errors={modalErrors}
                    className='form-select-container'
                    value={fieldData.fieldName}
                    classError='form-error-message'
                    showLabel={true}
                    Label='Add Parameter'
                    labelClass='form-label'
                    onChange={(value: any, option: any) => {
                      let field = fieldArr.filter((x : any) => x.value == value)[0]
                      
                      // console.log('Selected Field Type Value:', value);
                      // console.log('Selected Field Type Label:', option.label);
                      // setSelectedFieldType(field.label); // Store the value
                      // setSelectedFieldLabel(option.label); // Store the label
                      // console.log('Selected Field Type option:', field);
                      // console.log('Selected Field Type Value:', value);

                      setFieldData({
                        ...fieldData,
                        fieldId: field.value,
                        fieldName: field.label,
                        fieldType: field.type,
                        fieldValuePlaceholder: field.valuePlaceholder,
                        fieldOperation: '',
                        fieldOperationLabel: '',
                        fieldValue: '',
                        fieldRangeValue: {
                          value1: '',
                          value2: ''
                        },
                        fieldArrValue: []
                      })

                      let arrFilteredOperations = arrOperations.filter((x:any) => x.applicableType.includes(field.type.trim()));
                      setApplicableOperations(arrFilteredOperations);
                    }}
                  />
                </div>

                
                <div className={style.field}>
                  <FormSelect
                    control={modalControl}
                    name='FilterType'
                    options={applicableOperations}
                    placeholder='Select Filter'
                    errors={modalErrors}
                    className='form-select-container'
                    classError='form-error-message'
                    showLabel={true}
                    value={fieldData.fieldOperationLabel}
                    Label='Filter'
                    labelClass='form-label'
                    onChange={(value: any, option: any) => {
                      let fieldOperation: any = applicableOperations.filter((x : any) => x.value == value)[0]

                      setFieldData({
                        ...fieldData,
                        fieldOperation: fieldOperation.operator,
                        fieldOperationLabel: fieldOperation.label,
                        fieldValue: '',
                        fieldRangeValue: {
                          value1: '',
                          value2: ''
                        },
                        fieldArrValue: []
                      })
                    }}
                  />
                </div>

                {['=', '<', '<=', '>', '>='].includes(fieldData.fieldOperation) && (
                  <div className={style.field}>
                    <FormInput
                      Label='Values '
                      placeholder={fieldData.fieldValuePlaceholder}
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='StartValue'
                      type={fieldData.fieldType}
                      // value={fieldData.fieldValue}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}
                {['in', 'not in'].includes(fieldData.fieldOperation) && (
                  <div className={style.field}>
                    <div>
                      <Input
                        style={{ width: 200 }}
                        placeholder={fieldData.fieldValuePlaceholder}
                        value={inputValue}
                        type={fieldData.fieldType}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleInputConfirm} // Enter dabane per tag add hoga
                      />
                      {tags.map(tag => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => handleTagClose(tag)}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )}
                {fieldData.fieldOperation === 'between' && (
                  <div className={style.field}>
                    <FormInput
                      Label={'From ' + fieldData.fieldValuePlaceholder}
                      // placeholder={'From ' + fieldData.fieldValuePlaceholder}
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='StartValue'
                      type={fieldData.fieldType}
                      // value={fieldData.fieldRangeValue.value1}
                      errors={modalErrors}
                      control={modalControl}
                    />
                    <FormInput
                      Label={'To ' + fieldData.fieldValuePlaceholder}
                      // placeholder={'To ' + fieldData.fieldValuePlaceholder}
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='EndValue'
                      type={fieldData.fieldType}
                      // value={fieldData.fieldRangeValue.value2}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}


                <br></br>
                <br></br>
                <br></br>
                <br></br>

                {/* {fieldData.fieldOperation === 'between' && (
                  <div className={style.field}>
                    <FormInput
                      Label={`Start ${selectedFieldType}`}
                      placeholder='Enter Start Value'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='StartValue'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                    <FormInput
                      Label={`End ${selectedFieldType}`}
                      placeholder='Enter End Value'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='EndValue'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )} */}

                {/* {(fieldData.fieldOperation === 'in' || fieldData.fieldOperation === 'not in') && (
                  <div className={style.field}>
                    <div>
                      
                      <Input
                        style={{ width: 200 }}
                        placeholder="Enter a tag"
                        value={inputValue}
                        type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleInputConfirm} // Enter dabane per tag add hoga
                      />
                      {tags.map(tag => (
                        <Tag
                          key={tag}
                          closable
                          onClose={() => handleTagClose(tag)}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                )} */}
                {/* {fieldData.fieldOperation === '=' && (
                  <div className={style.field}>
                    <FormInput
                      Label='Values '
                      placeholder='e.g., 10, 20, 30'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='FieldOptions'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}
                {fieldData.fieldOperation === '>' && (
                  <div className={style.field}>
                    <FormInput
                      Label='Values '
                      placeholder='e.g., 10, 20, 30'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='FieldOptions'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}
                {fieldData.fieldOperation === '<' && (
                  <div className={style.field}>
                    <FormInput
                      Label='Values '
                      placeholder='e.g., 10, 20, 30'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='FieldOptions'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}
                {selectedFilter === '=>' && (
                  <div className={style.field}>

                    <FormInput
                      Label='Value'
                      placeholder='Enter End Value'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='FieldOptions'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />
                  </div>
                )}
                {selectedFilter === '<=' && (
                  <div className={style.field}>
                    <FormInput
                      Label='Value'
                      placeholder='Enter Start Value'
                      classInput={style.Input}
                      className={style.inputContainer}
                      labelClass={style.Label}
                      classError={style.Error}
                      name='FieldOptions'
                      type={selectedFieldType === 'number' ? 'number' : selectedFieldType === 'date' ? 'date' : 'text'}
                      errors={modalErrors}
                      control={modalControl}
                    />

                  </div>
                )} */}


                <div className={style.modalFooter}>
                  <AntButton onClick={handleCancel} style={{ marginRight: 10 }}>
                    Cancel
                  </AntButton>
                  <AntButton type='primary' htmlType='submit' className={style.andtbtn}>
                    Save Field
                  </AntButton>
                </div>
              </form>
            </Modal>

          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoForm;
