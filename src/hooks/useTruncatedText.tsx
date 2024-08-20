import { useState, useEffect } from 'react';

const useTruncatedText = (text: string, maxLength: number) => {
  const [truncatedText, setTruncatedText] = useState('');

  useEffect(() => {
    if (text.length > maxLength) {
      setTruncatedText(text.slice(0, maxLength) + '...');
    } else {
      setTruncatedText(text);
    }
  }, [text, maxLength]);

  return truncatedText;
};

export default useTruncatedText;
