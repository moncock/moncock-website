'use client';

import { Direction } from '@mui/material';
import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';

import themeConfig from '@configs/theme';
import {
    AppBar,
    ContentWidth,
    Footer,
    Mode,
    Skin,
    ThemeColor,
    VerticalNavToggle
} from '@configs/types';

export type Settings = {
    skin: Skin;
    mode: Mode;
    appBar?: AppBar;
    footer?: Footer;
    navHidden?: boolean;
    appBarBlur: boolean;
    direction: Direction;
    navCollapsed: boolean;
    themeColor: ThemeColor;
    contentWidth: ContentWidth;
    layout?: 'vertical' | 'horizontal';
    lastLayout?: 'vertical' | 'horizontal';
    verticalNavToggleType: VerticalNavToggle;
    toastPosition?:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right';
};

export type PageSpecificSettings = {
    skin?: Skin;
    mode?: Mode;
    appBar?: AppBar;
    footer?: Footer;
    navHidden?: boolean;
    appBarBlur?: boolean;
    direction?: Direction;
    navCollapsed?: boolean;
    themeColor?: ThemeColor;
    contentWidth?: ContentWidth;
    layout?: 'vertical' | 'horizontal';
    lastLayout?: 'vertical' | 'horizontal';
    verticalNavToggleType?: VerticalNavToggle;
    toastPosition?:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right';
};
export type SettingsContextValue = {
    settings: Settings;
    saveSettings: (updatedSettings: Settings) => void;
};

interface SettingsProviderProps {
    children: ReactNode;
}

const initialSettings: Settings = {
    themeColor: 'primary',
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    footer: themeConfig.footer,
    layout: themeConfig.layout,
    lastLayout: themeConfig.layout,
    direction: themeConfig.direction,
    navHidden: themeConfig.navHidden,
    appBarBlur: themeConfig.appBarBlur,
    navCollapsed: themeConfig.navCollapsed,
    contentWidth: themeConfig.contentWidth,
    toastPosition: themeConfig.toastPosition,
    verticalNavToggleType: themeConfig.verticalNavToggleType,
    appBar:
        themeConfig.layout === 'horizontal' && themeConfig.appBar === 'hidden'
            ? 'fixed'
            : themeConfig.appBar
};

const staticSettings = {
    appBar: initialSettings.appBar,
    footer: initialSettings.footer,
    layout: initialSettings.layout,
    navHidden: initialSettings.navHidden,
    lastLayout: initialSettings.lastLayout,
    toastPosition: initialSettings.toastPosition
};

const restoreSettings = (): Settings | null => {
    let settings = null;

    try {
        const storedData: string | null =
            window.localStorage.getItem('settings');
        if (storedData) {
            settings = { ...JSON.parse(storedData), ...staticSettings };
        } else {
            settings = initialSettings;
        }
    } catch (err) {
        console.error(err);
    }

    return settings;
};

const storeSettings = (settings: Settings) => {
    const initSettings = Object.assign({}, settings);
    delete initSettings.appBar;
    delete initSettings.footer;
    delete initSettings.layout;
    delete initSettings.navHidden;
    delete initSettings.lastLayout;
    delete initSettings.toastPosition;
    window.localStorage.setItem('settings', JSON.stringify(initSettings));
};

export const SettingsContext = createContext<SettingsContextValue>({
    saveSettings: () => null,
    settings: initialSettings
});

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>({ ...initialSettings });

    useEffect(() => {
        const restoredSettings = restoreSettings();
        if (restoredSettings) {
            setSettings({ ...restoredSettings });
        }
    }, []);

    const saveSettings = (updatedSettings: Settings) => {
        storeSettings(updatedSettings);
        setSettings(updatedSettings);
    };

    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsConsumer = () => useContext(SettingsContext);
