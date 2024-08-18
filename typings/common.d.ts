declare global {
  export interface Window {
    config: { [key: string]: string | undefined };
  }
}

export declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string;
      main: string;
      light: string;
      backgroundTeamSupport: string;
      backgroundFooter: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      dark: string;
      main: string;
      light: string;
      backgroundTeamSupport: string;
      backgroundFooter: string;
    };
  }
}

export declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    tonal: true;
  }
}

export declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    tonal: true;
  }
}
