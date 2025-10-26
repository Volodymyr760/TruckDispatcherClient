import { createContext } from 'react';

type ThemeContextType = {
  toggleTheme: () => void
  theme: string
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default ThemeContext;