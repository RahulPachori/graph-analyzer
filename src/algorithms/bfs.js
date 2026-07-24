export function bfs(adj, src) {

    const vis = new Array(adj.length).fill(false);

    const q = [];
    const order = [];
    const frames = [];

    vis[src] = true;
    q.push(src);

    while (q.length) {

        const sz = q.length;

        const visitNodes = [];
        const visitEdges = [];

        for (let i = 0; i < sz; i++) {

            const u = q.shift();

            order.push(u);

            visitNodes.push({
                type: "visitNode",
                node: u,
            });

            for (const e of adj[u]) {

                const v = e.to;

                visitEdges.push({
                    type: "visitEdge",
                    from: u,
                    to: v,
                });

                if (!vis[v]) {

                    vis[v] = true;
                    q.push(v);

                }

            }

        }

        if (visitNodes.length) {

            frames.push({

                actions: visitNodes,

                queue: [...q],

                visited: [...order],

                logs: [
                    `Visiting nodes ${visitNodes.map(x => x.node).join(", ")}`
                ]

            });

        }

        if (visitEdges.length) {

            frames.push({

                actions: visitEdges,

                queue: [...q],

                visited: [...order],

                logs: visitEdges.map(e =>
                    `Exploring edge ${e.from} → ${e.to}`
                )

            });

        }

    }

    return {

        frames,

        output: [

            {
                label: "Traversal",
                value: order,
            }

        ],

    };

}