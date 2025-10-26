import { useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import ThemeContext from './components/Context/ThemeContext';
import { useActions } from './hooks/useActions';
import { AxiosMiddleWareBoot } from './api/middleware';
import { getAuthModelAxios } from './api/user';

const getThemeMode = (): string => {
    const themeMode = localStorage.getItem('tm')
    if (themeMode === null) {
        localStorage.setItem('tm', 'light')
        return 'light'
    } else {
        return themeMode
    }
}

export default function App() {
    const [theme, setTheme] = useState<string>(getThemeMode)
    const { login } = useActions()

    const fetchAuthModel = async function name(id: string) {
        const authModel = await getAuthModelAxios(id)
        login(authModel)
        AxiosMiddleWareBoot(authModel.tokens.accessToken, authModel.tokens.refreshToken, authModel.user.email)
    }

    useEffect(() => {
        const userId = localStorage.getItem('id')
        if (userId) fetchAuthModel(userId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            localStorage.setItem('tm', 'light')
        } else {
            setTheme('dark')
            localStorage.setItem('tm', 'dark')
        }
    }

    // reed more: https://mui.com/material-ui/customization/default-theme/
    const darkTheme = createTheme({
        palette: {
            mode: theme === 'dark' ? 'dark' : 'light',
        },
        typography: {
            fontFamily: ['Mulish', 'Segoe UI', 'Helvetica Neue'].join(','),
            fontWeightMedium: 400,
            body1: {
                color: theme === 'dark' ? 'white' : 'var(--darkGrey)',
                backgroundColor: theme === 'dark' ? 'var(--bgDark)' : 'white'
            }
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        color: theme === 'dark' ? 'var(--yellow)' : 'var(--darkGrey)',
                        backgroundColor: theme === 'dark' ? 'var(--bgLight)' : 'white', // Custom AppBar background in dark mode
                    },
                },
            },
        }
    });

    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

