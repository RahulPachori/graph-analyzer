import { Handle, Position } from "@xyflow/react";

function GraphNode({ data }) {
    let cls = "bg-primary text-primary-content";

    if (data.visited)
        cls = "bg-success text-success-content";

    if (data.active)
        cls = "bg-warning text-warning-content scale-125";

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                className="opacity-0"
            />

            <div
                className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-lg font-bold transition-all duration-300 ${cls}`}
            >
                {data.label}
            </div>
            
            <Handle
                type="source"
                position={Position.Bottom}
                className="opacity-0"
            />
        </>
    );
}

export default GraphNode;