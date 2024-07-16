
class Graph {
    constructor() {
        this.adjacencyList = {};
    }


addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
}
addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
}

bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
        let currentVertex = queue.shift();
        result.push(currentVertex);

        this.adjacencyList[currentVertex].forEach(neighbor => {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
            }
        });
    }
    return result;
}
}

let graph  = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(1,2);
graph.addEdge(1,4);
graph.addEdge(1,3);

console.log(graph.adjacencyList);

function findShortest (g_nodes,g_from,g_to,ids,val){

    let graph = new graph();
    // creating a graph data structure with all the nodes i was given

    for(let i = 0;i <= g_nodes.length; i++){
        graph.addVertex(i);
    }

    // creating edge connections to model the graph data structure i was given

    for(let i  = 0; i<= g_from.length; i++){
        let j = 0;

        graph.addEdge(g_from[i],g_to[j]);

        j++;

    }


    return -1

    return counter
}

// use breath first search to look for the nodes with the color id in the val register.
// return -1 if there is no pair or the single integer representing  the smallest path length.