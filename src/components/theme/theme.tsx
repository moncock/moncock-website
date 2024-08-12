import { PaletteMode, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';

import { Settings } from '@configs/types';

import breakpoints from '@theme/breakpoints';
import overrides from '@theme/overrides';
import palette from '@theme/palette';
import shadows from '@theme/shadows';
import spacing from '@theme/spacing';
import typography from '@theme/typography';

export const themeOptions = (
    settings: Settings,
    overrideMode: PaletteMode
): ThemeOptions => {
    const { skin, mode, direction, themeColor } = settings;

    const themeConfig: ThemeOptions = {
        breakpoints: breakpoints(),
        direction,
        components: overrides(settings),
        palette: palette(mode === 'semi-dark' ? overrideMode : mode, skin),
        ...spacing,
        shape: {
            borderRadius: 6
        },
        mixins: {
            toolbar: {
                minHeight: 64
            }
        },
        shadows: shadows(mode === 'semi-dark' ? overrideMode : mode),
        typography
    };

    return deepmerge(themeConfig, {
        palette: {
            primary: {
                ...(themeConfig.palette
                    ? themeConfig.palette[themeColor]
                    : palette(mode === 'semi-dark' ? overrideMode : mode, skin)
                          .primary)
            }
        }
    });
};

export default themeOptions;
