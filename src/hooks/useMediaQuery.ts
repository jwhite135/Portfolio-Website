import { useEffect, useState } from 'react';

/** Subscribe to a CSS media query from React state. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the viewport is at least Tailwind's `md` breakpoint. */
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
