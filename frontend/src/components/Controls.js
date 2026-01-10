import React, { useState } from 'react';

const Controls = ({ onAddCity, onAddEdge, onRunDijkstra, onRunAllPaths, onClearPath }) => {
    const [cityName, setCityName] = useState('');
    const [cityX, setCityX] = useState(100);
    const [cityY, setCityY] = useState(100);
    const [edgeFrom, setEdgeFrom] = useState('');
    const [edgeTo, setEdgeTo] = useState('');
    const [edgeWeight, setEdgeWeight] = useState(1);
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');

    const handleAddCity = () => {
        if (cityName) {
            onAddCity(cityName, parseInt(cityX), parseInt(cityY));
            setCityName('');
        }
    };

    const handleAddEdge = () => {
        if (edgeFrom && edgeTo && edgeWeight) {
            onAddEdge(edgeFrom, edgeTo, parseInt(edgeWeight));
            setEdgeFrom('');
            setEdgeTo('');
            setEdgeWeight(1);
        }
    };

    return (
        <div style={{ padding: '20px', borderLeft: '1px solid #ccc', width: '300px' }}>
            <h3>Controls</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>Add City</h4>
                <input placeholder="Name (e.g. A)" value={cityName} onChange={e => setCityName(e.target.value)} />
                <br />
                <input type="number" placeholder="X" value={cityX} onChange={e => setCityX(e.target.value)} style={{ width: '60px' }} />
                <input type="number" placeholder="Y" value={cityY} onChange={e => setCityY(e.target.value)} style={{ width: '60px' }} />
                <br />
                <button onClick={handleAddCity}>Add City</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>Add Edge</h4>
                <input placeholder="From" value={edgeFrom} onChange={e => setEdgeFrom(e.target.value)} style={{ width: '80px' }} />
                <input placeholder="To" value={edgeTo} onChange={e => setEdgeTo(e.target.value)} style={{ width: '80px' }} />
                <input type="number" placeholder="Weight" value={edgeWeight} onChange={e => setEdgeWeight(e.target.value)} style={{ width: '60px' }} />
                <br />
                <button onClick={handleAddEdge}>Add Edge</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>Algorithms</h4>
                <input placeholder="Start" value={startNode} onChange={e => setStartNode(e.target.value)} style={{ width: '80px' }} />
                <input placeholder="End" value={endNode} onChange={e => setEndNode(e.target.value)} style={{ width: '80px' }} />
                <br />
                <button onClick={() => onRunDijkstra(startNode, endNode)}>Shortest Path (Dijkstra)</button>
                <br />
                <button onClick={() => onRunAllPaths(startNode, endNode)}>All Paths</button>
                <br />
                <button onClick={onClearPath}>Clear Path</button>
            </div>
        </div>
    );
};

export default Controls;
