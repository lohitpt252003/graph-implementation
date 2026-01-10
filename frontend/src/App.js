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

  // Initialize with some data for demo
  useEffect(() => {
    const g = new Graph();
    g.addCity('A', 100, 300);
    g.addCity('B', 300, 100);
    g.addCity('C', 300, 500);
    g.addCity('D', 500, 300);

    g.addEdge('A', 'B', 4);
    g.addEdge('A', 'C', 2);
    g.addEdge('B', 'C', 5);
    g.addEdge('B', 'D', 10);
    g.addEdge('C', 'D', 3);

    setGraph(g);
    setRefresh(prev => prev + 1);
  }, []);

  const handleAddCity = (name, x, y) => {
    if (graph.addCity(name, x, y)) {
      setRefresh(prev => prev + 1);
      setMessage(`City ${name} added.`);
    } else {
      setMessage(`City ${name} already exists.`);
    }
  };

  const handleAddEdge = (from, to, weight) => {
    if (graph.addEdge(from, to, weight)) {
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
    <div className="App" style={{ display: 'flex' }}>
      <GraphCanvas graph={graph} path={path} onNodeClick={handleNodeClick} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Controls
          onAddCity={handleAddCity}
          onAddEdge={handleAddEdge}
          onRunDijkstra={handleRunDijkstra}
          onRunAllPaths={handleRunAllPaths}
          onClearPath={handleClearPath}
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
