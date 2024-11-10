import { createContext, useContext } from 'react';

interface ScreenState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LayoutContext = createContext<ScreenState | undefined>(undefined);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LoadingProvider');
  }
  return context;
};
