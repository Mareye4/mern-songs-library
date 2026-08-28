import React, { useState } from 'react';
import { Global, ThemeProvider } from '@emotion/react';
import { NavTab } from './components/Header';
import { AppLayout } from './layouts/AppLayout';
import { SongsPage } from './pages/SongsPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { globalStyles } from './styles/globalStyles';
import { theme } from './styles/theme';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('songs');

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === 'songs' && <SongsPage />}
        {activeTab === 'statistics' && <StatisticsPage />}
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;