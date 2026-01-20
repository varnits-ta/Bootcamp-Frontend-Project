import { createContext, useState } from "react";

interface ThemeContextProps {
    theme: "dark" | "light";
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: "dark",
    toggleTheme: () => {},
});

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    const toggleTheme = () => {
        setTheme(() => theme === "dark" ? "light" : "dark");
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}