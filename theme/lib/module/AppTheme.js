import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native-appearance';
export const ThemeContext = /*#__PURE__*/React.createContext({
  Mode: 'light',
  ModeBool: true,
  Theme: {},
  Toggle: () => {}
});
export function ThemeProvider({
  children,
  theme
}) {
  React.useEffect(() => {
    (async () => {
      let a = await AsyncStorage.getItem('ThemeMode'); // eslint-disable-next-line eqeqeq

      if (a == 'light' || a == 'dark') {
        setMode(a);
        setModeBool(a == 'light');
      } else if (a == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = useColorScheme() == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      }
    })();
  }, []);
  const [Mode, setMode] = React.useState('light');
  const [ModeBool, setModeBool] = React.useState(true);

  const Toggle = tMode => {
    return new Promise(async res => {
      if (tMode == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = useColorScheme() == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      } else {
        setMode(tMode);
        setModeBool(tMode == 'light');
      }

      await AsyncStorage.setItem('ThemeMode', tMode);
      res(true);
    });
  };

  const Theme = Mode == 'light' ? theme.light : theme.dark;
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: {
      Mode,
      ModeBool,
      Theme,
      Toggle
    }
  }, children);
}
//# sourceMappingURL=AppTheme.js.map