import React, { useState } from 'react';

const GraphCanvas = ({ graph, path, onNodeClick, onNodeDrag }) => {
    const { cities, adjacencyList } = graph;
    const [draggingNode, setDraggingNode] = useState(null);

    const handleMouseDown = (e, city) => {
        e.stopPropagation(); // Prevent canvas click
        setDraggingNode(city);
    };

    const handleMouseMove = (e) => {
        if (draggingNode) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.floor(e.clientX - rect.left);
            const y = Math.floor(e.clientY - rect.top);
            onNodeDrag(draggingNode, x, y);
        }
    };

    const handleMouseUp = () => {
        setDraggingNode(null);
    };

    // Helper to count edges between u and v
    const getEdgeCount = (u, v) => {
        let count = 0;
        if (adjacencyList[u]) {
            count += adjacencyList[u].filter(e => e.node === v).length;
        }
        if (adjacencyList[v]) {
            count += adjacencyList[v].filter(e => e.node === u).length;
        }
        return count;
    };

    return (
        <svg
            width="800"
            height="600"
            style={{ border: '1px solid #ccc', background: '#f9f9f9', cursor: draggingNode ? 'grabbing' : 'default' }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#999" />
                </marker>
                <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="28" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="red" />
                </marker>
            </defs>

            {/* Draw Edges */}
            {Object.keys(adjacencyList).map((city) => {
                // Track edges processed to calculate offsets correctly
                // This is a bit tricky in a map. 
                // Simplified approach: Calculate curve based on index in the list + reverse edges
                return adjacencyList[city].map((edge, index) => {
                    const start = cities[city];
                    const end = cities[edge.node];
                    if (!start || !end) return null;

                    const isPath = path && path.includes(city) && path.includes(edge.node);
                    // Simple check if consecutive in path for highlighting
                    let isPathEdge = false;
                    if (path) {
                        for (let i = 0; i < path.length - 1; i++) {
                            if (path[i] === city && path[i + 1] === edge.node) {
                                isPathEdge = true;
                                break;
                            }
                        }
                    }

                    // Calculate Curve
                    // Find how many edges connect these two nodes (in any direction)
                    // And what index this specific edge is.
                    // For simplicity, we'll just use the index in the adjacency list and check for reverse edges

                    // Check if there is a reverse edge (end -> start)
                    const hasReverse = adjacencyList[edge.node] && adjacencyList[edge.node].some(e => e.node === city);

                    // Count how many edges from start->end are BEFORE this one
                    const siblingIndex = index;

                    // Basic curvature logic:
                    // If bidirectional (A->B and B->A exist), curve them away.
                    // If multiple A->B, curve them increasingly.

                    let curvature = 0;
                    if (hasReverse) {
                        curvature = 30 + (siblingIndex * 20);
                    } else {
                        // If multiple edges in same direction, curve them
                        // If it's the first edge and no reverse, straight line (curvature 0)
                        // If subsequent edges, curve
                        if (siblingIndex > 0) {
                            curvature = siblingIndex * 20;
                        }
                    }

                    // Calculate Control Point for Quadratic Bezier
                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;

                    // Normal vector (perpendicular)
                    const dx = end.x - start.x;
                    const dy = end.y - start.y;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const udx = -dy / len;
                    const udy = dx / len;

                    const cpX = midX + udx * curvature;
                    const cpY = midY + udy * curvature;

                    const d = `M${start.x},${start.y} Q${cpX},${cpY} ${end.x},${end.y}`;

                    // Label Position (at the peak of the curve approx)
                    const labelX = (start.x + 2 * cpX + end.x) / 4;
                    const labelY = (start.y + 2 * cpY + end.y) / 4;

                    return (
                        <g key={`${city}-${edge.node}-${index}`}>
                            <path
                                d={d}
                                fill="none"
                                stroke={isPathEdge ? 'red' : '#999'}
                                strokeWidth={isPathEdge ? 3 : 1}
                                markerEnd={isPathEdge ? 'url(#arrow-red)' : 'url(#arrow)'}
                            />
                            <text
                                x={labelX}
                                y={labelY}
                                fill="blue"
                                fontSize="12"
                                dy="-5"
                            >
                                {edge.weight}
                            </text>
                        </g>
                    );
                });
            })}

            {/* Draw Nodes */}
            {Object.keys(cities).map((cityName) => {
                const { x, y } = cities[cityName];
                const isSelected = path && path.includes(cityName);
                return (
                    <g
                        key={cityName}
                        onClick={(e) => { e.stopPropagation(); onNodeClick(cityName); }}
                        onMouseDown={(e) => handleMouseDown(e, cityName)}
                        style={{ cursor: 'grab' }}
                    >
                        <circle
                            cx={x}
                            cy={y}
                            r="20"
                            fill={isSelected ? '#ffcc00' : '#fff'}
                            stroke="#333"
                            strokeWidth="2"
                        />
                        <text x={x} y={y} dy="5" textAnchor="middle" fontSize="14" fontWeight="bold" style={{ userSelect: 'none' }}>
                            {cityName}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default GraphCanvas;
