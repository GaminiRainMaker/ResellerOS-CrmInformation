import {Space} from '@/app/components/common/antd/Space';
import React, {useState} from 'react';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import Typography from '@/app/components/common/typography';
import CommonSelect from '@/app/components/common/os-select';
import {Col, Row} from '@/app/components/common/antd/Grid';
import useThemeToken from '@/app/components/common/hooks/useThemeToken';
import {PlusIcon} from '@heroicons/react/24/outline';
import {partnerOptions, partnerProgramOptions} from '@/app/utils/CONSTANTS';
import {CollapseSpaceStyle} from '../dealRegDetail/DealRegDetailForm/styled-components';

const AddRegistrationForm = () => {
  const [token] = useThemeToken();
const [dealRegForm, setDealRegForm] = useState([{}])
  const RegisteredPartnersItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Registered Partners</Typography>,
      children: (
        <Space
          size={12}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner</Typography>
                <CommonSelect
                  placeholder="Select"
                  options={partnerOptions}
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Programm</Typography>
                <CommonSelect
                  placeholder="Select"
                  options={partnerProgramOptions}
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                <PlusIcon
                  width={24}
                  color={token?.colorLink}
                  style={{marginTop: '5px'}}
                />
                <Typography name="Body 3/Bold" color={token?.colorLink}>
                  Add Partner
                </Typography>
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const SelfRegisteredItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Self Registered</Typography>,
      children: (
        <Space
          size={12}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Programm</Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
              >
                <PlusIcon
                  width={24}
                  color={token?.colorLink}
                  style={{marginTop: '5px'}}
                />
                <Typography name="Body 3/Bold" color={token?.colorLink}>
                  Add Partner
                </Typography>
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  return (
    <Space style={{width: '100%'}} direction="vertical" size={0}>
      <CollapseSpaceStyle size={24} direction="vertical">
        <OsCollapseAdmin items={RegisteredPartnersItem} />
      </CollapseSpaceStyle>
      <CollapseSpaceStyle size={24} direction="vertical">
        <OsCollapseAdmin items={SelfRegisteredItem} />
      </CollapseSpaceStyle>
    </Space>
  );
};

export default AddRegistrationForm;
