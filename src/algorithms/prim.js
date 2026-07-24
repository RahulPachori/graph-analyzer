export function prim(adj, src) {

    const n = adj.length;

    const vis = new Array(n).fill(false);

    const pq = [];

    const mst = [];

    const frames = [];

    let totalWeight = 0;

    pq.push({
        node: src,
        parent: -1,
        weight: 0,
    });

    while (pq.length) {

        pq.sort((a, b) => a.weight - b.weight);

        const cur = pq.shift();

        const u = cur.node;

        if (vis[u]) continue;

        vis[u] = true;

        if (cur.parent !== -1) {

            mst.push({
                from: cur.parent,
                to: u,
            });

            totalWeight += cur.weight;

        }

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                },

                ...(cur.parent === -1
                    ? []
                    : [
                        {
                            type: "visitEdge",
                            from: cur.parent,
                            to: u,
                        },
                    ]),

            ],

            mstEdges: [...mst],

            queue: pq.map(x => `${x.node}(${x.weight})`),

            visited: vis
                .map((x, i) => x ? i : null)
                .filter(x => x !== null),

            logs:
                cur.parent === -1
                    ? [`Started Prim's Algorithm from node ${u}`]
                    : [`Added edge ${cur.parent} → ${u} (weight ${cur.weight})`],

        });

        for (const e of adj[u]) {

            if (!vis[e.to]) {

                pq.push({

                    node: e.to,
                    parent: u,
                    weight: e.weight,

                });

            }

        }

    }

    const allVisited = [];

    for (let i = 1; i < n; i++) {

        allVisited.push(i);

    }

    frames.push({

        actions: [],

        mstEdges: [...mst],

        queue: [],

        visited: allVisited,

        logs: [
            `Total MST Weight = ${totalWeight}`,
        ],

    });

    return {

        frames,

        output: [

            {
                label: "MST Weight",
                value: totalWeight,
            },

            {
                label: "MST Edges",
                value: mst.map(e => `(${e.from}, ${e.to})`),
            },

        ],

    };

}