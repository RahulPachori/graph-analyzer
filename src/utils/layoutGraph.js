import dagre from "@dagrejs/dagre";

const g = new dagre.graphlib.Graph();

g.setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 50;
const NODE_HEIGHT = 50;

export function layoutGraph(nodes, edges, direction = "TB") {
    g.setGraph({
        rankdir: direction,
        nodesep: 60,
        ranksep: 90,
    });

    nodes.forEach((node) => {
        g.setNode(node.id, {
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
        });
    });

    edges.forEach((edge) => {
        g.setEdge(edge.source, edge.target);
    });

    dagre.layout(g);

    return nodes.map((node) => {
        const pos = g.node(node.id);

        return {
            ...node,
            position: {
                x: pos.x - NODE_WIDTH / 2,
                y: pos.y - NODE_HEIGHT / 2,
            },
        };
    });
}