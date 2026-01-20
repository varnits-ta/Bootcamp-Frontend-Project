import { useContext, useEffect, useRef } from "react"
import { ThemeContext } from "../context/ThemeContext";

export function TestPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const themeContext = useContext(ThemeContext)

    useEffect(() => {
        console.log(usernameRef.current);
    }, [])
    
    return (
        <div className="p-10 flex flex-col gap-2">
            <input type="text" placeholder="Username" ref={usernameRef} className="border rounded-md p-2"/> 

            <button className="bg-gray-400 p-2 rounded-md" onClick={() => usernameRef.current?.focus()}>
                Submit
            </button>

            <div className="w-100 h-100" style={
                {
                    backgroundColor: themeContext.theme === "dark" ? "black" : "white",
                }
            }/>

            <button onClick={() => themeContext.toggleTheme()} className="bg-gray-400 p-2 rounded-md">
                Switch Theme
            </button>

        </div>
    )
}