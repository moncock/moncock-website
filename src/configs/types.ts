import {
    ComponentsPropsList,
    Direction,
    PaletteMode,
    SxProps,
    Theme
} from '@mui/material';
import { AppBarProps } from '@mui/material/AppBar';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';

import { ReactNode } from 'react';

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar';

export type Skin = 'default' | 'bordered';

export type Mode = PaletteMode | 'semi-dark';

export type ContentWidth = 'full' | 'boxed';

export type AppBar = 'fixed' | 'static' | 'hidden';

export type Footer = 'fixed' | 'static' | 'hidden';

export type ThemeColor =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';

export type VerticalNavToggle = 'accordion' | 'collapse';

export type HorizontalMenuToggle = 'hover' | 'click';

export type BlankLayoutProps = {
    children: ReactNode;
};

export type BlankLayoutWithAppBarProps = {
    children: ReactNode;
};

export type NavSectionTitle = {
    auth?: boolean;
    action?: string;
    subject?: string;
    sectionTitle: string;
};

export type FooterProps = {
    sx?: SxProps<Theme>;
    content?: (props?: any) => ReactNode;
};

export type VerticalLayoutProps = {
    appBar?: {
        componentProps?: AppBarProps;
        content?: (props?: any) => ReactNode;
    };
    navMenu: {
        lockedIcon?: ReactNode;
        unlockedIcon?: ReactNode;
        content?: (props?: any) => ReactNode;
        branding?: (props?: any) => ReactNode;
        afterContent?: (props?: any) => ReactNode;
        beforeContent?: (props?: any) => ReactNode;
        componentProps?: Omit<
            SwipeableDrawerProps,
            'open' | 'onOpen' | 'onClose'
        >;
    };
};

export type HorizontalLayoutProps = {
    appBar?: {
        componentProps?: AppBarProps;
        content?: (props?: any) => ReactNode;
        branding?: (props?: any) => ReactNode;
    };
    navMenu?: {
        sx?: SxProps<Theme>;
        content?: (props?: any) => ReactNode;
    };
};

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

export type LayoutProps = {
    hidden: boolean;
    settings: Settings;
    children: ReactNode;
    footerProps?: FooterProps;
    contentHeightFixed?: boolean;
    saveSettings: (values: Settings) => void;
    verticalLayoutProps: VerticalLayoutProps;
    horizontalLayoutProps?: HorizontalLayoutProps;
};

export type OwnerStateThemeType = {
    theme: Theme;
    ownerState: ComponentsPropsList[keyof ComponentsPropsList] &
        Record<string, unknown>;
};
