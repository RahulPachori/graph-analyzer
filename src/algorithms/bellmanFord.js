export function bellmanFord(adj, src, dest = null) {
    console.log(src);
    console.log(adj[1]);

    const n = adj.length;

    const dist = new Array(n).fill(Infinity);

    const frames = [];

    dist[src] = 0;

    const edges = [];

    for (let u = 1; u < n; u++) {

        for (const e of adj[u]) {

            edges.push({
                from: u,
                to: e.to,
                weight: e.weight,
            });

        }

    }

    for (let i = 1; i <= n - 1; i++) {

        let updated = false;

        for (const e of edges) {

            frames.push({

                actions: [

                    {
                        type: "visitEdge",
                        from: e.from,
                        to: e.to,
                    }

                ],

                queue: [`Pass ${i}`],

                visited: dist
                    .map((x, j) => x !== Infinity ? j : null)
                    .filter(x => x !== null),

                logs: [
                    `Checking edge ${e.from} → ${e.to} (${e.weight})`
                ],

            });

            if (
                dist[e.from] !== Infinity &&
                dist[e.from] + e.weight < dist[e.to]
            ) {

                dist[e.to] = dist[e.from] + e.weight;

                updated = true;

                frames.push({

                    actions: [

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

                    queue: [`Pass ${i}`],

                    visited: dist
                        .map((x, j) => x !== Infinity ? j : null)
                        .filter(x => x !== null),

                    logs: [
                        `Updated distance of ${e.to} to ${dist[e.to]}`
                    ],

                });

            }

        }

        if (!updated) {

            frames.push({

                actions: [],

                queue: [],

                visited: dist
                    .map((x, j) => x !== Infinity ? j : null)
                    .filter(x => x !== null),

                logs: [
                    "No updates in this pass. Algorithm terminated early."
                ],

            });

            break;

        }

    }

    let neg = false;

    for (const e of edges) {

        if (
            dist[e.from] !== Infinity &&
            dist[e.from] + e.weight < dist[e.to]
        ) {

            neg = true;

            frames.push({

                actions: [

                    {
                        type: "visitEdge",
                        from: e.from,
                        to: e.to,
                    }

                ],

                queue: [],

                visited: dist
                    .map((x, j) => x !== Infinity ? j : null)
                    .filter(x => x !== null),

                logs: [
                    "Negative weight cycle detected!"
                ],

            });

            break;

        }

    }

    const output = [

        {
            label: "Distance Vector",
            value: dist.map(x => x === Infinity ? "∞" : x),
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

    output.push({

        label: "Negative Cycle",

        value: neg ? "Yes" : "No",

    });

    return {

        frames,

        output,

    };

}