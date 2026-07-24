import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    useReactFlow,
} from "@xyflow/react";
import GraphNode from "./GraphNode";
import { useEffect } from "react";

function FitGraphButton() {
    const { fitView } = useReactFlow();

    return (
        <div className="absolute top-3 right-3 z-50">
            <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                    fitView({
                        padding: 0.2,
                        duration: 500,
                    })
                }
            >
                📐 Fit Graph
            </button>
        </div>
    );
}

function GraphCanvas({
    nodes,
    edges,
    activeNodes,
    activeEdges,
    visitedNodes,
    visitedEdges,
    directed,
}) {
    const nodeTypes = {
        graphNode: GraphNode,
    };

    const [flowNodes, setFlowNodes, onNodesChange] = useNodesState(nodes);
    const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState(edges);

    useEffect(() => {
        setFlowNodes(nodes);
    }, [nodes, setFlowNodes]);

    useEffect(() => {
        setFlowEdges(edges);
    }, [edges, setFlowEdges]);

    const displayNodes = flowNodes.map((node) => ({
        ...node,
        data: {
            ...node.data,
            active: activeNodes.includes(Number(node.id)),
            visited: visitedNodes.includes(Number(node.id)),
        },
    }));

    const displayEdges = flowEdges.map((edge) => {
        const u = Number(edge.source);
        const v = Number(edge.target);

        const isActive = activeEdges.some((e) => {
            if (directed) return e.from === u && e.to === v;

            return (
                (e.from === u && e.to === v) ||
                (e.from === v && e.to === u)
            );
        });

        const isVisited = visitedEdges.some((e) => {
            if (directed) return e.from === u && e.to === v;

            return (
                (e.from === u && e.to === v) ||
                (e.from === v && e.to === u)
            );
        });

        return {
            ...edge,

            animated: isActive,

            labelStyle: {
                fontSize: isActive
                    ? 20
                    : isVisited
                        ? 25
                        : 14,

                fontWeight: 800,
                fill: "#ffffff",
                textShadow: "0 0 6px rgba(0,0,0,0.9)",
            },

            labelShowBg: false,

            style: {
                ...edge.style,

                strokeWidth: isActive
                    ? 3
                    : isVisited
                        ? 5
                        : 2,

                stroke: isActive
                    ? "#f59e0b"
                    : isVisited
                        ? "#22c55e"
                        : "#6b7280",

                strokeLinecap: "round",
            },
        };
    });

    return (
        <div className="relative h-full bg-base-100">
            <ReactFlow
                nodes={displayNodes}
                edges={displayEdges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            >
                <Background
                    gap={22}
                    size={1.3}
                    color="#94a3b8"
                />

                <FitGraphButton />
            </ReactFlow>
        </div>
    );
}

export default GraphCanvas;