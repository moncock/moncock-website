'use client';

import { FC, ReactNode } from 'react';

import ThemeRegistry from '@components/theme/themeRegistry';

import Navigation from '@components/navigation';
import EmotionCacheProvider from '@contexts/emotionCacheProvider';
import { RecoilRoot } from '@store/index';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <EmotionCacheProvider options={{ key: 'mui' }}>
      <RecoilRoot>
        <ThemeRegistry>
          <Navigation />
          {children}
        </ThemeRegistry>
      </RecoilRoot>
    </EmotionCacheProvider>
  );
};

export default AppProvider;
