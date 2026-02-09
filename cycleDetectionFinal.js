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
        const visited = new Array(this.V).fill(false);
        const recStack = new Array(this.V).fill(false);
        const cycles = [];

        for (let node = 0; node < this.V; node++) {
            if (!visited[node]) {
                this.dfs(node, visited, recStack, cycles, -1, [node]);
            }
        }
        return cycles;
    }

    dfs(node, visited, recStack, cycles, parent, path) {
        visited[node] = true;
        recStack[node] = true;

        for (const neighbor of this.adjList[node]) {
            if (!visited[neighbor]) {
                this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor]);
            } else if (recStack[neighbor] && neighbor!== parent) {
                const cycleIndex = path.indexOf(neighbor);
                // To avoid duplicate cycles (like [0,1,2] and [1,2,0]), we'll sort and stringify
                const newCycle = path.slice(cycleIndex).sort().join(',');
                if (!cycles.find(c => c.sort().join(',') === newCycle)) {
                    cycles.push(path.slice(cycleIndex));
                }
            }
        }
        recStack[node] = false;
    }
}

// --- Test Cases ---

// Test 1: A simple graph with one triangle cycle
console.log("--- Test Case 1: Simple Cycle ---");
const g1 = new Graph(3);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 0);
console.log("Graph 1 Adjacency List:", g1.adjList);
console.log("Found cycles:", g1.findCycles());
console.log("\n");

// Test 2: A graph with no cycles (a line)
console.log("--- Test Case 2: No Cycle ---");
const g2 = new Graph(4);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
g2.addEdge(2, 3);
console.log("Graph 2 Adjacency List:", g2.adjList);
console.log("Found cycles:", g2.findCycles());
console.log("\n");

// Test 3: A graph with two distinct cycles
console.log("--- Test Case 3: Multiple Cycles ---");
const g3 = new Graph(5);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
g3.addEdge(2, 0); // Cycle 1
g3.addEdge(2, 3);
g3.addEdge(3, 4);
g3.addEdge(4, 2); // Cycle 2
console.log("Graph 3 Adjacency List:", g3.adjList);
console.log("Found cycles:", g3.findCycles());
console.log("\n");

// Test 4: A disconnected graph with a cycle in one component
console.log("--- Test Case 4: Disconnected Graph with a Cycle ---");
const g4 = new Graph(6);
// Component 1 (with cycle)
g4.addEdge(0, 1);
g4.addEdge(1, 2);
g4.addEdge(2, 0);
// Component 2 (no cycle)
g4.addEdge(3, 4);
g4.addEdge(4, 5);
console.log("Graph 4 Adjacency List:", g4.adjList);
console.log("Found cycles:", g4.findCycles());
console.log("\n");

// Test 5: A more complex graph with overlapping cycles
console.log("--- Test Case 5: Complex Graph ---");
const g5 = new Graph(5);
g5.addEdge(0, 1);
g5.addEdge(1, 2);
g5.addEdge(2, 3);
g5.addEdge(3, 0); // Big cycle 0-1-2-3
g5.addEdge(1, 3); // Inner cycle 0-1-3
g5.addEdge(1, 4);
g5.addEdge(4, 0); // Inner cycle 0-1-4
console.log("Graph 5 Adjacency List:", g5.adjList);
console.log("Found cycles:", g5.findCycles());
console.log("\n");