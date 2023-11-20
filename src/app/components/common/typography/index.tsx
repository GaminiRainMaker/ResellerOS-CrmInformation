import {FC, memo} from 'react';
import useTypographyMappingHook from '../hooks/useTypographyMappingHook';
import {TypographyInterface} from './typography.interface';
import {DynamicDiv} from './styled-components';
import useThemeToken from '../hooks/useThemeToken';

const Typography: FC<TypographyInterface> = ({
  children,
  name,
  color,
  as,
  align,
  cursor,
  ellipsis,
  maxWidth,
  onClick,
  style,
}) => {
  const {typographyMap} = useTypographyMappingHook(name);

  const [token] = useThemeToken();
  let DynamicTag = `${as ?? 'span'}` as keyof JSX.IntrinsicElements;
  if (
    name === 'Display 1/Regular' ||
    name === 'Display 2/Medium' ||
    name.toLowerCase().includes('display')
  ) {
    DynamicTag = `${as ?? 'div'}` as keyof JSX.IntrinsicElements;
  }

  return (
    <DynamicDiv
      cursor={cursor ?? 'default'}
      maxWidth={maxWidth}
      style={style}
      onClick={onClick}
      ellipsis={ellipsis}
      align={align}
      styles={typographyMap[name]}
      color={color ?? token.colorText}
      as={DynamicTag}
    >
      {children}
    </DynamicDiv>
  );
};
export default memo(
  Typography,
  (p, n) => p.children === n.children || p.name === n.name,
);
