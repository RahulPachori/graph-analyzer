export function connectedComponents(adj) {

    const n = adj.length;

    const vis = new Array(n).fill(false);

    const frames = [];

    const comps = [];

    const st = [];

    let comp = 0;

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

            visited: [],

            logs: [
                `Visited node ${u} (Component ${comp + 1})`
            ]

        });

        for (const e of adj[u]) {

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
                value: comps.map(c => `{ ${c.join(", ")} }`),
            }

        ],

    };

}