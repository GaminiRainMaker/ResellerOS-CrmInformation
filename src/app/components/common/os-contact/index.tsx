import Image from 'next/image';
import React from 'react';
import 'react-phone-number-input/style.css';
import {OsContactStyle, OsPhoneInputStyle} from './styled-components';

interface InputClasses {
  container?: string;
  input?: string;
  startIcon?: string;
  endIcon?: string;
  label?: string;
  helperText?: string;
}

interface InputProps {
  name: string;
  value: string;
  label?: string;
  id: string;
  onChange: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  startIcon?: string;
  endIcon?: string;
  type?: string;
  autoComplete?: string | undefined;
  onClickIcon?: () => void;
  classes?: InputClasses;
  error?: boolean;
  showErrorEndIcon?: boolean;
  helperText?: string;
  disabled?: boolean;
  softDisabled?: boolean;
}
const ContactInput: React.FunctionComponent<InputProps> = ({
  onChange,
  onBlur = (_e) => {},
  onFocus = (_e) => {},
  onKeyDown = (_e) => {},
  placeholder = '',
  endIcon = '',
  startIcon = '',
  type = 'text',
  value = '',
  label = '',
  onClickIcon = () => {},
  classes = {
    container: '',
    endIcon: '',
    input: '',
    startIcon: '',
    label: '',
    helperText: '',
  },
  error = false,
  helperText = '',
  showErrorEndIcon = false,
  disabled = false,
  softDisabled = false,
  name,
}) => (
  <OsContactStyle>
    <div>
      {startIcon && (
        <div
          className={`rounded h-[36px] py-[8px] pl-[16px] ${
            disabled && !softDisabled
              ? 'bg-neutrals-blacks-b3'
              : 'bg-neutrals-blacks-b0'
          } ${classes?.startIcon}`}
        >
          <Image
            height={20}
            width={20}
            src={startIcon}
            alt=""
            onClick={onClickIcon}
          />
        </div>
      )}
      <OsPhoneInputStyle
        onChange={(val) => {
          onChange(val as string);
        }}
        limitMaxLength
        onBlur={onBlur}
        value={value}
        onKeyDown={onKeyDown}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        onFocus={onFocus}
        international
      />
      {(endIcon || showErrorEndIcon) && (
        <div
          className={`h-[36px] py-[8px] pr-[16px] ${
            disabled && !softDisabled
              ? 'bg-neutrals-blacks-b3'
              : 'bg-neutrals-blacks-b0'
          } rounded ${classes?.endIcon}`}
        >
          {!endIcon && error ? (
            <Image
              height={20}
              width={20}
              src={'ErrorDanger'}
              alt=""
              onClick={onClickIcon}
            />
          ) : (
            <>
              {endIcon ? (
                <Image
                  height={20}
                  width={20}
                  src={endIcon}
                  alt=""
                  onClick={onClickIcon}
                />
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
    {helperText && (
      <p
        className={`caption ${
          error ? 'text-alert-500' : ''
        } ${classes?.helperText}`}
      >
        {helperText}
      </p>
    )}
  </OsContactStyle>
);

export default ContactInput;
