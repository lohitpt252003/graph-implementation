import React, { useState } from 'react';

const Controls = ({ onAddCity, onAddEdge, onRunDijkstra, onRunAllPaths, onClearPath, cityName, setCityName }) => {
    const [edgeFrom, setEdgeFrom] = useState('');
    const [edgeTo, setEdgeTo] = useState('');
    const [edgeWeight, setEdgeWeight] = useState(1);
    const [isDirected, setIsDirected] = useState(true);
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
        const weight = parseInt(edgeWeight);
        if (edgeFrom && edgeTo && weight > 0) {
            onAddEdge(edgeFrom, edgeTo, weight, isDirected);
            setEdgeFrom('');
            setEdgeTo('');
            setEdgeWeight(1);
            setIsDirected(true);
        } else if (weight <= 0) {
            alert("Weight must be a positive number!");
        }
    };

    const containerStyle = {
        padding: '24px',
        width: '320px',
        background: 'var(--control-bg)',
        color: 'var(--text-color)',
        borderLeft: '1px solid var(--glass-border)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '-4px 0 15px var(--shadow-color)',
        height: '100vh',
        overflowY: 'auto'
    };

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    };

    const headingStyle = {
        margin: '0 0 8px 0',
        fontSize: '18px',
        fontWeight: '600',
        color: 'var(--accent-color)',
        borderBottom: '2px solid var(--control-border)',
        paddingBottom: '8px'
    };

    const inputStyle = {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid var(--control-border)',
        background: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s',
        width: '100%',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        padding: '10px 16px',
        borderRadius: '8px',
        border: 'none',
        background: 'var(--accent-color)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'opacity 0.2s, transform 0.1s',
        boxShadow: '0 2px 4px var(--shadow-color)'
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        background: 'var(--button-bg)',
        color: 'var(--button-text)',
        border: '1px solid var(--control-border)'
    };

    const rowStyle = {
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '24px', fontWeight: '700' }}>Graph Master</h2>

            <div style={sectionStyle}>
                <h4 style={headingStyle}>Add City</h4>
                <input
                    placeholder="City Name (e.g. A)"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                    style={inputStyle}
                />
                <button onClick={handleAddCity} style={buttonStyle}>Add City</button>
            </div>

            <div style={sectionStyle}>
                <h4 style={headingStyle}>Add Edge</h4>
                <div style={rowStyle}>
                    <input placeholder="From" value={edgeFrom} onChange={e => setEdgeFrom(e.target.value)} style={inputStyle} />
                    <input placeholder="To" value={edgeTo} onChange={e => setEdgeTo(e.target.value)} style={inputStyle} />
                </div>
                <div style={rowStyle}>
                    <input type="number" placeholder="Weight" value={edgeWeight} onChange={e => setEdgeWeight(e.target.value)} style={inputStyle} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={isDirected} onChange={e => setIsDirected(e.target.checked)} />
                        Directed
                    </label>
                </div>
                <button onClick={handleAddEdge} style={buttonStyle}>Add Edge</button>
            </div>

            <div style={sectionStyle}>
                <h4 style={headingStyle}>Algorithms</h4>
                <div style={rowStyle}>
                    <input placeholder="Start" value={startNode} onChange={e => setStartNode(e.target.value)} style={inputStyle} />
                    <input placeholder="End" value={endNode} onChange={e => setEndNode(e.target.value)} style={inputStyle} />
                </div>
                <button onClick={() => onRunDijkstra(startNode, endNode)} style={secondaryButtonStyle}>Shortest Path (Dijkstra)</button>
                <button onClick={() => onRunAllPaths(startNode, endNode)} style={secondaryButtonStyle}>Find All Paths</button>
                <button onClick={onClearPath} style={{ ...secondaryButtonStyle, color: '#ff4444', borderColor: '#ff4444' }}>Clear Visualization</button>
            </div>
        </div>
    );
};

export default Controls;
