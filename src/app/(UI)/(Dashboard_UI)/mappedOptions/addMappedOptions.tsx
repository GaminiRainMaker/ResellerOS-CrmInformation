'use client';

import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import OsButton from '@/app/components/common/os-button';
import GlobalLoader from '@/app/components/common/os-global-loader';
import OsInput from '@/app/components/common/os-input';
import Typography from '@/app/components/common/typography';
import React, {useEffect, useState} from 'react';
import {useAppDispatch} from '../../../../../redux/hook';
import {Input, notification} from 'antd';
import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {insertMappedOptions} from '../../../../../redux/actions/mappedOptions';

const AddMappedOptions: React.FC<any> = ({
  recordId,
  setAddNewOptionModal,
  drawer,
  getllMappedOption,
  setOptionsData,
  optionsData,
  setNameOfOption,
  nameOfOption,
  setShowError,
  showError,
}) => {
  const [token] = useThemeToken();
  const dispatch = useAppDispatch();
  const [loadingOption, setLoadingOptions] = useState<boolean>(false);

  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  const handleSortfortable = (changeOptions: any) => {
    const optionItems: any = [...optionsData];

    // remove and save the dragged item content
    const draggedItemContent1 = optionItems?.splice(dragItem.current, 1)[0];

    // switch the position
    optionItems?.splice(dragOverItem.current, 0, draggedItemContent1);

    // reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    // update the actual array;
    setOptionsData(optionItems);
  };

  const addNewRowToOptions = () => {
    setShowError(false);

    let newArr: any = optionsData?.length > 0 ? [...optionsData] : [];
    newArr?.push('');
    setOptionsData(newArr);
  };
  const deleteOption = (index: number) => {
    let newArr: any = optionsData?.length > 0 ? [...optionsData] : [];
    newArr?.splice(index, 1);
    setOptionsData(newArr);
  };

  const changeValueOfOption = (index: number, value: any) => {
    let newArr: any = optionsData?.length > 0 ? [...optionsData] : [];
    let updatedArr = newArr?.map((items: any, indexOf: number) => {
      if (indexOf === index) {
        return value;
      }
      return items;
    });
    setOptionsData(updatedArr);
  };

  // useEffect(() => {
  //   let findError = optionsData?.find((it: string) => it === '');
  //   if (!findError && nameOfOption) {
  //     setShowError(false);
  //   }
  // }, [optionsData, nameOfOption]);
  const addNewOptionData = async () => {
    if (!nameOfOption) {
      setShowError(true);
      return;
    }

    let findError = optionsData?.findIndex((it: string) => it === '');
    if (findError > -1) {
      setShowError(true);
      notification?.open({
        message: 'Please enter values for the options!',
        type: 'error',
      });
      return;
    }
    let newObj = {
      name: nameOfOption,
      values_option: JSON?.stringify(optionsData),
    };
    await dispatch(insertMappedOptions(newObj));
    setNameOfOption('');
    setOptionsData([]);
    getllMappedOption();
    setShowError(false);

    setAddNewOptionModal(false);
  };

  return (
    <GlobalLoader loading={loadingOption}>
      {' '}
      <>
        {!drawer && (
          <Row
            justify="space-between"
            style={{
              padding: '24px 40px 20px 40px',
              backgroundColor: '#F0F4F7',
              borderRadius: '10px 10px 0px 0px',
            }}
            gutter={[0, 16]}
          >
            <Typography
              name="Body 1/Regular"
              align="left"
              color={token?.colorLinkHover}
            >
              Add New Mapped Option
            </Typography>
          </Row>
        )}

        <Space
          size={16}
          direction="vertical"
          style={{
            width: '100%',
            padding: drawer ? '' : '24px 40px 20px 40px',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={24}>
              <Typography name="Body 4/Medium">Name</Typography>
              <OsInput
                placeholder="Enter Text"
                value={nameOfOption}
                onChange={(e: any) => {
                  setNameOfOption(e?.target?.value);
                }}
              />
              {showError && !nameOfOption && (
                <div style={{color: 'red'}}>This Field is required!</div>
              )}
            </Col>
          </Row>
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={24}>
              <Typography name="Body 4/Medium">Options</Typography>
              <div style={{marginBottom: '10px', width: '100%'}}>
                <OsButton
                  text="+  Add New"
                  buttontype="PRIMARY"
                  style={{width: '100%'}}
                  clickHandler={addNewRowToOptions}
                />
              </div>{' '}
              <div>
                {optionsData?.map((itemOption: any, indexOp: number) => (
                  <Row style={{width: '100%'}}>
                    <Col
                      key={indexOp}
                      className="list-item"
                      draggable
                      onDragStart={(e) => {
                        dragItem.current = indexOp;
                      }}
                      onDragEnter={(e) => {
                        dragOverItem.current = indexOp;
                      }}
                      onDragEnd={() => handleSortfortable('options')}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginBottom: '25px',
                        gap: '12px',
                      }}
                    >
                      {/* <div>{itemOption}</div> */}
                      <OsInput
                        key={indexOp}
                        // defaultValue={itemOption}
                        type="text"
                        style={{
                          border:
                            showError && itemOption === ''
                              ? '1px solid red'
                              : '',
                        }}
                        value={itemOption}
                        onChange={(e: any) => {
                          changeValueOfOption(indexOp, e?.target?.value);
                        }}
                      />{' '}
                      <TrashIcon
                        color="#EB445A"
                        width={35}
                        onClick={() => deleteOption(indexOp)}
                      />{' '}
                      <ArrowsPointingOutIcon
                        color="#2364AA"
                        width={35}
                        key={indexOp}
                      />
                      {/* {showError && itemOption === '' && (
                      <div style={{color: 'red'}}>Please enter the value!</div>
                    )} */}
                    </Col>
                  </Row>
                ))}
              </div>
            </Col>
          </Row>
          {!drawer && (
            <Row
              justify="space-between"
              gutter={[24, 24]}
              style={{justifyContent: 'end'}}
            >
              {/* <Col sm={24} md={24} style={{justifyContent: 'end'}}> */}
              <div style={{marginRight: '10px'}}>
                {' '}
                <OsButton
                  text={drawer ? 'Update' : 'Save'}
                  buttontype="PRIMARY"
                  clickHandler={() => {
                    addNewOptionData();
                  }}
                />{' '}
              </div>
              <OsButton
                text={'Close'}
                buttontype="SECONDARY"
                clickHandler={() => {
                  setAddNewOptionModal(false);
                }}
              />
              {/* </Col> */}
            </Row>
          )}
        </Space>
      </>
    </GlobalLoader>
  );
};

export default AddMappedOptions;
