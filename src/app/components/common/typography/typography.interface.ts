export type FontFamily = 'DM Sans' | 'sans-serif' | "'DM Sans', sans-serif";
export type LetterSpacing =
  | '-0.22px'
  | '-0.3px'
  | '0'
  | '0.1px'
  | '0.2px'
  | '0.22px'
  | '0.3px'
  | '0.4px'
  | '0.5px'
  | '0.6px'
  | '1px';
export type FontSize =
  | '8px'
  | '10px'
  | '12px'
  | '14px'
  | '16px'
  | '18px'
  | '20px'
  | '24px'
  | '35px'
  | '45px';
export type Lineheight =
  | '12px'
  | '14px'
  | '15px'
  | '16px'
  | '18px'
  | '19px'
  | '20px'
  | '21px'
  | '22px'
  | '28px'
  | '32px'
  | '45px'
  | '54px';
export type StyleName = 'Display 1' | 'Display 2' | 'Checked';

export interface TypographyMapping {
  name: StyleName;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineHeight: Lineheight;
  letterSpacing: LetterSpacing;
  fontWeight: 400 | 500 | 600 | 700;
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
  align?: TextAlign;
  onClick?: React.MouseEventHandler<Element> | undefined;
  style?: React.CSSProperties;
  maxWidth?: number;
  cursor?: string;
}
