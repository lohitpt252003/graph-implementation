# Graph Visualization Frontend

This directory contains the React-based frontend for the Graph Visualization project. It handles all the rendering, user interaction, and graph algorithmic logic.

## 🏗️ Architecture

The application is built using a component-based architecture:

### Core Components

-   **`App.js`**: The main container that manages the global state (graph data, theme, messages) and layout.
-   **`GraphCanvas.js`**: A sophisticated SVG renderer that handles:
    -   Node rendering and dragging logic.
    -   Edge rendering with Bezier curves for multigraph support.
    -   Path highlighting for algorithm results.
    -   Grid background and responsive scaling.
-   **`Controls.js`**: A sidebar component providing user inputs for:
    -   Adding cities and edges.
    -   Running algorithms (Dijkstra, All Paths).
    -   Toggling themes and clearing the canvas.

### Data Structure (`src/utils/Graph.js`)

The `Graph` class is the backbone of the application, implementing:
-   **Adjacency List**: Efficient storage for the graph.
-   **Dijkstra's Algorithm**: Priority queue-based implementation for shortest path finding.
-   **DFS/Backtracking**: For finding all possible paths between nodes.

## 🎨 Styling

The application uses a custom CSS variable system for theming:
-   `index.css`: Global styles and typography (Inter font).
-   `light.css`: Variables for the Light theme (Clean, Professional).
-   `dark.css`: Variables for the Dark theme (High contrast, Neon accents).

## 🛠️ Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
