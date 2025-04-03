'use client';

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <NextThemesProvider attribute='class'>{children}</NextThemesProvider>;
};
