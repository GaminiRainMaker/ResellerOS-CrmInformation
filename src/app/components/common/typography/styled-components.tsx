/* eslint-disable @typescript-eslint/indent */
import styled from '@emotion/styled';
import {TextAlign, TypographyMapping} from './typography.interface';

export const DynamicDiv = styled.div<{
  styles: TypographyMapping;
  color?: string;
  ellipsis?: boolean;
  align?: TextAlign;
  lineClamp?: boolean;
  hoverOnText?: boolean;
  lines?: number;
  maxWidth?: number;
  cursor?: string;
}>`
  font-family: ${(props) => `${props?.styles?.fontFamily}`};
  font-size: ${(props) => `${props?.styles?.fontSize}`};
  line-height: ${(props) => `${props?.styles?.lineHeight}`};
  font-weight: ${(props) => `${props?.styles?.fontWeight}`};
  color: ${(props) => props?.color};
  cursor: ${(props) => props?.cursor};
  text-align: ${(props) => props?.align};
  ${(props) =>
    props.ellipsis &&
    `
      ${
        props.lineClamp
          ? ` display: -webkit-box;
      -webkit-line-clamp: ${props.lines};
      -webkit-box-orient: vertical;  `
          : ` white-space: nowrap;`
      }
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: ${props.maxWidth}px;
  `}

  &:hover {
    color: ${(props) => (props.hoverOnText ? '#2364AA' : 'none')};
    cursor: ${(props) => (props.hoverOnText ? 'pointer' : 'unset')};;
  }
`;

export default DynamicDiv;
