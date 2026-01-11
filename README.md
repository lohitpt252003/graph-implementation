# Interactive Graph Visualization

A powerful and interactive web application for visualizing graph data structures and algorithms. Built with React, this tool allows users to create, manipulate, and explore graphs in real-time.

## 🌟 Features

### 🎨 Interactive Visualization
- **Drag & Drop**: Easily rearrange nodes by dragging them across the infinite canvas.
- **Mouse Placement**: Click anywhere to add new cities (nodes).
- **Curved Edges**: Multiple edges between nodes are automatically curved to avoid overlap, supporting multigraphs.
- **Directional Arrows**: Clear visual distinction between directed and undirected edges.

### 🛠️ Graph Controls
- **Add Cities**: Create nodes with custom names or auto-generated labels.
- **Add Edges**: Connect nodes with weighted edges.
- **Directed/Undirected**: Toggle between directed (one-way) and undirected (two-way) edges.
- **Themes**: Switch between a professional **Light Mode** and a sleek **Dark Mode**.

### 🧮 Algorithms
- **Dijkstra's Algorithm**: Visualize the shortest path between two nodes with path highlighting.
- **Find All Paths**: Discover and list all possible paths between two nodes.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/lohitpt252003/graph-implementation.git
    cd graph-implementation
    ```

2.  **Install Frontend Dependencies**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run the Application**
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

## 📂 Project Structure

-   `frontend/`: React application containing all visualization logic and components.
    -   `src/utils/Graph.js`: Core graph data structure and algorithms.
    -   `src/components/GraphCanvas.js`: SVG-based rendering engine.
    -   `src/components/Controls.js`: UI for user interaction.
-   `backend/`: Minimal Flask backend (currently optional/unused for core graph logic).

## 🎨 Design

The application features a modern, glassmorphism-inspired design with:
-   **Inter** typography for readability.
-   **Infinite Grid** background for spatial context.
-   **Responsive Layout** with a floating sidebar control panel.

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.