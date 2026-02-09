class Graph {
    constructor(vertices) {
        this.V = vertices; // Number of vertices
        this.adjList = Array(vertices).fill().map(() => []); // Adjacency list
    }

    addEdge(u, v) {
        // Add edge between u and v (undirected graph)
        this.adjList[u].push(v);
        this.adjList[v].push(u);
    }

    findCycles() {
        const visited = new Array(this.V).fill(false); // Track visited vertices
        const recStack = new Array(this.V).fill(false); // Track vertices in recursion stack
        const cycles = []; // Store detected cycles

        // Iterate over all vertices
        for (let node = 0; node < this.V; node++) {
            if (!visited[node]) {
                // Start DFS traversal from unvisited node
                this.dfs(node, visited, recStack, cycles, -1, [node]);
            }
        }

        return cycles;
    }

    dfs(node, visited, recStack, cycles, parent, path) {
        // Mark current node as visited and add to recursion stack
        visited[node] = true;
        recStack[node] = true;

        // Explore neighbors
        for (const neighbor of this.adjList[node]) {
            if (!visited[neighbor]) {
                // Recur for unvisited neighbor
                this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor]);
            } else if (recStack[neighbor] && neighbor !== parent) {
                // Back edge detected, cycle found!
                const cycleIndex = path.indexOf(neighbor);
                cycles.push(path.slice(cycleIndex)); // Add cycle to result
            }
        }

        // Remove current node from recursion stack
        recStack[node] = false;
    }
}
