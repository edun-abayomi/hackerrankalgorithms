// Road and Libraries Algorithmic problem Attempt One
class Graph {
    constructor(vertices) {
        this.V = vertices; // Number of vertices
        this.adjList = Array(vertices).fill().map(() => []); // Adjacency list
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

    findCycles() {
        const visited = new Array(this.V).fill(false);
        const recStack = new Array(this.V).fill(false);
        const cycles = [];
        // No need for a separate set to deduplicate, as the cycles array will store full paths now.
        // We'll just ensure cycles are unique based on their content and direction (starting point).
        const uniqueCycleSignatures = new Set();

        for (let node = 0; node < this.V; node++) {
            // Only start DFS from unvisited nodes, this handles disconnected components
            if (!visited[node]) {
                this.dfs(node, visited, recStack, cycles, -1, [node], uniqueCycleSignatures);
            }
        }
        return cycles;
    }

    dfs(node, visited, recStack, cycles, parent, path, uniqueCycleSignatures) {
        // Mark the current node as visited and add to the recursion stack
        visited[node] = true;
        recStack[node] = true;

        // Explore neighbors
        for (const neighbor of this.adjList[node]) {
            if (!visited[neighbor]) {
                // Recur for an unvisited neighbor
                this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor], uniqueCycleSignatures);
            } else if (recStack[neighbor] && neighbor!== parent) {
                // Back-edge detected, cycle found!
                // 'neighbor' is the node that closes the cycle.
                // 'path' currently holds the nodes from the start of DFS up to 'node'.
                // The cycle starts from 'neighbor' within the current 'path'.

                const cycleStartIndex = path.indexOf(neighbor);
                const currentCyclePath = path.slice(cycleStartIndex); // Path from neighbor to node
                currentCyclePath.push(neighbor); // Close the cycle by adding the neighbor again

                // To avoid duplicate cycles (e.g., [0,1,2,0] and [1,2,0,1]),
                // we need a canonical representation.
                // Find the smallest node in the cycle and rotate the array to start there.
                // Then, choose the direction (e.g., by comparing the second element).
                let canonicalCycle = currentCyclePath;
                let minNode = Math.min(...currentCyclePath.slice(0, -1)); // Exclude the closing node for min check
                let minNodeIndex = currentCyclePath.indexOf(minNode);

                // Rotate the cycle to start with the smallest node
                if (minNodeIndex!== -1) {
                    canonicalCycle = currentCyclePath.slice(minNodeIndex, -1)
                        .concat(currentCyclePath.slice(0, minNodeIndex))
                        .concat(minNode); // Add minNode again to close
                }

                // If two cycles are mirror images (e.g., [0,1,2,0] and [0,2,1,0]),
                // we sort them alphabetically (or numerically) after finding the canonical start.
                // This is a simple way to get a unique signature for undirected graphs.
                const signatureForward = canonicalCycle.join('-');
                const signatureBackward = [...canonicalCycle.slice(0, -1)].reverse().concat(minNode).join('-');

                if (!uniqueCycleSignatures.has(signatureForward) &&!uniqueCycleSignatures.has(signatureBackward)) {
                    cycles.push(canonicalCycle);
                    uniqueCycleSignatures.add(signatureForward);
                    uniqueCycleSignatures.add(signatureBackward); // Add both directions as valid signatures
                }
            }
        }

        // Remove the current node from the recursion stack
        recStack[node] = false;
    }

     roadsAndLibraries(n, c_lib, c_road, cities) {
        let min_cost = 0;
        if(c_lib === c_road){
            min_cost = c_lib * n;
            return min_cost;
        }else if(c_lib < c_road){
            min_cost = c_lib * n;
            return min_cost;
        }else if(c_road < c_lib){
            let newLength = cities.length;
            function foundCycle(){
                newLength = newLength - 1;
            }

            let loopCount = cycles.length ;

            for(let i=1; i<=loopCount; i++){
                foundCycle();
            }

            min_cost = (c_road * newLength) + c_lib;
            return min_cost;
        }

    }
}





console.log("-- custom test case --");
const g0 = new Graph(5);
g0.addEdge(0, 1);
g0.addEdge(1, 2);
g0.addEdge(2, 3);
g0.addEdge(3, 4);
let foundCycles = g0.findCycles();
g0.roadsAndLibraries(5, 2, 1, g0.adjList);
console.log("Graph 0 Adjacency List:", g0.adjList);
console.log("Found cycles:", g0.findCycles());
console.log("\n");

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
g3.addEdge(2, 0); // Cycle 1: 0-1-2-0
g3.addEdge(2, 3);
g3.addEdge(3, 4);
g3.addEdge(4, 2); // Cycle 2: 2-3-4-2
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
g5.addEdge(3, 0); // Cycle: 0-1-2-3-0
g5.addEdge(1, 3); // Also forms 0-1-3-0
g5.addEdge(1, 4);
g5.addEdge(4, 0); // Also forms 0-1-4-0
console.log("Graph 5 Adjacency List:", g5.adjList);
console.log("Found cycles:", g5.findCycles());
console.log("\n")










//   PSEUDOCODE
/*  1) SEARCH for cycles and don't repair a road that creates a cycle
*   2) if the cost of a road is (>) greater than the cost of a library ... build only Libraries
*   3) if the cost of a library is (>) greater than the cost of a road ... build only one library, and the rest should be roads
*   4) to keep the cost low don't repair a road that creates a cycle.
*   5) if the cost of the road is equal to the cost of the library ... build only libraries.
*   */



/*
if the price of road is lower than the price of libraries
	build only one library and repair the roads but don't repair a road that creates a cycle

if the price of library is lower than the price of road,
	build all libraries and no roads

if the price of library 	 and roads is equal,
build all libraries

if you found a cycle don't repair it,
repairing a cycle  will increase the cost


 removing one edge or not repairing one road will stop the cycles */