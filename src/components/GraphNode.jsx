import { Handle, Position } from "@xyflow/react";

function GraphNode({ data }) {
    let cls = "bg-primary text-primary-content";

    if (data.visited)
        cls = "bg-success text-success-content";

    if (data.active)
        cls = "bg-warning text-warning-content scale-110";

    return (
        <>
            <Handle
                type="target"
                position={Position.Top}
                className="opacity-0"
            />

            <div
                className={`
                    relative
                    w-14 h-14
                    rounded-full
                    flex items-center justify-center
                    font-bold text-lg
                    select-none
                    transition-all duration-300
                    shadow-[0_8px_20px_rgba(0,0,0,0.35)]
                    hover:scale-105
                    ${cls}
                `}
            >
                {/* Top Shine */}
                <div
                    className="
                        absolute
                        top-1
                        left-1/2
                        -translate-x-1/2
                        w-8
                        h-3
                        rounded-full
                        bg-white/30
                        blur-[1px]
                    "
                />

                {/* Inner Ring */}
                <div
                    className="
                        absolute
                        inset-[2px]
                        rounded-full
                        border
                        border-white/15
                    "
                />

                {/* Bottom Shadow */}
                <div
                    className="
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-b
                        from-transparent
                        to-black/15
                    "
                />

                {/* Label */}
                <span className="relative z-10">
                    {data.label}
                </span>
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