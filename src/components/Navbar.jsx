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
        localStorage.getItem("theme") || "dark"
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

                <div className="modal-box max-w-4xl">

                    <h2 className="text-2xl font-bold">
                        📖 Graph Algorithm Analyzer
                    </h2>

                    <p className="text-base-content/70 mt-1 mb-6">
                        Build graphs, run algorithms, and visualize every step of execution.
                    </p>

                    <div className="grid gap-5">

                        <div className="card bg-base-200">

                            <div className="card-body p-5">

                                <h3 className="card-title">
                                    📝 Graph Input
                                </h3>

                                <p className="text-sm text-base-content/70">
                                    Enter the graph using the following format:
                                </p>

                                <pre className="bg-base-300 rounded-lg p-3 text-xs overflow-x-auto mt-2">
                                    {`Number of Nodes
Number of Edges
u v w
u v w
...`}
                                </pre>

                                <p className="text-sm text-base-content/70 mt-2">
                                    For unweighted graphs, the weight column is ignored.
                                </p>

                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="card bg-base-200">

                                <div className="card-body p-5">

                                    <h3 className="card-title">
                                        ⚙️ Controls
                                    </h3>

                                    <ul className="space-y-2 text-sm">

                                        <li>▶ <b>Run</b> — Start visualization.</li>

                                        <li>⏸ <b>Pause / Resume</b> — Control playback.</li>

                                        <li>🔄 <b>Reset</b> — Return to the initial state.</li>

                                        <li>📥 <b>Update Graph</b> — Apply edited graph input.</li>

                                        <li>📐 <b>Fit Graph</b> — Center the graph on screen.</li>

                                    </ul>

                                </div>

                            </div>

                            <div className="card bg-base-200">

                                <div className="card-body p-5">

                                    <h3 className="card-title">
                                        🎨 Colors
                                    </h3>

                                    <ul className="space-y-2 text-sm">

                                        <li>🟣 Current Node</li>

                                        <li>🟢 Visited Node</li>

                                        <li>🟡 Active Edge</li>

                                        <li>🟢 MST Edge</li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div className="card bg-base-200">

                                <div className="card-body p-5">

                                    <h3 className="card-title">
                                        📊 Right Panel
                                    </h3>

                                    <ul className="space-y-2 text-sm">

                                        <li>• Queue / Stack / Priority Queue</li>

                                        <li>• Live Algorithm Output</li>

                                        <li>• Execution Log</li>

                                    </ul>

                                </div>

                            </div>

                            <div className="card bg-base-200">

                                <div className="card-body p-5">

                                    <h3 className="card-title">
                                        💡 Tips
                                    </h3>

                                    <ul className="space-y-2 text-sm">

                                        <li>Choose an algorithm before running.</li>

                                        <li>Edit the graph and click <b>Update Graph</b>.</li>

                                        <li>Changing <b>Directed</b> or <b>Weighted</b> updates the visualization instantly.</li>

                                        <li>Use <b>Fit Graph</b> if the graph moves out of view.</li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <div className="card bg-base-200">

                            <div className="card-body p-5">

                                <h3 className="card-title">
                                    📚 Supported Algorithms
                                </h3>

                                <div className="flex flex-wrap gap-2 mt-2">

                                    <span className="badge badge-outline">BFS</span>
                                    <span className="badge badge-outline">DFS</span>
                                    <span className="badge badge-outline">Dijkstra</span>
                                    <span className="badge badge-outline">Bellman-Ford</span>
                                    <span className="badge badge-outline">Prim</span>
                                    <span className="badge badge-outline">Kruskal</span>
                                    <span className="badge badge-outline">Topological Sort</span>
                                    <span className="badge badge-outline">Cycle Detection</span>
                                    <span className="badge badge-outline">Connected Components</span>
                                    <span className="badge badge-outline">Floyd-Warshall</span>

                                </div>

                            </div>

                        </div>

                        <div className="alert alert-info">

                            <span>
                                🚀 <b>Quick Start:</b> Enter or edit a graph → Click <b>Update Graph</b> → Select an algorithm → Press <b>Run</b>.
                            </span>

                        </div>

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