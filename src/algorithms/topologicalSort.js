export function topologicalSort(adj) {

    const n = adj.length;

    const indeg = new Array(n).fill(0);

    for (let u = 1; u < n; u++) {

        for (const e of adj[u]) {

            indeg[e.to]++;

        }

    }

    const q = [];

    for (let i = 1; i < n; i++) {

        if (indeg[i] === 0) {

            q.push(i);

        }

    }

    const order = [];
    const frames = [];

    while (q.length) {

        frames.push({

            actions: [],

            queue: [...q],

            visited: [...order],

            logs: [
                `Queue: ${q.join(", ")}`
            ],

        });

        const u = q.shift();

        order.push(u);

        frames.push({

            actions: [

                {
                    type: "visitNode",
                    node: u,
                }

            ],

            queue: [...q],

            visited: [...order],

            logs: [
                `Removed ${u} from queue`
            ],

        });

        for (const e of adj[u]) {

            frames.push({

                actions: [

                    {
                        type: "visitEdge",
                        from: u,
                        to: e.to,
                    }

                ],

                queue: [...q],

                visited: [...order],

                logs: [
                    `Decreasing indegree of ${e.to}`
                ],

            });

            indeg[e.to]--;

            if (indeg[e.to] === 0) {

                q.push(e.to);

                frames.push({

                    actions: [],

                    queue: [...q],

                    visited: [...order],

                    logs: [
                        `${e.to} added to queue`
                    ],

                });

            }

        }

    }

    if (order.length !== n - 1) {

        frames.push({

            actions: [],

            queue: [],

            visited: [...order],

            logs: [
                "Cycle detected. Topological ordering does not exist."
            ],

        });

        return {

            frames,

            output: [

                {
                    label: "Result",
                    value: "Cycle Detected",
                }

            ],

        };

    }

    return {

        frames,

        output: [

            {
                label: "Topological Order",
                value: order,
            }

        ],

    };

}