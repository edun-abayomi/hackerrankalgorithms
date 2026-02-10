function createGraph(vertices) {
    return {
        V: vertices, // Number of vertices
        adjList: Array(vertices).fill(null).map(() => []), // Adjacency list
    };
}

function addEdge(graph, u, v) {
    // Add edge between u and v (undirected graph)
    graph.adjList[u].push(v);
    graph.adjList[v].push(u);
}

function dfs(graph, node, visited, recStack, cycles, parent, path, uniqueCycleSignatures) {
    // Mark the current node as visited and add to the recursion stack
    visited[node] = true;
    recStack[node] = true;

    // Explore neighbors
    for (const neighbor of graph.adjList[node]) {
        if (!visited[neighbor]) {
            // Recur for an unvisited neighbor
            dfs(graph, neighbor, visited, recStack, cycles, node, [...path, neighbor], uniqueCycleSignatures);
        } else if (recStack[neighbor] && neighbor!== parent) {
            // Back-edge detected, cycle found!
            const cycleStartIndex = path.indexOf(neighbor);
            if (cycleStartIndex!== -1) {
                const currentCyclePath = [...path.slice(cycleStartIndex), neighbor];

                // Canonical representation to avoid duplicates
                let minNode = Math.min(...currentCyclePath.slice(0, -1));
                let minNodeIndex = currentCyclePath.indexOf(minNode);
                let canonicalCycle = currentCyclePath.slice(minNodeIndex, -1)
                    .concat(currentCyclePath.slice(0, minNodeIndex))
                    .concat(minNode);

                const signatureForward = canonicalCycle.join('-');
                const signatureBackward = [...canonicalCycle.slice(0, -1)].reverse().concat(minNode).join('-');

                if (!uniqueCycleSignatures.has(signatureForward) &&!uniqueCycleSignatures.has(signatureBackward)) {
                    cycles.push(canonicalCycle);
                    uniqueCycleSignatures.add(signatureForward);
                    uniqueCycleSignatures.add(signatureBackward);
                }
            }
        }
    }

    // Remove the current node from the recursion stack
    recStack[node] = false;
}

function findCycles(graph) {
    const visited = new Array(graph.V).fill(false);
    const recStack = new Array(graph.V).fill(false);
    const cycles = [];
    const uniqueCycleSignatures = new Set();

    for (let node = 0; node < graph.V; node++) {
        if (!visited[node]) {
            dfs(graph, node, visited, recStack, cycles, -1, [node], uniqueCycleSignatures);
        }
    }
    return cycles;
}

function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_lib <= c_road ||!cities || cities.length === 0) {
        return c_lib * n;
    }

    const parent = Array.from({ length: n + 1 }, (_, i) => i);
    let numComponents = n;

    function find(i) {
        if (parent[i] === i) {
            return i;
        }
        parent[i] = find(parent[i]);
        return parent[i];
    }

    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI!== rootJ) {
            parent[rootJ] = rootI;
            numComponents--;
        }
    }

    for (const city of cities) {
        // Correcting for 1-based vs 0-based indexing if necessary.
        // The logic seems to use 0-based, so we'll stick to that.
        union(city[0], city[1]);
    }

    // The cost is building one library in each component, and roads for the rest.
    // (numComponents) libraries and (n - numComponents) roads.
    return (numComponents * c_lib) + ((n - numComponents) * c_road);
}

// --- Test Cases ---
console.log("-- custom test case --");
const g6 = createGraph(5);
addEdge(g6, 0, 1);
addEdge(g6, 1, 2);
addEdge(g6, 2, 3);
addEdge(g6, 3, 0); // Cycle: 0-1-2-3-0
addEdge(g6, 1, 3); // Also forms 0-1-3-0
addEdge(g6, 1, 4);
addEdge(g6, 4, 0); // Also forms 0-1-4-0

const cities = [[0, 1], [1, 2], [2, 3], [3, 0], [1, 3], [1, 4], [4, 0]];
const n = 5, c_lib = 3, c_road = 2;
const totalCost = roadsAndLibraries(n, c_lib, c_road, cities);

console.log("Graph 6 Adjacency List:", g6.adjList);
console.log("Found cycles:", findCycles(g6));
console.log(`Total cost for ${n} cities: ${totalCost}`);
console.log("\n");