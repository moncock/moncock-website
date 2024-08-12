import { OwnerStateThemeType, Skin } from '@configs/types';

const Drawer = (skin: Skin) => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }: OwnerStateThemeType) => ({
          boxShadow: theme.shadows[skin === 'default' ? 7 : 0],
        }),
      },
    },
  };
};

export default Drawer;
