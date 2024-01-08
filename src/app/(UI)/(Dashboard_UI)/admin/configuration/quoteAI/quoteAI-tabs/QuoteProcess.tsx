'use client';

import {Checkbox} from '@/app/components/common/antd/Checkbox';
import {Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsButton from '@/app/components/common/os-button';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import OsInput from '@/app/components/common/os-input';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import {useEffect, useState} from 'react';
import {
  ContractConfigurationColumn,
  opportunityColumn,
  quoteColumns,
  quoteLineItemColumn,
} from '@/app/utils/CONSTANTS';
import {TabContainerStyle} from './styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../../redux/hook';
import {
  getAllContractSetting,
  insertUpdateContractSetting,
} from '../../../../../../../../redux/actions/contractSetting';

const QuoteProcess = () => {
  const [fieldNameOption, setFieldNameOption] = useState<any>();

  const [contractSetting, setContractSetting] = useState<any>();
  const dispatch = useAppDispatch();
  const {data: contractSettingData} = useAppSelector(
    (state) => state.contractSetting,
  );

  const updateContractSetting = async () => {
    await dispatch(insertUpdateContractSetting(contractSetting));
    dispatch(getAllContractSetting(''));
  };
  useEffect(() => {
    setContractSetting(contractSettingData);
  }, [contractSettingData]);
  useEffect(() => {
    dispatch(getAllContractSetting(''));
  }, []);

  useEffect(() => {
    if (contractSetting?.object_name === 'quote') {
      setFieldNameOption(quoteColumns);
    } else if (contractSetting?.object_name === 'quote_line_item') {
      setFieldNameOption(quoteLineItemColumn);
    } else if (contractSetting?.object_name === 'opportunity') {
      setFieldNameOption(opportunityColumn);
    }
  }, [contractSetting?.object_name]);
  return (
    <TabContainerStyle>
      <Row>
        <Space
          size={24}
          direction="vertical"
          style={{
            width: '100%',
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
          }}
        >
          <OsCollapseAdmin
            items={[
              {
                key: '1',
                label: (
                  <Typography name="Body 2/Medium">
                    Contract Configuration
                  </Typography>
                ),
                children: (
                  <Space
                    size={36}
                    direction="vertical"
                    style={{
                      width: '100%',
                      background: 'white',
                      borderRadius: '12px',
                    }}
                  >
                    <Space
                      size={4}
                      direction="vertical"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Typography name="Body 4/Medium">Object Name </Typography>
                      <CommonSelect
                        placeholder="Select"
                        style={{width: '100%'}}
                        value={contractSetting?.object_name}
                        options={ContractConfigurationColumn}
                        onChange={(e) => {
                          setContractSetting({
                            ...contractSetting,
                            object_name: e,
                          });
                        }}
                      />
                    </Space>
                    <Space
                      size={4}
                      direction="vertical"
                      style={{
                        width: '100%',
                      }}
                    >
                      <Typography name="Body 4/Medium">
                        Matching Field Name
                      </Typography>
                      <CommonSelect
                        placeholder="Select"
                        style={{width: '100%'}}
                        options={fieldNameOption}
                        value={contractSetting?.matching_filed}
                        onChange={(e) => {
                          setContractSetting({
                            ...contractSetting,
                            matching_filed: e,
                          });
                        }}
                      />
                    </Space>
                  </Space>
                ),
              },
            ]}
          />
        </Space>
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            marginTop: '30px',
          }}
        >
          <OsCollapseAdmin
            items={[
              {
                key: '2',
                label: (
                  <Typography name="Body 2/Medium">
                    Validation Tab Visibility Configuration
                  </Typography>
                ),
                children: (
                  <Space
                    size={36}
                    direction="vertical"
                    style={{
                      width: '100%',
                      background: 'white',
                      borderRadius: '12px',
                    }}
                  >
                    <Space size={8}>
                      <Checkbox
                        checked={contractSetting?.show_validation_tab}
                        onChange={(e) => {
                          if (e?.target?.checked) {
                            setContractSetting({
                              ...contractSetting,
                              show_validation_tab: true,
                            });
                          } else {
                            setContractSetting({
                              ...contractSetting,
                              show_validation_tab: false,
                            });
                          }
                        }}
                      />
                      <Typography name="Body 4/Medium">
                        Show Validation Tab
                      </Typography>
                    </Space>
                  </Space>
                ),
              },
            ]}
          />
        </Space>
      </Row>
      <footer
        style={{
          width: 'max-content',
          float: 'right',
          position: 'absolute',
          bottom: '0%',
          right: '0%',
        }}
      >
        <OsButton
          text="Save"
          buttontype="PRIMARY"
          clickHandler={updateContractSetting}
        />
      </footer>
    </TabContainerStyle>
  );
};
export default QuoteProcess;
