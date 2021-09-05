"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;
exports.ThemeContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));

var _reactNativeAppearance = require("react-native-appearance");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ThemeContext = /*#__PURE__*/_react.default.createContext({
  Mode: 'light',
  ModeBool: true,
  Theme: {},
  Toggle: () => {}
});

exports.ThemeContext = ThemeContext;

function ThemeProvider({
  children,
  theme
}) {
  _react.default.useEffect(() => {
    (async () => {
      let a = await _asyncStorage.default.getItem('ThemeMode'); // eslint-disable-next-line eqeqeq

      if (a == 'light' || a == 'dark') {
        setMode(a);
        setModeBool(a == 'light');
      } else if (a == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = (0, _reactNativeAppearance.useColorScheme)() == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      }
    })();
  }, []);

  const [Mode, setMode] = _react.default.useState('light');

  const [ModeBool, setModeBool] = _react.default.useState(true);

  const Toggle = tMode => {
    return new Promise(async res => {
      if (tMode == 'system') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let b = (0, _reactNativeAppearance.useColorScheme)() == 'dark';
        setMode(b ? 'dark' : 'light');
        setModeBool(!b);
      } else {
        setMode(tMode);
        setModeBool(tMode == 'light');
      }

      await _asyncStorage.default.setItem('ThemeMode', tMode);
      res(true);
    });
  };

  const Theme = Mode == 'light' ? theme.light : theme.dark;
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: {
      Mode,
      ModeBool,
      Theme,
      Toggle
    }
  }, children);
}
//# sourceMappingURL=AppTheme.js.map