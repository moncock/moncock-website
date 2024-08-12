import { OwnerStateThemeType } from '@configs/types';

const FabButton = () => {
  return {
    MuiFab: {
      styleOverrides: {
        default: ({ theme }: OwnerStateThemeType) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
  };
};

export default FabButton;
