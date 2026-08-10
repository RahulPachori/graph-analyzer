export function applyFrame(frame) {

    const activeNodes = [];
    const activeEdges = [];

    frame.actions.forEach((action) => {

        if (action.type === "visitNode") {

            activeNodes.push(action.node);

        }

        if (action.type === "visitEdge") {

            activeEdges.push({
                from: action.from,
                to: action.to,
            });

        }

    });

    return {
        activeNodes,
        activeEdges,
        mstEdges: frame.mstEdges || [],
        matrix: frame.matrix || [],
    };

}




