export type FontFamily = 'var(--font-jakarta-sans)';

export type FontSize =
  | '12px'
  | '14px'
  | '16px'
  | '18px'
  | '20px'
  | '24px'
  | '30px'
  | '36px'
  | '48px'
  | '60px';
export type Lineheight =
  | '18px'
  | '20px'
  | '24px'
  | '28px'
  | '30px'
  | '32px'
  | '38px'
  | '44px'
  | '60px'
  | '72px';
export type StyleName =
  | 'Display 1/Regular'
  | 'Display 2/Regular'
  | 'Heading 1/Regular'
  | 'Heading 2/Regular'
  | 'Heading 3/Regular'
  | 'Body 1/Regular'
  | 'Body 2/Regular'
  | 'Body 3/Regular'
  | 'Body 4/Regular'
  | 'Caption Regular'
  | 'Display 1/Medium'
  | 'Display 2/Medium'
  | 'Heading 1/Medium'
  | 'Heading 2/Medium'
  | 'Heading 3/Medium'
  | 'Body 1/Medium'
  | 'Body 2/Medium'
  | 'Body 3/Medium'
  | 'Body 4/Medium'
  | 'Caption Medium'
  | 'Display 1/Bold'
  | 'Display 2/Bold'
  | 'Heading 1/Bold'
  | 'Heading 2/Bold'
  | 'Heading 3/Bold'
  | 'Body 1/Bold'
  | 'Body 2/Bold'
  | 'Body 3/Bold'
  | 'Body 4/Bold'
  | 'Caption Bold'
  | 'Display 1/Extra Bold'
  | 'Display 2/Extra Bold'
  | 'Heading 1/Extra Bold'
  | 'Heading 2/Extra Bold'
  | 'Heading 3/Extra Bold'
  | 'Body 1/Extra Bold'
  | 'Body 2/Extra Bold'
  | 'Body 3/Extra Bold'
  | 'Body 4/Extra Bold'
  | 'Caption Extra Bold'
  | 'Button 1'
  | 'Button 2';

export interface TypographyMapping {
  name: StyleName;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: Lineheight;
  fontWeight: 400 | 500 | 600 | 700 | 800;
}

export interface TypographyMap {
  [name: string]: TypographyMapping;
}
export type TextAlign = 'left' | 'center' | 'end';

export interface TypographyInterface {
  name: StyleName;
  children: React.ReactNode;
  color?: string;
  as?: string;
  ellipsis?: boolean;
  hoverOnText?: boolean;
  align?: TextAlign;
  onClick?: React.MouseEventHandler<Element> | undefined;
  style?: React.CSSProperties;
  maxWidth?: number;
  cursor?: string;
  className?: string;
  tooltip?: boolean;
}
