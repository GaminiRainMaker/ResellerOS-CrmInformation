import {FC} from 'react';
import OsModal from '.';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import OsButton from '../os-button';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {OSDailogInterface} from './os-modal.interface';
import Image from 'next/image';

const DailogModal: FC<OSDailogInterface> = ({
  showDailogModal,
  setShowDailogModal,
  title,
  subTitle,
  primaryButtonText,
  secondaryButtonText,
  icon,
  onOk,
  secondryButtontype = 'SECONDARY',
  width = 600,
  image,
}) => (
  <OsModal
    width={width}
    destroyOnClose
    body={
      <Row style={{width: '100%', padding: '15px'}}>
        <Space
          style={{width: '100%'}}
          size={24}
          direction="vertical"
          align="center"
        >
          <Space
            direction="vertical"
            align="center"
            size={12}
            style={{
              textAlign: 'center',
            }}
          >
            <span
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {' '}
              <br />
              {icon && <AvatarStyled background="white" icon={icon} />}
              {image && <Image src={image} alt={image} />}
              <br />
              <Typography name="Heading 3/Medium">{title}</Typography>
            </span>
            <Typography name="Body 3/Regular">{subTitle}</Typography>
          </Space>

          <Space size={12}>
            {secondaryButtonText && (
              <OsButton
                text={secondaryButtonText}
                buttontype={secondryButtontype}
                clickHandler={() => {
                  setShowDailogModal(false);
                }}
              />
            )}

            {primaryButtonText && (
              <OsButton
                text={primaryButtonText}
                buttontype="PRIMARY"
                clickHandler={() => {
                  onOk();
                }}
              />
            )}
          </Space>
        </Space>
      </Row>
    }
    open={showDailogModal}
    onCancel={() => {
      setShowDailogModal((p: boolean) => !p);
    }}
  />
);

export default DailogModal;
