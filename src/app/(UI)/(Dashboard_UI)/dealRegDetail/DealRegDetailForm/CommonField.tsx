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

const CommonFields: FC<any> = ({
  data,
  formDataValues,
  setFormDataValues,
  activeKey,
}) => {
  // const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const getDealId = searchParams.get('id');
  const {dealReg} = useAppSelector((state) => state.dealReg);
  const [formDataa, setFormData] = useState<any>();

  useEffect(() => {
    if (dealReg && dealReg?.form_data) {
      setFormData(JSON?.parse(dealReg?.form_data?.[0]));
    }
  }, [dealReg]);

  const updateTheFormValuess = () => {
    const dataaa: any = {
      id: getDealId,
      form_data: [JSON?.stringify(formDataValues)],
    };

    dispatch(updateDealRegById(dataaa));
  };

  const updateValuesFOrFOrmCommonMethod = (newObj: any) => {
    const newArr: any = formDataValues?.length > 0 ? [...formDataValues] : [];
    const index = newArr.findIndex(
      (item: any) => item.partner_program_id === activeKey,
    );
    if (index > -1) {
      const obj = {...newArr[index]};
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const common_values: any = obj?.common_formData
        ? obj?.common_formData
        : {};
      common_values[newObj.label] = newObj.value;
      obj.common_formData = common_values;
      newArr[index] = obj;

      setFormDataValues(newArr);
    }

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
  console.log(data, 'sjsajdjsdhf');
  return (
    <Row>
      <CollapseSpaceStyle size={24} direction="vertical">
        {data?.map((itemData: any, index: number) => (
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
                                      value: e?.target?.value,
                                      label: optionsItemValue?.id,
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
