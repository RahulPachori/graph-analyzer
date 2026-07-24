import { useEffect, useState } from "react";

const themes = [
    "light",
    "dark",
    "cupcake",
    "forest",
    "synthwave",
    "dracula",
];

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <select
            className="select select-bordered"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
        >
            {themes.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
}