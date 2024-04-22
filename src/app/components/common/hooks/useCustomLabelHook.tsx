import {useState, useEffect} from 'react';

const useCustomLabel = (input: any) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (input && typeof input === 'object' && input.text) {
      const {text} = input;
      if (typeof text === 'string' && text.trim() !== '') {
        const formattedLabel = text
          .split(/[\s_]+/) // Split by spaces or underscores
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        setLabel(formattedLabel);
      } else {
        setLabel('--'); // Set a default label when text is not valid
      }
    } else {
      setLabel('--'); // Set a default label when input is not valid
    }
  }, [input]);

  return label;
};

export default useCustomLabel;
