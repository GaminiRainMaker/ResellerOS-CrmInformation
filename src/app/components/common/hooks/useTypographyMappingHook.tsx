import {StyleName, TypographyMap} from '../typography/typography.interface';

type UseTypographyMappingHook = {
  (name: StyleName): {typographyMap: TypographyMap};
};

const useTypographyMappingHook: UseTypographyMappingHook = () => {
  const typographyMap: TypographyMap = {
    'Display 1/Regular': {
      name: 'Display 1/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '60px',
      fontWeight: 400,
      lineHeight: '72px',
    },
    'Display 2/Regular': {
      name: 'Display 2/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '48px',
      fontWeight: 400,
      lineHeight: '60px',
    },

    'Heading 1/Regular': {
      name: 'Heading 1/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '36px',
      fontWeight: 400,
      lineHeight: '44px',
    },
    'Heading 2/Regular': {
      name: 'Heading 2/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '38px',
    },
    'Heading 3/Regular': {
      name: 'Heading 3/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: '32px',
    },
    'Body 1/Regular': {
      name: 'Body 1/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '20px',
      fontWeight: 400,
      lineHeight: '30px',
    },
    'Body 2/Regular': {
      name: 'Body 2/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    'Body 3/Regular': {
      name: 'Body 3/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    'Body 4/Regular': {
      name: 'Body 4/Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    'Caption Regular': {
      name: 'Caption Regular',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '18px',
    },
    'Display 1/Medium': {
      name: 'Display 1/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '60px',
      fontWeight: 500,
      lineHeight: '72px',
    },
    'Display 2/Medium': {
      name: 'Display 2/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '48px',
      fontWeight: 500,
      lineHeight: '60px',
    },
    'Heading 1/Medium': {
      name: 'Heading 1/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '36px',
      fontWeight: 500,
      lineHeight: '44px',
    },
    'Heading 2/Medium': {
      name: 'Heading 2/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '30px',
      fontWeight: 500,
      lineHeight: '38px',
    },
    'Heading 3/Medium': {
      name: 'Heading 3/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '32px',
    },
    'Body 1/Medium': {
      name: 'Body 1/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '30px',
    },
    'Body 2/Medium': {
      name: 'Body 2/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '18px',
      fontWeight: 500,
      lineHeight: '24px',
    },
    'Body 3/Medium': {
      name: 'Body 3/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    'Body 4/Medium': {
      name: 'Body 4/Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '20px',
    },
    'Caption Medium': {
      name: 'Caption Medium',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '18px',
    },
    'Display 1/Bold': {
      name: 'Display 1/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '60px',
      fontWeight: 700,
      lineHeight: '72px',
    },
    'Display 2/Bold': {
      name: 'Display 2/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '60px',
    },
    'Heading 1/Bold': {
      name: 'Heading 1/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '36px',
      fontWeight: 700,
      lineHeight: '44px',
    },
    'Heading 2/Bold': {
      name: 'Heading 2/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '30px',
      fontWeight: 700,
      lineHeight: '38px',
    },
    'Heading 3/Bold': {
      name: 'Heading 3/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '32px',
    },
    'Body 1/Bold': {
      name: 'Body 1/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '30px',
    },
    'Body 2/Bold': {
      name: 'Body 2/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '24px',
    },
    'Body 3/Bold': {
      name: 'Body 3/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20px',
    },
    'Body 4/Bold': {
      name: 'Body 4/Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '20px',
    },
    'Caption Bold': {
      name: 'Caption Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '12px',
      fontWeight: 700,
      lineHeight: '18px',
    },
    'Display 1/Extra Bold': {
      name: 'Display 1/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '60px',
      fontWeight: 800,
      lineHeight: '72px',
    },
    'Display 2/Extra Bold': {
      name: 'Display 2/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: '60px',
    },
    'Heading 1/Extra Bold': {
      name: 'Heading 1/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '36px',
      fontWeight: 800,
      lineHeight: '44px',
    },
    'Heading 2/Extra Bold': {
      name: 'Heading 2/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '30px',
      fontWeight: 800,
      lineHeight: '38px',
    },
    'Heading 3/Extra Bold': {
      name: 'Heading 3/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '24px',
      fontWeight: 800,
      lineHeight: '32px',
    },
    'Body 1/Extra Bold': {
      name: 'Body 1/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '20px',
      fontWeight: 800,
      lineHeight: '30px',
    },
    'Body 2/Extra Bold': {
      name: 'Body 2/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '18px',
      fontWeight: 800,
      lineHeight: '28px',
    },
    'Body 3/Extra Bold': {
      name: 'Body 3/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 800,
      lineHeight: '20px',
    },
    'Body 4/Extra Bold': {
      name: 'Body 4/Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '14px',
      fontWeight: 800,
      lineHeight: '20px',
    },
    'Caption Extra Bold': {
      name: 'Caption Extra Bold',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '12px',
      fontWeight: 800,
      lineHeight: '18px',
    },
    'Button 1': {
      name: 'Button 1',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '24px',
    },
    'Button 2': {
      name: 'Button 2',
      fontFamily: '__Plus_Jakarta_Sans_d21556',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
    },
  };

  return {typographyMap};
};
export default useTypographyMappingHook;
