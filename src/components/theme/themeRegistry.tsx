'use client';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import {
    ThemeProvider,
    createTheme,
    responsiveFontSizes
} from '@mui/material/styles';
import { ReactNode } from 'react';

import GlobalStyling from '@configs/globalStyles';
import themeConfig from '@configs/theme';

import { useSettingsConsumer } from '@contexts/settingProvider';

import themeOptions from './theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const { settings } = useSettingsConsumer();

    let theme = createTheme(themeOptions(settings, 'light'));
    if (themeConfig.responsiveFontSizes) {
        theme = responsiveFontSizes(theme);
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={() => GlobalStyling(theme) as any} />
            {children}
        </ThemeProvider>
    );
}
