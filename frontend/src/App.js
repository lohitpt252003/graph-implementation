import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Graph from './utils/Graph';
import GraphCanvas from './components/GraphCanvas';
import Controls from './components/Controls';

function App() {
  const [graph, setGraph] = useState(new Graph());
  const [path, setPath] = useState(null);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0); // To force re-render on graph updates
  const [cityName, setCityName] = useState(''); // Lifted state
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Initialize with some data for demo
  // Initialize with empty graph
  useEffect(() => {
    setGraph(new Graph());
  }, []);

  const handleAddCity = (name, x, y) => {
    if (graph.addCity(name, x, y)) {
      setRefresh(prev => prev + 1);
      setMessage(`City ${name} added.`);
      return true;
    } else {
      setMessage(`City ${name} already exists.`);
      return false;
    }
  };

  const handleCanvasClick = (e) => {
    // Calculate coordinates relative to the SVG
    const rect = e.target.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    let nameToAdd = cityName;
    if (!nameToAdd) {
      // Auto-generate name if empty
      const existing = Object.keys(graph.cities).length;
      nameToAdd = String.fromCharCode(65 + existing); // A, B, C...
      if (graph.cities[nameToAdd]) {
        // Fallback if collision
        nameToAdd = `Node${existing + 1}`;
      }
    }

    if (handleAddCity(nameToAdd, x, y)) {
      setCityName(''); // Clear input after successful add
    }
  };

  const handleNodeDrag = (name, x, y) => {
    if (graph.updateCityPosition(name, x, y)) {
      setRefresh(prev => prev + 1);
    }
  };

  const handleAddEdge = (from, to, weight, isDirected) => {
    if (graph.addEdge(from, to, weight, isDirected)) {
      setRefresh(prev => prev + 1);
      setMessage(`Edge ${from}-${to} added.`);
    } else {
      setMessage(`Failed to add edge. Check if cities exist.`);
    }
  };

  const handleRunDijkstra = (start, end) => {
    const result = graph.dijkstra(start, end);
    if (result) {
      setPath(result);
      setMessage(`Shortest Path: ${result.join(' -> ')}`);
    } else {
      setPath(null);
      setMessage('No path found.');
    }
  };

  const handleRunAllPaths = (start, end) => {
    const paths = graph.findAllPaths(start, end);
    if (paths.length > 0) {
      setMessage(`All Paths:\n${paths.map(p => p.join('->')).join('\n')}`);
      // Visualize the first path or handle differently? 
      // For now, just show the first one on canvas
      setPath(paths[0]);
    } else {
      setMessage('No paths found.');
      setPath(null);
    }
  };

  const handleClearPath = () => {
    setPath(null);
    setMessage('');
  };

  const handleNodeClick = (city) => {
    setMessage(`Clicked on ${city}`);
  };

  return (
    <div className={`App ${theme}-theme`} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      <div onClick={handleCanvasClick} style={{ display: 'inline-block' }}>
        <GraphCanvas graph={graph} path={path} onNodeClick={handleNodeClick} onNodeDrag={handleNodeDrag} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={toggleTheme} style={{ margin: '10px', padding: '5px' }}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <Controls
          onAddCity={handleAddCity}
          onAddEdge={handleAddEdge}
          onRunDijkstra={handleRunDijkstra}
          onRunAllPaths={handleRunAllPaths}
          onClearPath={handleClearPath}
          cityName={cityName}
          setCityName={setCityName}
        />
        <div style={{ padding: '20px', whiteSpace: 'pre-wrap' }}>
          <h4>Status/Output:</h4>
          {message}
        </div>
      </div>
    </div>
  );
}

export default App;
