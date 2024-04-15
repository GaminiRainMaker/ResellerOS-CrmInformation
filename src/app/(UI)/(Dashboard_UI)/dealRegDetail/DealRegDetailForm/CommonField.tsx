/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import {Form} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {CollapseSpaceStyle} from './styled-components';
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hook';
import {updateDealRegById} from '../../../../../../redux/actions/dealReg';

const CommonFields: FC<any> = (data) => {
  // const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getDealId = searchParams.get('id');
  const [formDataValues, setFormDataValues] = useState<any>();
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [formDataa, setFormData] = useState<any>();

  useEffect(() => {
    if (dealReg && dealReg?.form_data) {
      setFormData(JSON?.parse(dealReg?.form_data?.[0]));
    }
  }, [dealReg]);
  console.log('dealReg', formDataa);

  const updateTheFormValuess = () => {
    const dataaa: any = {
      id: getDealId,
      form_data: [JSON?.stringify(formDataValues)],
    };

    dispatch(updateDealRegById(dataaa));
  };

  const updateValuesFOrFOrmCommonMethod = (newObj: any) => {
    const newArr: any = formDataValues?.length > 0 ? [...formDataValues] : [];

    if (newArr?.length > 0) {
      const FindIndexOfObject = newArr?.findIndex(
        (item: any) =>
          item?.AttributeSection_id === newObj?.AttributeSection_id &&
          item?.attributeFiled_id === newObj?.attributeFiled_id &&
          item?.indexForattributeFiled === newObj?.indexForattributeFiled,
      );
      if (FindIndexOfObject !== -1) {
        newArr[FindIndexOfObject || 0].value = newObj?.value;
      } else {
        newArr?.push(newObj);
      }
    } else {
      newArr?.push(newObj);
    }
    setFormDataValues(newArr);
    // setFormDataValues
  };

  // const handleDealRegInformationChange = (field: string, value: any) => {
  //   setCommonFieldData((prevData: any) => ({
  //     ...prevData,
  //     id: dealReg?.id,
  //     [field]: value,
  //   }));
  // };

  useEffect(() => {
    form?.setFieldsValue({
      partner_id: data?.data?.partner_id,
      partner_program_id: data?.data?.partner_program_id,
      opportunity_id: data?.data?.opportunity_id,
      amount: data?.data?.amount,
      estimated_close_date: data?.data?.estimated_close_date,
      opportunity_description: data?.data?.opportunity_description,
      probability: data?.data?.probability,
      customer_id: data?.data?.customer_id,
    });
  }, [data]);

  // const onFinish = (values: any) => {
  //   console.log('valuesvalues', values);
  // };

  return (
    <Row>
      <CollapseSpaceStyle size={24} direction="vertical">
        {data?.data?.map((itemData: any, index: number) => (
          <div key={Number(index)} style={{marginBottom: '16px'}}>
            <OsCollapseAdmin
              items={[
                {
                  key: itemData?.attributesHeaderId,
                  label: (
                    <>
                      <Space
                        style={{
                          display: 'flex',
                          justifyContent: 'start',
                        }}
                      >
                        {/* <button onClick={updateTheFormValuess}>
                          updateTheFormValuess
                        </button> */}
                        <Typography name="Body 2/Medium">
                          {itemData?.attributesHeaderName}
                        </Typography>
                      </Space>
                    </>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      {itemData?.optionsValues?.map(
                        (optionsItemValue: any, indexOfOptions: number) => {
                          console.log('435435', formDataa);

                          const dataaForItem = formDataa?.find((items: any) => {
                            if (
                              optionsItemValue?.label === items?.label &&
                              indexOfOptions ===
                                items?.indexForattributeFiled &&
                              optionsItemValue?.attribute_section_id ===
                                items?.AttributeSection_id &&
                              optionsItemValue?.id === items?.attributeFiled_id
                            ) {
                              return items;
                            }
                          });
                          console.log('43543535', dataaForItem);
                          return (
                            <Col span={8} key={Number(indexOfOptions)}>
                              <div>
                                <Typography name="Body 4/Medium">
                                  {optionsItemValue?.label}
                                  {optionsItemValue?.is_required && (
                                    <span style={{color: 'red'}}>*</span>
                                  )}
                                </Typography>
                                <OsInput
                                  type={optionsItemValue?.data_type}
                                  defaultValue={dataaForItem?.value}
                                  onChange={(e: any) => {
                                    const newObj = {
                                      label: optionsItemValue?.label,
                                      value: e?.target?.value,
                                      AttributeSection_id:
                                        optionsItemValue?.attribute_section_id,
                                      attributeFiled_id: optionsItemValue?.id,
                                      indexForattributeFiled: indexOfOptions,
                                      help_text: optionsItemValue?.help_text,
                                    };
                                    updateValuesFOrFOrmCommonMethod(newObj);
                                  }}
                                />
                              </div>
                            </Col>
                          );
                        },
                      )}
                    </Row>
                  ),
                },
              ]}
            />
          </div>
        ))}
      </CollapseSpaceStyle>
    </Row>
  );
};

export default CommonFields;
