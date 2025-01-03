import React, {FC, useEffect, useState} from 'react';
import {FormBuilderInterFace} from './formBuilder.interface';
import {useAppDispatch} from '../../../../../redux/hook';
import {getALlMappedOptions} from '../../../../../redux/actions/mappedOptions';
import {Space} from '@/app/components/common/antd/Space';
import {Col, Row} from 'antd';
import OsButton from '@/app/components/common/os-button';
import Typography from '@/app/components/common/typography';
import GlobalLoader from '@/app/components/common/os-global-loader';

const AddMappedOptionsForFormBuilder: FC<any> = ({
  sectionIndex,
  cartItems,
  contentIndex,
  setCartItems,
  setOpenMappedModal,
  selectedColumnIndex,
  typeOfFILE,
  activeIndexForDependent,
  dependedAdd,
}) => {
  const [loadingApi, setLoadingApi] = useState<boolean>(true);
  const [mappedOptions, setMappedOptions] = useState<any>();
  //   const NameofTheCurrentFiled =
  //     cartItems?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.name;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoadingApi(true);
    dispatch(getALlMappedOptions({}))?.then((payload: any) => {
      setMappedOptions(payload?.payload);
    });
    setLoadingApi(false);
  }, []);

  const changeFieldValues = (newValue: any, labelTypeVal: string) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                [labelTypeVal]: newValue,
              };
            }
            return contItem;
          }),
        };
      }
      return sectItem;
    });

    setCartItems(newTempArr);
    setOpenMappedModal(false);
  };

  const addnewOptionsForDependent = (newValue: any, labelTypeVal: string) => {
    const newTempArr = cartItems.map((sectItem: any, sectioIndex: number) => {
      if (sectioIndex === sectionIndex) {
        return {
          ...sectItem,
          content: sectItem.content.map((contItem: any, contInde: number) => {
            if (contInde === contentIndex) {
              return {
                ...contItem,
                dependentFiledArr: contItem?.dependentFiledArr?.map(
                  (deItem: any, deIndex: number) => {
                    if (activeIndexForDependent === deIndex) {
                      return {
                        ...deItem,
                        [labelTypeVal]: newValue,
                      };
                    }
                    return deItem;
                  },
                ),
              };
            }
            return contItem;
          }),
        };
      }
      return sectItem;
    });

    // tempvalue?.[sectionIndex || 0]?.content?.[contentIndex || 0]?.[
    //   nameOptions
    // ]?.[activeIndexForDependent || 0]?.['options']?.push('');

    setCartItems(newTempArr);
    setOpenMappedModal(false);
  };
  return (
    <GlobalLoader loading={loadingApi}>
      {mappedOptions?.length > 0 ? (
        <>
          {' '}
          {mappedOptions?.map((items: any, index: number) => {
            return (
              <Row style={{width: '100%', display: 'flex'}} gutter={16}>
                <Col
                  key={index + 1}
                  style={{
                    background: '#E9F0F7',
                    padding: '15px',
                    width: '90%',
                    margin: '10px',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    cursor: 'pointer',

                    // border: '1px solid #2364AA',
                  }}
                  span={24}
                >
                  <Typography
                    name="Body 3/Medium"
                    cursor="pointer"
                    onClick={() => {
                      if (items?.values_option) {
                        if (dependedAdd) {
                          addnewOptionsForDependent(
                            JSON?.parse(items?.values_option),
                            typeOfFILE === 'Checkbox'
                              ? 'labelOptions'
                              : 'options',
                          );
                        } else {
                          changeFieldValues(
                            JSON?.parse(items?.values_option),
                            typeOfFILE === 'Checkbox'
                              ? 'labelOptions'
                              : 'options',
                          );
                        }
                      }
                    }}
                  >
                    {items?.name}{' '}
                  </Typography>
                </Col>
              </Row>
            );
          })}
        </>
      ) : (
        <div style={{height: '50px'}}></div>
      )}
    </GlobalLoader>
  );
};

export default AddMappedOptionsForFormBuilder;
