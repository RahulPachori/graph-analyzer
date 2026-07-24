import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const themes = [
    { value: "light", label: "🌞 Light" },
    { value: "dark", label: "🌙 Dark" },
    { value: "cupcake", label: "🧁 Cupcake" },
    { value: "bumblebee", label: "🐝 Bumblebee" },
    { value: "emerald", label: "💚 Emerald" },
    { value: "corporate", label: "🏢 Corporate" },
    { value: "synthwave", label: "💜 Synthwave" },
    { value: "retro", label: "📼 Retro" },
    { value: "cyberpunk", label: "🤖 Cyberpunk" },
    { value: "valentine", label: "💖 Valentine" },
    { value: "halloween", label: "🎃 Halloween" },
    { value: "garden", label: "🌿 Garden" },
    { value: "forest", label: "🌲 Forest" },
    { value: "aqua", label: "🌊 Aqua" },
    { value: "lofi", label: "🎵 Lo-Fi" },
    { value: "pastel", label: "🎨 Pastel" },
    { value: "fantasy", label: "🦄 Fantasy" },
    { value: "wireframe", label: "📐 Wireframe" },
    { value: "black", label: "⚫ Black" },
    { value: "luxury", label: "💎 Luxury" },
    { value: "dracula", label: "🦇 Dracula" },
    { value: "cmyk", label: "🖨️ CMYK" },
    { value: "autumn", label: "🍂 Autumn" },
    { value: "business", label: "💼 Business" },
    { value: "acid", label: "🟢 Acid" },
    { value: "lemonade", label: "🍋 Lemonade" },
    { value: "night", label: "🌃 Night" },
    { value: "coffee", label: "☕ Coffee" },
    { value: "winter", label: "❄️ Winter" },
    { value: "dim", label: "🌑 Dim" },
    { value: "nord", label: "🧊 Nord" },
    { value: "sunset", label: "🌇 Sunset" },
];

function Navbar() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <header className="navbar bg-base-200 border-b border-base-300 px-6 shadow-sm">
            <div className="flex-1">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-4">
                        <img
                            src="/graph-icon.png"
                            alt="Graph Algorithm Analyzer"
                            className="w-16 h-16 object-contain"
                        />

                        <div>
                            <h1 className="text-2xl font-bold tracking-wide">
                                Graph Algorithm Analyzer
                            </h1>

                            <p className="text-sm text-base-content/70">
                                Interactive Graph Visualization
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Palette
                    size={20}
                    className="text-base-content opacity-70"
                />

                <select
                    className="select select-bordered w-52"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    {themes.map((t) => (
                        <option key={t.value} value={t.value}>
                            {t.label}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}

export default Navbar;