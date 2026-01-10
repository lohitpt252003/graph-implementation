import React, { useState } from 'react';

const Controls = ({ onAddCity, onAddEdge, onRunDijkstra, onRunAllPaths, onClearPath }) => {
    const [cityName, setCityName] = useState('');
    const [edgeFrom, setEdgeFrom] = useState('');
    const [edgeTo, setEdgeTo] = useState('');
    const [edgeWeight, setEdgeWeight] = useState(1);
    const [startNode, setStartNode] = useState('');
    const [endNode, setEndNode] = useState('');

    const handleAddCity = () => {
        if (cityName) {
            const randomX = Math.floor(Math.random() * 700) + 50;
            const randomY = Math.floor(Math.random() * 500) + 50;
            onAddCity(cityName, randomX, randomY);
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
                <input placeholder="Name" value={cityName} onChange={e => setCityName(e.target.value)} />
                <br />
                <button onClick={handleAddCity} style={{ marginTop: '5px' }}>Add City</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>Add Edge</h4>
                <input placeholder="From" value={edgeFrom} onChange={e => setEdgeFrom(e.target.value)} style={{ width: '80px' }} />
                <input placeholder="To" value={edgeTo} onChange={e => setEdgeTo(e.target.value)} style={{ width: '80px' }} />
                <div style={{ marginTop: '5px' }}>
                    <label>Weight: <input type="number" placeholder="Weight" value={edgeWeight} onChange={e => setEdgeWeight(e.target.value)} style={{ width: '60px' }} /></label>
                </div>
                <button onClick={handleAddEdge} style={{ marginTop: '5px' }}>Add Edge</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h4>Algorithms</h4>
                <input placeholder="Start" value={startNode} onChange={e => setStartNode(e.target.value)} style={{ width: '80px' }} />
                <input placeholder="End" value={endNode} onChange={e => setEndNode(e.target.value)} style={{ width: '80px' }} />
                <br />
                <button onClick={() => onRunDijkstra(startNode, endNode)} style={{ marginTop: '5px' }}>Shortest Path (Dijkstra)</button>
                <br />
                <button onClick={() => onRunAllPaths(startNode, endNode)} style={{ marginTop: '5px' }}>All Paths</button>
                <br />
                <button onClick={onClearPath} style={{ marginTop: '5px' }}>Clear Path</button>
            </div>
        </div>
    );
};

export default Controls;
