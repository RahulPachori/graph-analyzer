export function kruskal(adj) {

    const n = adj.length;

    const edges = [];

    for (let u = 1; u < n; u++) {

        for (const e of adj[u]) {

            if (u < e.to) {

                edges.push({
                    from: u,
                    to: e.to,
                    weight: e.weight,
                });

            }

        }

    }

    edges.sort((a, b) => a.weight - b.weight);

    const parent = new Array(n);
    const sz = new Array(n).fill(1);

    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }

    function find(x) {

        if (parent[x] === x) return x;

        return parent[x] = find(parent[x]);

    }

    function unite(a, b) {

        a = find(a);
        b = find(b);

        if (a === b) return false;

        if (sz[a] < sz[b]) {
            [a, b] = [b, a];
        }

        parent[b] = a;
        sz[a] += sz[b];

        return true;

    }

    const mst = [];
    const frames = [];
    let totalWeight = 0;

    for (const e of edges) {

        const cur = [
            `${e.from} → ${e.to} (${e.weight})`
        ];

        frames.push({

            actions: [

                {
                    type: "visitEdge",
                    from: e.from,
                    to: e.to,
                }

            ],

            mstEdges: [...mst],

            queue: cur,

            visited: [],

            logs: [
                `Checking edge ${e.from} → ${e.to} (weight ${e.weight})`
            ],

        });

        if (unite(e.from, e.to)) {

            mst.push({
                from: e.from,
                to: e.to,
            });

            totalWeight += e.weight;

            frames.push({

                actions: [

                    {
                        type: "visitNode",
                        node: e.from,
                    },

                    {
                        type: "visitNode",
                        node: e.to,
                    },

                    {
                        type: "visitEdge",
                        from: e.from,
                        to: e.to,
                    }

                ],

                mstEdges: [...mst],

                queue: cur,

                visited: [],

                logs: [
                    `Added edge ${e.from} → ${e.to} (weight ${e.weight})`
                ],

            });

        }
        else {

            frames.push({

                actions: [],

                mstEdges: [...mst],

                queue: cur,

                visited: [],

                logs: [
                    `Skipped edge ${e.from} → ${e.to} (cycle detected)`
                ],

            });

        }

    }

    frames.push({

        actions: [],

        mstEdges: [...mst],

        queue: ["Completed"],

        visited: [],

        logs: [
            `Total MST Weight = ${totalWeight}`
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