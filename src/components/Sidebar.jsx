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
        <div className="bg-base-200 border-r border-base-300 h-full overflow-y-auto">

            <div className="p-4 space-y-3 ">

                {/* Algorithm */}

                <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-3">

                    <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                        ⚡ Algorithm
                    </label>

                    <select
                        className="select select-bordered select-sm w-full"
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS</option>
                        <option value="dijkstra">Dijkstra</option>
                        <option value="bellmanford">Bellman-Ford</option>
                        <option value="prim">Prim</option>
                        <option value="kruskal">Kruskal</option>
                        <option value="toposort">Topological Sort</option>
                        <option value="cycle">Cycle Detection</option>
                        <option value="components">Connected Components</option>
                        <option value="floydwarshall">Floyd-Warshall</option>
                    </select>

                </div>

                {/* Parameters */}

                <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-3">

                    <label className="text-sm font-semibold flex items-center gap-2 mb-2">
                        🎯 Parameters
                    </label>

                    <div className="grid grid-cols-2 gap-3">

                        <div>

                            <label className="label py-1">

                                <span className="label-text text-xs">
                                    Source
                                </span>

                            </label>

                            <input
                                type="number"
                                className="input input-bordered input-sm w-full"
                                value={source}
                                onChange={(e) =>
                                    setSource(Number(e.target.value))
                                }
                            />

                        </div>

                        {(algorithm === "dijkstra" ||
                            algorithm === "bellmanford") && (

                                <div>

                                    <label className="label py-1">

                                        <span className="label-text text-xs">
                                            Destination
                                        </span>

                                    </label>

                                    <input
                                        type="number"
                                        className="input input-bordered input-sm w-full"
                                        value={destination}
                                        onChange={(e) =>
                                            setDestination(Number(e.target.value))
                                        }
                                    />

                                </div>

                            )}

                    </div>

                </div>

                {/* Graph Settings */}

                <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-3">

                    <label className="text-sm font-semibold flex items-center gap-2 mb-3">
                        ⚙️ Graph Settings
                    </label>

                    <div className="flex justify-between items-center">

                        <label className="label cursor-pointer gap-2 py-0">

                            <span className="label-text text-sm">
                                Weighted
                            </span>

                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                                checked={weighted}
                                onChange={(e) =>
                                    setWeighted(e.target.checked)
                                }
                            />

                        </label>

                        <label className="label cursor-pointer gap-2 py-0">

                            <span className="label-text text-sm">
                                Directed
                            </span>

                            <input
                                type="checkbox"
                                className="toggle toggle-primary toggle-sm"
                                checked={directed}
                                onChange={(e) =>
                                    setDirected(e.target.checked)
                                }
                            />

                        </label>

                    </div>

                </div>

                {/* Graph Input */}

                <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-3">

                    <div className="flex items-center justify-between mb-2">

                        <label className="text-sm font-semibold flex items-center gap-2">
                            📄 Graph Input
                        </label>

                        <button
                            className="btn btn-primary btn-xs"
                            onClick={updateGraph}
                        >
                            Update
                        </button>

                    </div>

                    <textarea
                        className="
                            textarea
                            textarea-bordered
                            w-full
                            h-52
                            resize-none
                            font-mono
                            text-sm
                        "
                        value={graphInput}
                        onChange={(e) => setGraphInput(e.target.value)}
                    />

                </div>

                {/* Controls */}

                <div className="bg-base-100 rounded-xl border border-base-300 shadow-sm p-3">

                    <label className="text-sm font-semibold flex items-center gap-2 mb-3">
                        🎮 Controls
                    </label>

                    <div className="grid grid-cols-2 gap-2">

                        <button
                            className="btn btn-primary btn-sm col-span-2"
                            onClick={runAlgorithm}
                            disabled={started}
                        >
                            {running
                                ? "⏳ Running..."
                                : "▶ Run"}
                        </button>

                        <button
                            className={`btn btn-sm ${running
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
                            className="btn btn-error btn-sm"
                            onClick={resetAnimation}
                            disabled={!started}
                        >
                            🔄 Reset
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Sidebar;