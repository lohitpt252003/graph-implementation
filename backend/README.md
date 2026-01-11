# Graph Visualization Backend

This directory contains a minimal Flask backend for the Graph Visualization project.

> **Note**: The current version of the application runs entirely on the frontend (Client-Side). This backend is set up for potential future features such as:
> - Persisting graph data to a database.
> - Running complex algorithms on the server.
> - User authentication.

## 🚀 Running the Backend

1.  **Create a virtual environment**
    ```bash
    python -m venv venv
    ```

2.  **Activate the virtual environment**
    -   Windows: `venv\Scripts\activate`
    -   Mac/Linux: `source venv/bin/activate`

3.  **Install dependencies**
    ```bash
    pip install flask flask-cors
    ```

4.  **Run the server**
    ```bash
    python app.py
    ```
    The server will start at `http://localhost:5000`.
