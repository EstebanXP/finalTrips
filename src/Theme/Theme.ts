import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontSize: '32px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
    },
    h2: {
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
    },
    h3: {
      fontSize: '18px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
    },
    body1: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
    },
    body2: {
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: 'normal',
    },
    button: {
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: 'normal',
      letterSpacing: '0.16px',
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // Replace with your desired button color
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#fff',
    },
  },
  // Override the hover color of the primary button
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a202cf2',
          color: '#fff',
          textTransform: 'unset',
          outline: '1px solid white',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'gray',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '250px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          color: "black"
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root': {
            height: 'auto',
            borderRadius: '8px',
            border: '1px',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineheight: 'normal',
            padding: '1px 2px',
          },
        },
      },
    },
  },
})

/*declare module '@mui/material/styles' {
  interface Theme {
    typographyColor: {
      primaryText: React.CSSProperties['color']
    }
    extraBackgrounds: {
      selectedItem: React.CSSProperties['color']
    }
    extraColors?: {
      stroke01: React.CSSProperties['color']
    }
  }

  interface ThemeOptions {
    typographyColor: {
      primaryText: React.CSSProperties['color']
    }
    extraBackgrounds: {
      selectedItem: React.CSSProperties['color']
    }
    extraColors?: {
      stroke01: React.CSSProperties['color']
    }
  }
}

declare module '@mui/material/styles/createTypography' {}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    //title: true
    //alertText: true
  }
}*/

/*

export const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {},
      },
    },
    MuiCssBaseline: {
      styleOverrides: {},
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#990000', // Replace with your desired hover color
          },
        },
      },
    },
  },
  typographyColor: {
    primaryText: '#2F2F2F',
  },
  extraBackgrounds: {
    selectedItem: '#01ECB4',
  },
  extraColors: {
    stroke01: '#EEEEEE',
  },
  palette: {
    primary: {
      main: '#1976d2', // Replace with your desired button color
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      contrastText: '#fff',
    },
  },
})


*/
