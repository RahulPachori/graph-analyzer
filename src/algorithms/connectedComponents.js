export function connectedComponents(adj, directed) {

    const n = adj.length;

    const vis = new Array(n).fill(false);

    const frames = [];

    const comps = [];

    const st = [];

    let comp = 0;

    frames.push({
        actions: [],
        queue: [],
        visited: [],
        logs: [
            directed
                ? "Graph is directed. Ignoring edge directions and finding connected components."
                : "Graph is undirected. Using DFS to find connected components."
        ]
    });

    let g = adj;

    if (directed) {

        g = Array.from({ length: n }, () => []);

        for (let u = 1; u < n; u++) {

            for (const e of adj[u]) {

                const v = e.to;

                g[u].push({
                    to: v
                });

                g[v].push({
                    to: u
                });
            }
        }
    }

    function dfs(u) {

        vis[u] = true;

        st.push(u);

        comps[comp].push(u);

        frames.push({
            actions: [
                {
                    type: "visitNode",
                    node: u,
                }
            ],

            queue: [...st],

            visited: [...comps[comp]],

            logs: [
                `Visited node ${u} (Component ${comp + 1})`
            ]
        });

        for (const e of g[u]) {

            const v = e.to;

            frames.push({
                actions: [
                    {
                        type: "visitEdge",
                        from: u,
                        to: v,
                    }
                ],

                queue: [...st],

                visited: [...comps[comp]],

                logs: [
                    `Traversing edge ${u} — ${v}`
                ]
            });

            if (!vis[v]) {
                dfs(v);
            }
        }

        st.pop();
    }

    for (let i = 1; i < n; i++) {

        if (!vis[i]) {

            comps.push([]);

            frames.push({
                actions: [],
                queue: [],
                visited: [],
                logs: [
                    `Starting Component ${comp + 1}`
                ]
            });

            dfs(i);

            comp++;
        }
    }

    return {

        frames,

        output: [

            {
                label: "Number of Components",
                value: comps.length,
            },

            {
                label: "Components",
                value: comps.map(
                    c => `{ ${c.join(", ")} }`
                ),
            }

        ],

    };
}