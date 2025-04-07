import { useState } from 'react';
import useEnhancedEffect from './useEnhancedEffect';

interface Options {
  defaultMatches?: boolean;
  noSsr?: boolean;
  ssrMatchMedia?: (query: string) => { matches: boolean };
}

/**
 * A custom React hook for responsive design that detects if a CSS media query matches.
 * This is a standalone implementation inspired by Material-UI's useMediaQuery hook.
 *
 * @param query The CSS media query to evaluate.
 * @param options Additional options for the hook behavior.
 * @returns Boolean indicating if the media query matches.
 */
export default function useMediaQuery(
  query: string,
  options: Options = {},
): boolean {
  const {
    defaultMatches = false,
    noSsr = false,
    ssrMatchMedia = null,
  } = options;

  // Check if we're in a browser environment
  const supportMatchMedia =
    typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';

  const [match, setMatch] = useState(() => {
    // Handle server-side rendering scenario
    if (!supportMatchMedia && noSsr) {
      return defaultMatches;
    }

    // Use ssrMatchMedia in SSR if provided
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // If in browser, check the media query
    if (supportMatchMedia) {
      return window.matchMedia(query).matches;
    }

    // Fallback to default
    return defaultMatches;
  });

  useEnhancedEffect(() => {
    if (!supportMatchMedia) {
      return undefined;
    }

    // Use window.matchMedia API to check if the query matches
    const mediaQueryList = window.matchMedia(query);

    // Set the initial match
    setMatch(mediaQueryList.matches);

    // Create a change handler function
    const handleChange = (event: MediaQueryListEvent) => {
      setMatch(event.matches);
    };

    // Add event listener for query changes
    // Using different approaches for newer and older browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // For older browsers
      mediaQueryList.addListener(handleChange);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // For older browsers
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query, supportMatchMedia]);

  return match;
}
