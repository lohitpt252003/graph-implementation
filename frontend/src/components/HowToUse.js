import React from 'react';

const HowToUse = ({ onClose }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)'
    };

    const modalStyle = {
        background: 'var(--control-bg)',
        color: 'var(--text-color)',
        padding: '30px',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 10px 30px var(--shadow-color)',
        position: 'relative'
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-color)',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px'
    };

    const sectionStyle = {
        marginBottom: '20px'
    };

    const titleStyle = {
        color: 'var(--accent-color)',
        marginTop: 0,
        marginBottom: '10px'
    };

    return (
        <div style={overlayStyle} onClick={onClose}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                <button style={closeButtonStyle} onClick={onClose}>&times;</button>

                <h2 style={{ ...titleStyle, fontSize: '28px', borderBottom: '2px solid var(--control-border)', paddingBottom: '10px' }}>
                    How to Use
                </h2>

                <div style={sectionStyle}>
                    <h3 style={titleStyle}>1. Adding Cities (Nodes)</h3>
                    <p>
                        <strong>Click anywhere</strong> on the canvas to place a new city.
                        You can also type a name in the "Add City" box first to name it specifically.
                    </p>
                </div>

                <div style={sectionStyle}>
                    <h3 style={titleStyle}>2. Connecting Cities (Edges)</h3>
                    <p>
                        Use the <strong>Add Edge</strong> panel to connect two cities.
                        Enter the names (e.g., "A" to "B"), set a weight (distance/cost), and choose if it's
                        <strong> Directed</strong> (one-way) or <strong>Undirected</strong> (two-way).
                    </p>
                </div>

                <div style={sectionStyle}>
                    <h3 style={titleStyle}>3. Moving Cities</h3>
                    <p>
                        <strong>Drag and Drop</strong> any city to rearrange the graph. The edges will follow automatically!
                    </p>
                </div>

                <div style={sectionStyle}>
                    <h3 style={titleStyle}>4. Running Algorithms</h3>
                    <ul>
                        <li><strong>Shortest Path (Dijkstra)</strong>: Find the quickest route between two cities. The path will be highlighted in <span style={{ color: 'var(--highlight-color)' }}>color</span>.</li>
                        <li><strong>Find All Paths</strong>: Discover all possible routes between two points.</li>
                    </ul>
                </div>

                <div style={sectionStyle}>
                    <p>
                        <em>Tip: Use the Theme Switcher in the top right to toggle between Light and Dark modes!</em>
                    </p>
                </div>

                <div style={{ ...sectionStyle, borderTop: '1px solid var(--control-border)', paddingTop: '20px', textAlign: 'center' }}>
                    <a
                        href="https://github.com/lohitpt252003/graph-implementation"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        ⭐ View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HowToUse;
