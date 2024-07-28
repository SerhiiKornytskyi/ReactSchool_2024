import { createContext, useState, ReactNode } from "react";

interface Theme {
    backgroundColor: string;
    color: string;
}

interface DarkModeContextType {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
}

const themes = {
    dark: {
        backgroundColor: "unset",
        color: "unset",
    },
    light: {
        backgroundColor: "#58DCE8FF",
        color: "black",
    },
};

export const DarkModeContext = createContext<DarkModeContextType>({} as DarkModeContextType);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? themes.dark : themes.light;
    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <DarkModeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </DarkModeContext.Provider>
    );
};
