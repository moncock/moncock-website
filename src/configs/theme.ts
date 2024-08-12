import { Direction } from '@mui/material';

import {
    AppBar,
    ContentWidth,
    Footer,
    HorizontalMenuToggle,
    Mode,
    Skin,
    VerticalNavToggle
} from './types';

type ThemeConfig = {
    skin: Skin;
    mode: Mode;
    appBar: AppBar;
    footer: Footer;
    navHidden: boolean;
    appBarBlur: boolean;
    direction: Direction;
    templateName: string;
    navCollapsed: boolean;
    disableRipple: boolean;
    navigationSize: number;
    menuTextTruncate: boolean;
    contentWidth: ContentWidth;
    disableCustomizer: boolean;
    responsiveFontSizes: boolean;
    collapsedNavigationSize: number;
    horizontalMenuAnimation: boolean;
    layout: 'vertical' | 'horizontal';
    verticalNavToggleType: VerticalNavToggle;
    horizontalMenuToggle: HorizontalMenuToggle;
    afterVerticalNavMenuContentPosition: 'fixed' | 'static';
    beforeVerticalNavMenuContentPosition: 'fixed' | 'static';
    toastPosition:
        | 'top-left'
        | 'top-center'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-center'
        | 'bottom-right';
};

const themeConfig: ThemeConfig = {
    templateName: 'Time Tracking' /* App Name */,
    layout: 'horizontal' /* vertical | horizontal */,
    mode: 'light' as Mode /* light | dark | semi-dark /*! Note: semi-dark value will only work for Vertical Layout */,
    direction: 'ltr' /* ltr | rtl */,
    skin: 'default' /* default | bordered */,
    contentWidth: 'boxed' /* full | boxed */,
    footer: 'static' /* fixed | static | hidden */,
    navHidden: false /* true | false */,
    menuTextTruncate: true /* true | false */,
    verticalNavToggleType:
        'accordion' /* accordion | collapse /*! Note: This is for Vertical navigation menu only */,
    navCollapsed:
        false /* true | false /*! Note: This is for Vertical navigation menu only */,
    navigationSize: 230 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
    collapsedNavigationSize: 82 /* Number in px(Pixels) /*! Note: This is for Vertical navigation menu only */,
    afterVerticalNavMenuContentPosition: 'fixed' /* fixed | static */,
    beforeVerticalNavMenuContentPosition: 'fixed' /* fixed | static */,
    horizontalMenuToggle:
        'hover' /* click | hover /*! Note: This is for Horizontal navigation menu only */,
    horizontalMenuAnimation: true /* true | false */,
    appBar: 'static' /* fixed | static | hidden /*! Note: hidden value will only work for Vertical Layout */,
    appBarBlur: true /* true | false */,
    responsiveFontSizes: true /* true | false */,
    disableRipple: true /* true | false */,
    disableCustomizer: false /* true | false */,
    toastPosition:
        'top-right' /* top-left | top-center | top-right | bottom-left | bottom-center | bottom-right */
};

export default themeConfig;
