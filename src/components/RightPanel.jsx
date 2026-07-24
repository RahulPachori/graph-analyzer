import { useEffect, useRef } from "react";
import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";

function RightPanel({
    algorithm,
    queue,
    logs,
    output,
    matrix,
}) {

    const logRef = useRef(null);

    useEffect(() => {

        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }

    }, [logs]);

    const stateTitle = {

        bfs: "📋 Queue",
        dfs: "📚 Call Stack",
        dijkstra: "🏁 Priority Queue",
        prim: "🌳 Priority Queue",
        kruskal: "⚖️ Current Edge",
        bellmanford: "🔁 Current Pass",
        toposort: "📋 Zero In-Degree Queue",
        cycle: "📚 DFS Stack",
        components: "🧩 Current Component",
        floydwarshall: "🔄 Current Intermediate Vertex",

    }[algorithm];

    return (

        <div className="h-full flex flex-col bg-base-200 border-l border-base-300 p-4">

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-lg font-bold">
                    Algorithm State
                </h2>

                <div className="flex items-center gap-5">

                    <div
                        className="tooltip tooltip-bottom"
                        data-tip="Unvisited Node"
                    >
                        <div className="w-6 h-6 rounded-full bg-primary shadow-md cursor-help"></div>
                    </div>

                    <div
                        className="tooltip tooltip-bottom"
                        data-tip="Visited Node"
                    >
                        <div className="w-6 h-6 rounded-full bg-success shadow-md cursor-help"></div>
                    </div>

                    <div
                        className="tooltip tooltip-bottom"
                        data-tip="Current Node"
                    >
                        <div className="w-6 h-6 rounded-full bg-warning shadow-md cursor-help"></div>
                    </div>

                </div>

            </div>

            <div className="flex flex-col gap-4">

                <div>

                    <h3 className="text-sm font-semibold text-base-content/70 mb-1">
                        {stateTitle}
                    </h3>

                    <div className="bg-base-100 rounded-lg px-3 py-2 min-h-12 flex items-center">

                        {
                            queue.length ? (

                                <div className="font-mono break-words">
                                    {queue.join("   ")}
                                </div>

                            ) : (

                                <span className="text-base-content/60">
                                    —
                                </span>

                            )
                        }

                    </div>

                </div>

                {
                    algorithm === "floydwarshall" &&
                    matrix.length > 0 && (
                        <>
                            <h3 className="text-sm font-semibold text-base-content/70 mb-1">
                                📐 Current Distance Matrix
                            </h3>

                            <div className="bg-base-100 rounded-lg p-2 overflow-auto max-h-60 mb-4">

                                <table className="table table-xs table-zebra">

                                    <tbody>

                                        {
                                            matrix.slice(1).map((row, i) => (

                                                <tr key={i}>

                                                    <th>{i + 1}</th>

                                                    {
                                                        row.slice(1).map((x, j) => (

                                                            <td key={j}>
                                                                {x >= 1e18 ? "∞" : x}
                                                            </td>

                                                        ))
                                                    }

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </>
                    )
                }

            </div>

            <PanelGroup
                direction="vertical"
                className="flex-1 overflow-hidden mt-4"
            >

                
                

                <Panel
                    defaultSize={50}
                    minSize={20}
                >

                    <div className="h-full flex flex-col overflow-hidden">

                        <h2 className="text-xl font-bold mb-3">
                            📝 Execution Log
                        </h2>

                        <div
                            ref={logRef}
                            className="flex-1 bg-base-100 rounded-lg p-3 overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap"
                        >

                            {
                                logs.length === 0 ? (

                                    <p className="text-base-content/60">
                                        No activity yet.
                                    </p>

                                ) : (

                                    logs.map((log, i) => (

                                        <div
                                            key={i}
                                            className={`mb-2 ${i === logs.length - 1
                                                ? "font-semibold text-primary"
                                                : ""
                                                }`}
                                        >
                                            {i + 1}. {log}
                                        </div>

                                    ))

                                )
                            }

                        </div>

                    </div>

                </Panel>

                <PanelResizeHandle className="h-2 flex items-center justify-center cursor-row-resize">

                    <div className="w-12 h-1 rounded-full bg-base-300"></div>

                </PanelResizeHandle>
                
                <Panel
                    defaultSize={35}
                    minSize={20}
                >

                    <div className="h-full flex flex-col">

                        <h2 className="text-xl font-bold mb-3">
                            📊 Output
                        </h2>

                        <div className="flex-1 bg-base-100 rounded-lg p-3 overflow-y-auto overflow-x-hidden break-words whitespace-pre-wrap">

                            {
                                output.length === 0 ? (

                                    <span className="text-base-content/60">
                                        No Output
                                    </span>

                                ) : (

                                    <div className="space-y-4">

                                        {
                                            output.map((item, i) => (

                                                <div key={i}>

                                                    <div className="font-semibold mb-2">
                                                        {item.label}
                                                    </div>

                                                    {
                                                        item.label === "Distance Matrix" ? (

                                                            <div className="overflow-x-auto">

                                                                <table className="table table-xs table-zebra">

                                                                    <thead>

                                                                        <tr>

                                                                            <th></th>

                                                                            {
                                                                                item.value[0].map((_, j) => (
                                                                                    <th key={j}>
                                                                                        {j + 1}
                                                                                    </th>
                                                                                ))
                                                                            }

                                                                        </tr>

                                                                    </thead>

                                                                    <tbody>

                                                                        {
                                                                            item.value.map((row, i) => (

                                                                                <tr key={i}>

                                                                                    <th>{i + 1}</th>

                                                                                    {
                                                                                        row.map((x, j) => (

                                                                                            <td key={j}>
                                                                                                {x >= 1e18 ? "∞" : x}
                                                                                            </td>

                                                                                        ))
                                                                                    }

                                                                                </tr>

                                                                            ))
                                                                        }

                                                                    </tbody>

                                                                </table>

                                                            </div>

                                                        ) : Array.isArray(item.value) ? (

                                                            <div className="font-mono break-words">
                                                                {item.value.join(", ")}
                                                            </div>

                                                        ) : (

                                                            <div className="font-mono break-words">
                                                                {String(item.value)}
                                                            </div>

                                                        )
                                                    }

                                                </div>

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>

                    </div>

                </Panel>

            </PanelGroup>

        </div>

    );

}

export default RightPanel;