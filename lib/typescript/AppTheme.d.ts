import React from 'react';
declare type _Mode = 'light' | 'dark';
export declare const ThemeContext: React.Context<{
    Mode: _Mode;
    ModeBool: boolean;
    Theme: any;
    Toggle: (e: _Mode) => void;
}>;
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
export declare function ThemeProvider({ children, theme }: _ThemeProviderProps): JSX.Element;
export {};
