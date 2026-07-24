export function dijkstra(adj, src, dest = null) {

    const n = adj.length;

    const dist = new Array(n).fill(Infinity);

    const pq = [];

    const frames = [];

    dist[src] = 0;

    pq.push({
        node: src,
        dist: 0,
    });

    while (pq.length) {

        pq.sort((a, b) => a.dist - b.dist);

        const cur = pq.shift();

        const u = cur.node;
        const d = cur.dist;

        if (d > dist[u]) continue;

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                }

            ],

            queue: pq.map(x => `${x.node}(${x.dist})`),

            visited: dist
                .map((x, i) => x !== Infinity ? i : null)
                .filter(x => x !== null),

            logs: [
                `Selected node ${u} with distance ${dist[u]}`
            ]

        });

        for (const e of adj[u]) {

            const v = e.to;
            const w = e.weight;

            if (dist[u] + w < dist[v]) {

                dist[v] = dist[u] + w;

                pq.push({

                    node: v,
                    dist: dist[v],

                });

                frames.push({

                    actions: [

                        {
                            type: "visitEdge",
                            from: u,
                            to: v,
                        }

                    ],

                    queue: pq.map(x => `${x.node}(${x.dist})`),

                    visited: dist
                        .map((x, i) => x !== Infinity ? i : null)
                        .filter(x => x !== null),

                    logs: [
                        `Updated distance of ${v} to ${dist[v]}`
                    ]

                });

            }

        }

    }

    const output = [

        {
            label: "Distance Vector",
            value: dist.map(x =>
                x === Infinity ? "∞" : x
            ),
        }

    ];

    if (dest !== null) {

        output.push({

            label: `Distance (${src} → ${dest})`,

            value:
                dist[dest] === Infinity
                    ? "Not Reachable"
                    : dist[dest],

        });

    }

    return {

        frames,

        output,

    };

}