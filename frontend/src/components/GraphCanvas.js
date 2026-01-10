import React from 'react';

const GraphCanvas = ({ graph, path, onNodeClick }) => {
    const { cities, adjacencyList } = graph;

    return (
        <svg width="800" height="600" style={{ border: '1px solid #ccc', background: '#f9f9f9' }}>
            {/* Draw Edges */}
            {Object.keys(adjacencyList).map((city) =>
                adjacencyList[city].map((edge, index) => {
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

                    return (
                        <g key={`${city}-${edge.node}-${index}`}>
                            <line
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke={isPathEdge ? 'red' : '#999'}
                                strokeWidth={isPathEdge ? 3 : 1}
                            />
                            <text
                                x={(start.x + end.x) / 2}
                                y={(start.y + end.y) / 2}
                                fill="blue"
                                fontSize="12"
                                dy="-5"
                            >
                                {edge.weight}
                            </text>
                        </g>
                    );
                })
            )}

            {/* Draw Nodes */}
            {Object.keys(cities).map((cityName) => {
                const { x, y } = cities[cityName];
                const isSelected = path && path.includes(cityName);
                return (
                    <g key={cityName} onClick={() => onNodeClick(cityName)} style={{ cursor: 'pointer' }}>
                        <circle
                            cx={x}
                            cy={y}
                            r="20"
                            fill={isSelected ? '#ffcc00' : '#fff'}
                            stroke="#333"
                            strokeWidth="2"
                        />
                        <text x={x} y={y} dy="5" textAnchor="middle" fontSize="14" fontWeight="bold">
                            {cityName}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

export default GraphCanvas;
