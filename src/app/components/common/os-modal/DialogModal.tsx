import {CheckCircleIcon} from '@heroicons/react/20/solid';
import {FC} from 'react';
import OsModal from '.';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsButton from '../os-button';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';

const DailogModal: FC<any> = ({
  showDailogModal,
  setShowDailogModal,
  heading,
  description,
}) => {
  const [token] = useThemeToken();
  return (
    <OsModal
      body={
        <Row style={{width: '100%', padding: '15px'}}>
          <Space
            style={{width: '100%'}}
            size={24}
            direction="vertical"
            align="center"
          >
            <Space direction="vertical" align="center" size={12}>
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <AvatarStyled
                  background="white"
                  icon={
                    <CheckCircleIcon
                      width={35}
                      height={35}
                      color={token?.colorSuccess}
                    />
                  }
                />

                <Typography name="Heading 3/Medium">{heading}</Typography>
              </span>
              <Typography name="Body 3/Regular">{description}</Typography>
            </Space>

            <Space size={12}>
              <OsButton
                text="Send Again"
                buttontype="PRIMARY"
                // clickHandler={setShowDailogModal(false)}
              />
            </Space>
          </Space>
        </Row>
      }
      width={600}
      open={showDailogModal}
      onCancel={() => {
        setShowDailogModal(false);
      }}
    />
  );
};

export default DailogModal;
