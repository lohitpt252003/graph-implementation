class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
    this.cities = {}; // Store city metadata like coordinates
  }

  addCity(name, x, y) {
    if (!this.adjacencyList[name]) {
      this.adjacencyList[name] = [];
      this.cities[name] = { x, y };
      return true;
    }
    return false; // City already exists
  }

  addEdge(city1, city2, weight) {
    if (this.adjacencyList[city1] && this.adjacencyList[city2]) {
      this.adjacencyList[city1].push({ node: city2, weight });
      // For undirected graph, uncomment the next line
      // this.adjacencyList[city2].push({ node: city1, weight });
      return true;
    }
    return false;
  }

  dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // to return at end
    let smallest;

    // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;

      if (smallest === finish) {
        // WE ARE DONE
        // BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            // enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    if (path.length === 0 && start !== finish) return null; // No path found
    return path.concat(smallest).reverse();
  }

  findAllPaths(start, end, path = []) {
    path = [...path, start];
    if (start === end) {
      return [path];
    }
    if (!this.adjacencyList[start]) {
      return [];
    }
    let paths = [];
    for (let neighbor of this.adjacencyList[start]) {
      if (!path.includes(neighbor.node)) {
        let newPaths = this.findAllPaths(neighbor.node, end, path);
        paths.push(...newPaths);
      }
    }
    return paths;
  }
}

export default Graph;
