import {createTheme} from '@mui/material';

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1000,
            lg: 1200,
            xl: 1920
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: false
            },
            styleOverrides: {
                root: {
                    textTransform: 'none'
                },
                sizeSmall: {
                    padding: '6px 16px'
                },
                sizeMedium: {
                    padding: '8px 20px'
                },
                sizeLarge: {
                    padding: '11px 24px'
                },
                textSizeSmall: {
                    padding: '7px 12px'
                },
                textSizeMedium: {
                    padding: '9px 16px'
                },
                textSizeLarge: {
                    padding: '12px 16px'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: {
                '*': {
                    boxSizing: 'border-box',
                    margin: 0,
                    padding: 0
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                }
            }
        },

    },
    palette: {
        // primary: {
        //     dirtyLilac: '#d4daf1',
        //     lavander: '#e5e0ff',
        //     botticelli: '#cbdde2',
        //     blueBell: '#949fdd',
        //     classicGray: '#cacaca',
        //     warmLightGray: '#eae9e5',
        //     white: '#ffffff',
        //     main: '#ffffff',
        //     lightGray: "#2f2f2f",
        //     middleGray: "#212121",
        //     darkGray: "#171717",
        // },
        primary: {
            dirtyLilac: '#d4daf1',
            lavander: '#e5e0ff',
            botticelli: '#cbdde2',
            blueBell: '#949fdd',
            classicGray: '#cacaca',
            warmLightGray: '#eae9e5',
            white: '#ffffff',
            main: '#ffffff',

            skeleton: "#2f2f2f59",
            lightGray: "#2f2f2f",
            middleGray: "#212121",
            darkGray: "#171717",
            gray: "rgb(230 230 230)",
            backgroundLight: "#ffffff",
            typography: "#ffffff",
        },
        secondary: {
            main: "#000000",
        },
        gradients: {
            stardust: 'linear-gradient(268.32deg, #CEDFE9 -5.12%, #DDD6FA 77.62%)',
            stardustVertical: 'linear-gradient(3.56deg, #CEDFE9 1.06%, #DDD6FA 98.71%)',
            stardustHorizontal: 'linear-gradient(245deg, #CEDFE9 0%, #DDD6FA 100%)',
            purpleHaze:
                'linear-gradient(89.93deg, rgba(216, 210, 246, 0.68) 1.4%, rgba(137, 121, 218, 0.68) 103.85%)',
            whitePurple: 'linear-gradient(334.87deg, #FEFEFE 33.14%, #8979DA 139.76%)',
            whiteBlue: 'linear-gradient(3.36deg, #CEDFE9 40.49%, #FFFFFF 104.18%)',
        },

        purpleSet: {
            ['02']: '#e5e0ff',
            ['03']: '#a3ace1',
            ['04']: '#a5b3fd',
            ['05']: '#d8d2f6',
            ['06']: '#888fba',
        },
    },

    shape: {
        borderRadius: 8
    },
    shadows: [
        'none',
        '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
        '0px 1px 2px rgba(100, 116, 139, 0.12)',
        '0px 1px 4px rgba(100, 116, 139, 0.12)',
        '0px 1px 5px rgba(100, 116, 139, 0.12)',
        '0px 1px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 6px rgba(100, 116, 139, 0.12)',
        '0px 3px 6px rgba(100, 116, 139, 0.12)',
        '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
        '0px 5px 12px rgba(100, 116, 139, 0.12)',
        '0px 5px 14px rgba(100, 116, 139, 0.12)',
        '0px 5px 15px rgba(100, 116, 139, 0.12)',
        '0px 6px 15px rgba(100, 116, 139, 0.12)',
        '0px 7px 15px rgba(100, 116, 139, 0.12)',
        '0px 8px 15px rgba(100, 116, 139, 0.12)',
        '0px 9px 15px rgba(100, 116, 139, 0.12)',
        '0px 10px 15px rgba(100, 116, 139, 0.12)',
        '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
        '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
        '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)',
        '0px 25px 50px rgba(100, 116, 139, 0.25)'
    ],
    typography: {
        button: {
            fontWeight: 600
        },
        fontFamily: '"Montserrat", sans-serif;',
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.75
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 2.5,
            textTransform: 'uppercase'
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            lineHeight: 1.66
        },
        h1: {
            fontWeight: 700,
            fontSize: '3.5rem',
            lineHeight: 1.375
        },
        h2: {
            fontWeight: 700,
            fontSize: '3rem',
            lineHeight: 1.375
        },
        h3: {
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.375
        },
        h4: {
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.375
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.375
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.375
        }
    }
});