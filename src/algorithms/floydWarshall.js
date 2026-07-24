export function floydWarshall(graph) {
    const n = graph.adj.length - 1;
    const INF = 1e18;

    const dist = Array.from({ length: n + 1 }, () =>
        Array(n + 1).fill(INF)
    );

    for (let i = 1; i <= n; i++)
        dist[i][i] = 0;

    for (let u = 1; u <= n; u++) {
        for (const e of graph.adj[u]) {
            dist[u][e.to] = Math.min(dist[u][e.to], e.weight);
        }
    }

    const frames = [];

    for (let k = 1; k <= n; k++) {

        frames.push({
            actions: [
                {
                    type: "visitNode",
                    node: k,
                },
            ],

            queue: [`Intermediate ${k}`],

            logs: [`Using node ${k} as intermediate`],

            matrix: dist.map(row => [...row]),
        });

        for (let i = 1; i <= n; i++) {

            if (dist[i][k] === INF)
                continue;

            for (let j = 1; j <= n; j++) {

                if (dist[k][j] === INF)
                    continue;

                const nd = dist[i][k] + dist[k][j];

                if (nd < dist[i][j]) {

                    const old = dist[i][j];

                    dist[i][j] = nd;

                    frames.push({
                        actions: [
                            {
                                type: "visitNode",
                                node: i,
                            },
                            {
                                type: "visitNode",
                                node: k,
                            },
                            {
                                type: "visitNode",
                                node: j,
                            },
                            {
                                type: "visitEdge",
                                from: i,
                                to: k,
                            },
                            {
                                type: "visitEdge",
                                from: k,
                                to: j,
                            },
                        ],

                        queue: [`Intermediate ${k}`],

                        logs: [
                            `Updated ${i} → ${j}: ${old === INF ? "INF" : old
                            } → ${nd} via ${k}`,
                        ],

                        matrix: dist.map(row => [...row]),
                    });
                }
            }
        }
    }

    let neg = false;

    for (let i = 1; i <= n; i++) {
        if (dist[i][i] < 0)
            neg = true;
    }

    frames.push({
        actions: [],
        queue: ["Completed"],
        logs: ["Algorithm Finished"],
        matrix: dist.map(row => [...row]),
    });

    return {
        frames,

        output: [
            {
                label: "Negative Cycle",
                value: neg ? "Yes" : "No",
            },
            {
                label: "Distance Matrix",
                value: dist.slice(1).map(row => row.slice(1)),
            },
        ],
    };
}