export function cycleDetection(adj, directed) {

    if (directed) {
        return directedCycle(adj);
    }

    return undirectedCycle(adj);
}

function undirectedCycle(adj) {

    const n = adj.length;

    const vis = new Array(n).fill(false);

    const st = [];
    const frames = [];

    let found = false;

    frames.push({
        actions: [],
        queue: [],
        visited: [],
        logs: [
            "Using DFS with parent tracking for undirected cycle detection."
        ]
    });

    function dfs(u, p) {

        if (found) return;

        vis[u] = true;
        st.push(u);

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                }

            ],

            queue: [...st],

            visited: [],

            logs: [
                `Visited node ${u}`
            ]

        });

        for (const e of adj[u]) {

            if (found) return;

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

                visited: [],

                logs: [
                    `Traversing edge ${u} → ${v}`
                ]

            });

            if (!vis[v]) {

                dfs(v, u);

            }
            else if (v !== p) {

                found = true;

                frames.push({

                    actions: [

                        {
                            type: "visitEdge",
                            from: u,
                            to: v,
                        }

                    ],

                    queue: [...st],

                    visited: [],

                    logs: [
                        `Cycle detected through edge ${u} → ${v}`
                    ]

                });

                return;

            }

        }

        st.pop();

    }

    for (let i = 1; i < n && !found; i++) {

        if (!vis[i]) {

            dfs(i, -1);

        }

    }

    return {

        frames,

        output: [

            {
                label: "Cycle Exists",
                value: found ? "Yes" : "No",
            }

        ],

    };

}

function directedCycle(adj) {

    const n = adj.length;

    const vis = new Array(n).fill(false);
    const inStack = new Array(n).fill(false);

    const st = [];
    const frames = [];

    let found = false;

    frames.push({
        actions: [],
        queue: [],
        visited: [],
        logs: [
            "Using DFS with recursion stack for directed cycle detection."
        ]
    });

    function dfs(u) {

        if (found) return;

        vis[u] = true;
        inStack[u] = true;
        st.push(u);

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                }

            ],

            queue: [...st],

            visited: [],

            logs: [
                `Visited node ${u}`
            ]

        });

        for (const e of adj[u]) {

            if (found) return;

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

                visited: [],

                logs: [
                    `Traversing edge ${u} → ${v}`
                ]

            });

            if (!vis[v]) {

                dfs(v);

            }
            else if (inStack[v]) {

                found = true;

                frames.push({

                    actions: [

                        {
                            type: "visitEdge",
                            from: u,
                            to: v,
                        }

                    ],

                    queue: [...st],

                    visited: [],

                    logs: [
                        `Cycle detected through edge ${u} → ${v}`
                    ]

                });

                return;

            }

        }

        st.pop();
        inStack[u] = false;

    }

    for (let i = 1; i < n && !found; i++) {

        if (!vis[i]) {

            dfs(i);

        }

    }

    return {

        frames,

        output: [

            {
                label: "Cycle Exists",
                value: found ? "Yes" : "No",
            }

        ],

    };

}