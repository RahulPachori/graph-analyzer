import { layoutGraph } from "./layoutGraph";

export function parseGraph(input, weighted, directed) {
    const lines = input
        .trim()
        .split("\n")
        .map(line => line.trim())
        .filter(line => line !== "");

    const n = Number(lines[0]);
    const m = Number(lines[1]);

    const nodes = [];
    const edges = [];

    const adj = Array.from({ length: n + 1 }, () => []);

    for (let i = 1; i <= n; i++) {
        nodes.push({
            id: String(i),
            type: "graphNode",
            position: {
                x: 0,
                y: 0,
            },
            data: { 
                label: String(i),
            },
        });
    }

    for (let i = 0; i < m; i++) {

        const p = lines[i + 2].split(" ");

        const u = p[0];
        const v = p[1];

        const edge = {
            id: `${u}-${v}-${i}`,
            source: u,
            target: v,
            type: "straight",
            animated: false,
            style: {
                strokeWidth: 2,
            },
        };

        if (weighted) {

            edge.label = p[2];

            edge.labelStyle = {
                fontWeight: 700,
                fontSize: 14,
                fill: "#fff",
            };

            edge.labelBgStyle = {
                fill: "#2563eb",
            };

            edge.labelBgPadding = [6, 3];
            edge.labelBgBorderRadius = 6;
        }

        if (directed) {
            edge.markerEnd = {
                type: "arrowclosed",
            };
        }

        if (weighted) {

            adj[Number(u)].push({
                to: Number(v),
                weight: Number(p[2]),
            });

            if (!directed) {

                adj[Number(v)].push({
                    to: Number(u),
                    weight: Number(p[2]),
                });

            }

        } else {

            adj[Number(u)].push({
                to: Number(v),
            });

            if (!directed) {

                adj[Number(v)].push({
                    to: Number(u),
                });

            }

        }

        edges.push(edge);
    }

    const layoutedNodes = layoutGraph(nodes, edges);

    return {
        n,
        nodes: layoutedNodes,
        edges,
        adj,
    };
}