import { createContext, useContext, useMemo } from 'react';
import useLocalStorage from 'use-local-storage';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { blue } from '@mui/material/colors';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
  const colorPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [mode, setMode] = useLocalStorage("mode", colorPreference ? "dark" : "light");

  if (mode == undefined)
    setMode("light");

  if (mode != undefined)
    document.body.classList.add(`mode-${mode}`);
  
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
    document.body.classList.add(`mode-${(mode === "light" ? "dark" : "light")}`);
    document.body.classList.remove(`mode-${mode}`);
  }

  function nextMode() {
    return mode === "light" ? "dark" : "light";
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: (mode === "light") ? { mode } :
        {
          mode,
          background: {
            default: "#181818",
            paper: "#181818"
          } 
        }
        ,
        components: {
          MuiAppBar: {
            styleOverrides: {
              colorPrimary: (mode === "light") ?
              { backgroundColor: blue[900] } :
              { backgroundImage: 'unset' }
            }
          }
        }
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{mode, nextMode, toggleMode}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
}