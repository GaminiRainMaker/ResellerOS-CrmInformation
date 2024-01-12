import {Col, Row} from '@/app/components/common/antd/Grid';
import {Space} from '@/app/components/common/antd/Space';
import OsCollapseAdmin from '@/app/components/common/os-collapse/adminCollapse';
import CommonSelect from '@/app/components/common/os-select';
import Typography from '@/app/components/common/typography';
import OsInput from '@/app/components/common/os-input';
import {CollapseSpaceStyle} from './styled-components';

const CommonFields = () => {
  const ResponseDetailItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Response Detail</Typography>,
      children: (
        <Space
          size={36}
          direction="vertical"
          style={{
            width: '100%',
          }}
        >
          <Space
            size={4}
            direction="vertical"
            style={{
              width: '100%',
            }}
          >
            <Typography name="Body 4/Medium">Status</Typography>
            <CommonSelect placeholder="Select" style={{width: '100%'}} />
          </Space>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Date Submitted </Typography>
                <CommonSelect placeholder="0.00%" style={{width: '100%'}} />
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
                <Typography name="Body 4/Medium">Expiration Date</Typography>
                <CommonSelect
                  placeholder="$ 000-000-0000"
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Partner Deal ID</Typography>
                <CommonSelect
                  placeholder="dd/mm/yyyy"
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
                <Typography name="Body 4/Medium">
                  Partner Approval ID
                </Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const AccountInformationItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Account Information</Typography>,
      children: (
        <Space
          size={36}
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
                <Typography name="Body 4/Medium">Customer Account</Typography>
                <CommonSelect
                  placeholder="Impres Technologies"
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
                <Typography name="Body 4/Medium">Account Contact</Typography>
                <CommonSelect
                  placeholder="Emma Watson"
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Industry</Typography>
                <CommonSelect
                  placeholder="IT Services"
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
                <Typography name="Body 4/Medium">Account Website</Typography>
                <CommonSelect
                  placeholder="www.imprestech.com"
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const AddressInformationItem = [
    {
      key: '1',
      label: <Typography name="Body 2/Medium">Address Information</Typography>,
      children: (
        <Space
          size={36}
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
                <Typography name="Body 4/Medium">Street 1</Typography>
                <OsInput
                  placeholder="19 Washington Square N"
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
                <Typography name="Body 4/Medium">Street 2</Typography>
                <OsInput placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">City</Typography>
                <CommonSelect placeholder="New York" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">State</Typography>
                <CommonSelect placeholder="NY" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Country</Typography>
                <CommonSelect placeholder="USA" style={{width: '100%'}} />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Zip Code</Typography>
                <OsInput placeholder="10011" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  const OpportunityInformationItem = [
    {
      key: '1',
      label: (
        <Typography name="Body 2/Medium">Opportunity Information</Typography>
      ),
      children: (
        <Space
          size={36}
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
                <Typography name="Body 4/Medium">Partner Account</Typography>
                <CommonSelect placeholder="Cisco" style={{width: '100%'}} />
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
                  placeholder="Cisco Hardware"
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Opportunity</Typography>
                <CommonSelect
                  placeholder="Blue hive- tech world"
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
                <Typography name="Body 4/Medium">
                  Opportunity Description
                </Typography>
                <CommonSelect
                  placeholder="Write text here!"
                  style={{width: '100%'}}
                />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">Opportunity Value</Typography>
                <CommonSelect
                  placeholder="$ 000-000-0000"
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
                <Typography name="Body 4/Medium">Probability</Typography>
                <CommonSelect placeholder="0.00%" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>

          <Row justify="space-between" gutter={[24, 24]}>
            <Col sm={24} md={12}>
              <Space
                size={4}
                direction="vertical"
                style={{
                  width: '100%',
                }}
              >
                <Typography name="Body 4/Medium">
                  Estimated Close Date
                </Typography>
                <CommonSelect
                  placeholder="dd/mm/yyyy"
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
                <Typography name="Body 4/Medium">
                  New or Existing Customer
                </Typography>
                <CommonSelect placeholder="Select" style={{width: '100%'}} />
              </Space>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <CollapseSpaceStyle size={24} direction="vertical">
        <OsCollapseAdmin items={ResponseDetailItem} />
      </CollapseSpaceStyle>

      <CollapseSpaceStyle
        size={24}
        direction="vertical"
        style={{
          marginTop: '30px',
        }}
      >
        <OsCollapseAdmin items={AccountInformationItem} />
      </CollapseSpaceStyle>

      <CollapseSpaceStyle
        size={24}
        direction="vertical"
        style={{
          marginTop: '30px',
        }}
      >
        <OsCollapseAdmin items={AddressInformationItem} />
      </CollapseSpaceStyle>

      <CollapseSpaceStyle
        size={24}
        direction="vertical"
        style={{
          marginTop: '30px',
        }}
      >
        <OsCollapseAdmin items={OpportunityInformationItem} />
      </CollapseSpaceStyle>
    </Row>
  );
};

export default CommonFields;
