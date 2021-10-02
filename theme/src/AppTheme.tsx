import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native-appearance';

type _Mode = 'light' | 'dark';

export const ThemeContext = React.createContext<{
  Mode: _Mode;
  ModeBool: boolean;
  ModeComplete: _Mode | 'system',
  Theme: any;
  Toggle: (e: _Mode|'system') => void;
}>({
  Mode: 'light',
  ModeBool: true,
  Theme: {},
  Toggle: () => {},
  ModeComplete: 'light',
});

interface _ThemeProviderProps {
  children: any;
  theme: {
    light: {
      [key: string]: any;
    };
    dark: {
      [key: string]: any;
    };
  };
}

let Prev:any = false;

export function ThemeProvider({ children, theme }: _ThemeProviderProps) {
  const scheme = useColorScheme();
  React.useEffect(() => {
    (async () => {
      let a = await AsyncStorage.getItem('ThemeMode');
      // eslint-disable-next-line eqeqeq
      if (a == 'light' || a == 'dark') {
        setMode(a);
        setModeBool(a == 'light');
      } else if (a == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = scheme == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      }
      if (a=='light'||a=='dark'||a=='system')
      setModeComplete(a);
    })();
  }, []);

  const [Mode, setMode] = React.useState<_Mode>('light');
  const [ModeBool, setModeBool] = React.useState<boolean>(true);
  const [ModeComplete, setModeComplete] = React.useState<_Mode | 'system'>('light');

  // imaginons que Prev != scheme et que ModeComplete == light
  // il faut que quand l'user passe ModeComplete == system, je puisse passer le mode à scheme.

  const Toggle = (tMode: _Mode | 'system') => {
    return new Promise(async (res) => {
      if (tMode == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = scheme == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      } else {
        setMode(tMode);
        setModeBool(tMode == 'light');
      }
      setModeComplete(tMode);
      await AsyncStorage.setItem('ThemeMode', tMode);
      res(true);
    });
  };

  if (!Prev){
    Prev = scheme;
  } else if (Prev != scheme && ModeComplete=='system'){
    Prev = scheme;
    Toggle('system');
  }


  const Theme:any = {...(Mode == 'light' ? theme.light : theme.dark),Light:theme.light,Dark:theme.dark};

  return (
    <ThemeContext.Provider value={{ Mode, ModeBool, ModeComplete, Theme, Toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
