import {StyleName, TypographyMap} from '../typography/typography.interface';

type UseTypographyMappingHook = {
  (name: StyleName): {typographyMap: TypographyMap};
};

const useTypographyMappingHook: UseTypographyMappingHook = () => {
  const typographyMap: TypographyMap = {
    'Display 1': {
      name: 'Display 1',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '45px',
      lineHeight: '18px',
      letterSpacing: '0.2px',
      fontWeight: 400,
    },
    'Display 2': {
      name: 'Display 2',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '10px',
      lineHeight: '54px',
      letterSpacing: '0.2px',
      fontWeight: 400,
    },
  };

  return {typographyMap};
};
export default useTypographyMappingHook;
