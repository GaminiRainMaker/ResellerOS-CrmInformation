import {XCircleIcon} from '@heroicons/react/20/solid';
import {FC} from 'react';
import OsModal from '.';
import {Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import OsButton from '../os-button';
import {AvatarStyled} from '../os-table/styled-components';
import Typography from '../typography';
import {Checkbox} from '../antd/Checkbox';

const DeleteModal: FC<any> = ({
  showModalDelete,
  setShowModalDelete,
  deleteSelectedIds,
  setDeleteIds,
  heading,
  description,
  loading,
  setCheckedValue,
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
            <Space direction="vertical" align="center" size={1}>
              <AvatarStyled
                background="white"
                icon={
                  <XCircleIcon
                    width={35}
                    height={35}
                    color={token?.colorError}
                  />
                }
              />

              <Typography name="Heading 3/Medium">{heading}</Typography>
              <Typography name="Body 3/Regular">{description}</Typography>
            </Space>
            {setCheckedValue && (
              <Space>
                <Checkbox
                  onChange={(e) => {
                    setCheckedValue(e?.target?.checked);
                  }}
                />
                <Typography name="Body 3/Regular">
                  Do you want to delete the attachment's respective line items?
                </Typography>
              </Space>
            )}

            <Space size={12}>
              <OsButton
                text={`Don't Delete`}
                buttontype="SECONDARY"
                clickHandler={() => {
                  setDeleteIds([]);
                  setShowModalDelete(false);
                }}
              />
              <OsButton
                loading={loading}
                text="Yes, Delete"
                buttontype="PRIMARY"
                clickHandler={deleteSelectedIds}
              />
            </Space>
          </Space>
        </Row>
      }
      width={600}
      open={showModalDelete}
      onCancel={() => {
        setShowModalDelete((p: boolean) => !p);
      }}
    />
  );
};

export default DeleteModal;
