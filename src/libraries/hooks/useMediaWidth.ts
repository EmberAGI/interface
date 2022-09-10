import { useState, useEffect } from 'react';

type MediaWidth = 'Small' | 'ExtraSmall';

const mediaQueryList = window.matchMedia('(max-width: 540px)');

export default function App(): MediaWidth {
  const [mediaWidth, setMediaWidth] = useState<MediaWidth>(mediaQueryList.matches ? 'ExtraSmall' : 'Small');

  useEffect(() => {
    const listener = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMediaWidth('ExtraSmall');
      } else {
        setMediaWidth('Small');
      }
    };
    mediaQueryList.addEventListener('change', listener);
  }, []);

  return mediaWidth;
}
