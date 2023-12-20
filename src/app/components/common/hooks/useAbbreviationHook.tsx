import {useEffect, useState} from 'react';

const useAbbreviationHook = (value: number) => {
  const [abbreviation, setAbbreviation] = useState<string | undefined>(
    undefined,
  );
  const abbreviate = (num: number) => {
    const roundedValue = Math.round(num * 10) / 10;
    return new Intl.NumberFormat('en', {maximumFractionDigits: 1}).format(
      roundedValue,
    );
  };

  useEffect(() => {
    const abbr = abbreviate(value);
    setAbbreviation(abbr);
  }, [value]);

  return {abbreviation, abbreviate};
};

export default useAbbreviationHook;
