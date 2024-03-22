import Image from 'next/image';
import {FC} from 'react';
import {Space} from '../antd/Space';
import useThemeToken from '../hooks/useThemeToken';
import Typography from '../typography';

const OSDialog: FC<any> = ({title, description, image}) => {
  const [token] = useThemeToken();

  return (
    <div>
      <Space
        direction="vertical"
        size={12}
        style={{width: '100%', textAlign: 'center'}}
      >
        <Image src={image} alt={image} />
        <Typography name="Heading 3/Medium" color={token?.colorPrimaryText}>
          {title}
        </Typography>
        <Typography name="Body 3/Regular" color={token?.colorPrimaryText}>
          {description}
        </Typography>
      </Space>
      <br/>
      <br/>
    </div>
  );
};

export default OSDialog;
