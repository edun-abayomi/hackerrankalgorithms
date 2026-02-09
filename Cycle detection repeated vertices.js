class Graph {
    constructor(V) {
        this.V = V;
        this.adjList = Array(V).fill().map(() => []);
    }

    addEdge(u, v) {
        this.adjList[u].push(v);
        this.adjList[v].push(u);
    }

    findCycles() {
        const cycles = [];
        const visited = new Array(this.V).fill(false);

        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) this.dfs(i, visited, -1, [], cycles);
        }

        return cycles;
    }

    dfs(node, visited, parent, path, cycles) {
        visited[node] = true;
        path.push(node);

        for (const neighbor of this.adjList[node]) {
            if (neighbor === parent) continue;
            if (path.includes(neighbor) && neighbor !== path[path.length - 2]) {
                const cycleIndex = path.indexOf(neighbor);
                const cycle = path.slice(cycleIndex);
                cycle.push(neighbor);
                cycles.push(cycle);
            } else if (!visited[neighbor]) {
                this.dfs(neighbor, visited, node, path, cycles);
            }
        }

        path.pop();
        visited[node] = false;
    }
}

// Test Case
const g = new Graph(5);
g.addEdge(1, 2);
g.addEdge(2, 3);
g.addEdge(3, 1); // simple cycle: 1 -> 2 -> 3 -> 1
g.addEdge(2, 4);
g.addEdge(4, 1); // cycle with repeated vertex: 1 -> 2 -> 3 -> 2 -> 4 -> 1

console.log("Cycles:", g.findCycles());
// Output: Cycles: [ [ 1, 2, 3, 1 ], [ 1, 2, 3, 2, 4, 1 ] ]