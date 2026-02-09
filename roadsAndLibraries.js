// Road and Libraries Algorithmic problem Attempt One


//   PSEUDOCODE
/*  1) SEARCH for cycles and don't repair a road that creates a cycle
*   2) if the cost of a road is (>) greater than the cost of a library ... build only Libraries
*   3) if the cost of a library is (>) greater than the cost of a road ... build only one library, and the rest should be roads
*
*   */
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

    removeEdge(u, v) {
        // Remove v from u's adjacency list
        this.adjList[u] = this.adjList[u].filter(neighbor => neighbor!== v);
        // Remove u from v's adjacency list
        this.adjList[v] = this.adjList[v].filter(neighbor => neighbor!== u);
    }

    // New removeVertex method
    removeVertex(vertex) {
        if (vertex < 0 || vertex >= this.V) {
            console.error("Invalid vertex");
            return;
        }

        // Remove the vertex's adjacency list
        this.adjList.splice(vertex, 1);
        this.V--; // Decrement the number of vertices

        // Update the rest of the adjacency list
        for (let i = 0; i < this.V; i++) {
            // Remove edges pointing to the old vertex
            this.adjList[i] = this.adjList[i].filter(
                neighbor => neighbor!== vertex
            );

            // Update vertex indices greater than the removed vertex
            this.adjList[i] = this.adjList[i].map(neighbor =>
                neighbor > vertex? neighbor - 1 : neighbor
            );
        }
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
        // Mark the current node as visited and add to the recursion stack
        visited[node] = true;
        recStack[node] = true;

        // Explore neighbors
        for (const neighbor of this.adjList[node]) {
            if (!visited[neighbor]) {
                // Recur for an unvisited neighbor
                this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor]);
            } else if (recStack[neighbor] && neighbor!== parent) {
                // Back-edge detected, cycle found!
                const cycleIndex = path.indexOf(neighbor);
                cycles.push(path.slice(cycleIndex)); // Add cycle to result
            }
        }

        // Remove the current node from the recursion stack
        recStack[node] = false;
    }
}

const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(4, 1);

console.log("Original graph:", g.adjList);
console.log("Original number of vertices:", g.V);

g.removeVertex(2); // Remove vertex 2

console.log("Graph after removing vertex 2:", g.adjList);
console.log("New number of vertices:", g.V);