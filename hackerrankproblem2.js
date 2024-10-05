/* hacker rank second question
build libraries and roads
give all citizens of hacker land access to a library
with the minimum cost */

class Graph {
    constructor(node) {
        this.node = node;
        this.adjacencyList = new Array(node).fill(null).map(() => []);
        // hashmap data structure that holds the graph data.
    }

    addEdge(u, v) {
        this.adjacencyList[u].push(v);
        // method to add vertex to the graph
    }

    // utility function to detect cycle in a directed graph


    isCyclicUtil(adj, u, visited, recStack) {
        if (!visited[u]) {
            // mark the current node as visited and part of recursion stack

            visited[u] = true;
            recStack[u] = true;

            // Recur for all the vertices adjacent to this vertex

            for (const x of adj[u]) {
                if (!visited[x] && this.isCyclicUtil(adj, x, visited, recStack)) {
                    return true;
                } else if (recStack[x]) {
                    return true;
                }
            }
        }

        // Remove the vertex from recursion stack
        recStack[u] = false;
        return false;
    }



    // function to detect cycle in a directed graph
    isCyclic(adj,V){
        const visited = new Array(V).fill(false);
        const recStack = new Array(V).fill(false);

        // call the recursive helper function to detect cycle in different DFS trees

        for(let i = 0; i < V; i++){
            if(!visited[i] && this.isCyclicUtil(adj,i,visited,recStack)){
                return true;
            }
        }
        return false;
    }

    // example usage

}
