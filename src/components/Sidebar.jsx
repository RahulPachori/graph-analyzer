function Sidebar({
    graphInput,
    setGraphInput,
    weighted,
    setWeighted,
    directed,
    setDirected,
    updateGraph,
    source,
    setSource,
    destination,
    setDestination,
    algorithm,
    setAlgorithm,
    runAlgorithm,
    toggleAnimation,
    resetAnimation,
    running,
    started,
}) {
    return (
        <div className="bg-base-200 h-full p-5 overflow-y-auto">

            <div className="space-y-6">

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            ⚡ Algorithm
                        </span>
                    </label>

                    <select
                        className="select select-bordered w-full"
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS</option>
                        <option value="dijkstra">Dijkstra</option>
                        <option value="bellmanford">Bellman-Ford</option>
                        <option value="prim">Prim</option>
                        <option value="kruskal">Kruskal</option>
                        <option value="toposort">Topological Sort (Kahn)</option>
                        <option value="cycle">Cycle Detection</option>
                        <option value="components">Connected Components (DFS)</option>
                        <option value="floydwarshall">Floyd-Warshall</option>
                    </select>
                </div>

                <div>
                    <label className="label">
                        <span className="label-text font-semibold">
                            🎯 Source Node
                        </span>
                    </label>

                    <input
                        type="number"
                        className="input input-bordered w-full"
                        value={source}
                        onChange={(e) => setSource(Number(e.target.value))}
                    />
                </div>

                {(algorithm === "dijkstra" ||
                    algorithm === "bellmanford") && (
                        <div>
                            <label className="label">
                                <span className="label-text font-semibold">
                                    🏁 Destination Node
                                </span>
                            </label>

                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={destination}
                                onChange={(e) =>
                                    setDestination(Number(e.target.value))
                                }
                            />
                        </div>
                    )}

                <div className="bg-base-100 rounded-xl p-4">

                    <div className="flex justify-between">

                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">
                                Weighted
                            </span>

                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={weighted}
                                onChange={(e) =>
                                    setWeighted(e.target.checked)
                                }
                            />
                        </label>

                        <label className="label cursor-pointer gap-2">
                            <span className="label-text">
                                Directed
                            </span>

                            <input
                                type="checkbox"
                                className="checkbox checkbox-primary"
                                checked={directed}
                                onChange={(e) =>
                                    setDirected(e.target.checked)
                                }
                            />
                        </label>

                    </div>

                </div>

                <div>

                    <label className="label">
                        <span className="label-text font-semibold">
                            📄 Graph Input
                        </span>
                    </label>

                    <textarea
                        className="textarea textarea-bordered w-full h-60 font-mono"
                        value={graphInput}
                        onChange={(e) => setGraphInput(e.target.value)}
                    />

                </div>

                <button
                    className="btn btn-primary w-full"
                    onClick={updateGraph}
                >
                    📥 Update Graph
                </button>

                <div className="grid grid-cols-2 gap-3">

                    <button
                        className="btn btn-primary"
                        onClick={runAlgorithm}
                        disabled={started}
                    >
                        {running ? "⏳ Running..." : "▶ Run"}
                    </button>

                    <button
                        className={`btn ${running
                                ? "btn-warning"
                                : "btn-info"
                            }`}
                        onClick={toggleAnimation}
                        disabled={!started}
                    >
                        {running
                            ? "⏸ Pause"
                            : "▶ Resume"}
                    </button>

                    <button
                        className="btn btn-error col-span-2"
                        onClick={resetAnimation}
                        disabled={!started}
                    >
                        🔄 Reset
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Sidebar;