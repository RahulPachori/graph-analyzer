import { useEffect, useState } from "react";
import { Info, Palette } from "lucide-react";

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
        <>
            <header className="navbar bg-base-200 border-b border-base-300 px-6 shadow-sm">
                <div className="flex-1">
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

                <div className="flex items-center gap-3">
                    <button
                        className="btn btn-circle btn-ghost"
                        onClick={() =>
                            document
                                .getElementById("help_modal")
                                .showModal()
                        }
                    >
                        <Info size={20} />
                    </button>

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

            <dialog id="help_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    <h2 className="text-2xl font-bold mb-4">
                        📖 Graph Algorithm Analyzer Guide
                    </h2>

                    <div className="space-y-5 text-sm">
                        <section>
                            <h3 className="font-bold text-lg">
                                🎯 Purpose
                            </h3>
                            <p>
                                Visualize graph algorithms step by step and
                                understand how they work through animations.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                📝 Graph Input
                            </h3>

                            <pre className="bg-base-300 rounded-lg p-3 overflow-x-auto">
                                {`Number of Nodes
Number of Edges
u v w
u v w
...`}
                            </pre>

                            <p className="mt-2">
                                For unweighted graphs, the weight is ignored.
                            </p>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                ⚙️ Controls
                            </h3>

                            <ul className="list-disc ml-6 space-y-1">
                                <li><b>Run</b> – Start animation.</li>
                                <li><b>Pause / Resume</b> – Control playback.</li>
                                <li><b>Reset</b> – Restore initial state.</li>
                                <li><b>Update Graph</b> – Apply edited graph input.</li>
                                <li><b>Fit Graph</b> – Center the graph.</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                🎨 Node & Edge Colors
                            </h3>

                            <ul className="list-disc ml-6 space-y-1">
                                <li>🟣 Active Node</li>
                                <li>🟢 Visited Node</li>
                                <li>🟡 Active Edge</li>
                                <li>🟢 MST Edge</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                📊 Right Panel
                            </h3>

                            <ul className="list-disc ml-6 space-y-1">
                                <li>Queue / Stack / Priority Queue</li>
                                <li>Algorithm Output</li>
                                <li>Execution Log</li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                📚 Supported Algorithms
                            </h3>

                            <div className="grid grid-cols-2 gap-2">
                                <span>• BFS</span>
                                <span>• DFS</span>
                                <span>• Dijkstra</span>
                                <span>• Bellman-Ford</span>
                                <span>• Prim</span>
                                <span>• Kruskal</span>
                                <span>• Topological Sort</span>
                                <span>• Cycle Detection</span>
                                <span>• Connected Components</span>
                                <span>• Floyd-Warshall</span>
                            </div>
                        </section>

                        <section>
                            <h3 className="font-bold text-lg">
                                💡 Tips
                            </h3>

                            <ul className="list-disc ml-6 space-y-1">
                                <li>Select an algorithm before running.</li>
                                <li>Edit the graph input and click <b>Update Graph</b>.</li>
                                <li>Changing <b>Directed</b> or <b>Weighted</b> updates the visualization.</li>
                                <li>Use <b>Fit Graph</b> if the graph moves out of view.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-primary">
                                Got it
                            </button>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default Navbar;