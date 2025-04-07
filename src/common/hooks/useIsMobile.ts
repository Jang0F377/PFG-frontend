import useMediaQuery from '@common/hooks/useMediaQuery';

export function useIsMobile() {
  return useMediaQuery('(max-width: 900px)');
}
