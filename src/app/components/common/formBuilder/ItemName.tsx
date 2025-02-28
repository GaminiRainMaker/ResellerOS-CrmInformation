import {ArrowsPointingOutIcon, TrashIcon} from '@heroicons/react/24/outline';
import {FC} from 'react';
import {Col, Row} from '../antd/Grid';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import {SectionColStyled} from '../os-div-row-col/styled-component';
import Typography from '../typography';
import {ItemNameInterface} from './formBuilder.interface';

const ItemName: FC<ItemNameInterface> = ({
  itemName,
  ItemConindex,
  Sectidx,
  isPreview = true,
  cartItems,
  setCartItems,
  onClick,
  setCollapsed,
}) => {
  const [token] = useThemeToken();

  const deleteSelectedIntem = (sectionInde: number, contentIn: number) => {
    const temp: any = [...cartItems];
    temp?.[sectionInde || 0]?.content?.splice(contentIn, 1);
    setCartItems(temp);
    setCollapsed(false);
  };

  return (
    <Row justify="space-between">
      <SectionColStyled onClick={onClick}>
        <Typography
          name="Caption Regular"
          cursor="pointer"
          color={token?.colorLinkHover}
        >
          {itemName}
        </Typography>
      </SectionColStyled>
      {isPreview && (
        <Col>
          <Space size={8}>
            <TrashIcon
              cursor="pointer"
              width={18}
              onClick={() => {
                deleteSelectedIntem(Sectidx, ItemConindex);
              }}
              color={token?.colorError}
            />
            {itemName !== 'Line Break' && (
              <ArrowsPointingOutIcon
                cursor="pointer"
                width={18}
                color={token?.colorInfo}
              />
            )}
          </Space>
        </Col>
      )}
    </Row>
  );
};

export default ItemName;
