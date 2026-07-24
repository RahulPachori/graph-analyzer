export function dfs(adj, src) {

    const vis = new Array(adj.length).fill(false);

    const order = [];
    const frames = [];

    const st = [];

    function go(u) {

        st.push(u);

        vis[u] = true;

        order.push(u);

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                }

            ],

            queue: [...st],

            visited: [...order],

            logs: [
                `Visited node ${u}`
            ]

        });

        for (const e of adj[u]) {

            const v = e.to;

            if (vis[v]) continue;

            frames.push({

                actions: [

                    {
                        type: "visitEdge",
                        from: u,
                        to: v,
                    }

                ],

                queue: [...st],

                visited: [...order],

                logs: [
                    `Traversing edge ${u} → ${v}`
                ]

            });

            go(v);

        }

        st.pop();

    }

    go(src);

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