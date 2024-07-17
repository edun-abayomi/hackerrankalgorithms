
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

// !!! make any mistake you can until there are no more mistakes
// then you have truly understood it
function findShortest (g_nodes,g_from,g_to,ids,val){

    let graph = new Graph();
    // creating a graph data structure with all the nodes i was given

    for(let i = 0;i < g_nodes; i++){
        graph.addVertex(i);
    }

    // creating edge connections to model the graph data structure i was given

    for(let i  = 0; i< g_from.length; i++){
        let j = 0;
        graph.addEdge(g_from[i],g_to[j]);
        j++;
    }
  //
  // graph.bfs(graph.adjacencyList);


    // return -1
    //
    // return counter
}


findShortest(10,[2,3,4,6],[5,4,2,6],[1,2,3,3,2,4,1,1,3,6],2);
