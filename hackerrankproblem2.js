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


    isGraphCyclic(adj_list, current_node, visited, working_stack) {
        if (!visited[current_node]) {
            // mark the current node as visited and part of recursion stack

            visited[current_node] = true;
            working_stack[current_node] = true;

            // Recursive call for all the vertices adjacent to this vertex

            for (const node of adj_list[current_node]) {
                if (!visited[node] && this.isGraphCyclic(adj_list, node, visited, working_stack)) {
                    return true;
                } else if (working_stack[node]) {
                    return true;
                }
            }
        }

        // Remove the vertex from recursion stack
        working_stack[current_node] = false;
        return false;
    }


    // function to detect cycle in a directed graph
    isCyclic(adj_list, vertex) {
        const visited = new Array(vertex).fill(false);
        const working_stack = new Array(vertex).fill(false);

        // call the recursive helper function to detect cycle in different DFS trees

        for (let i = 0; i < vertex; i++) {
            if (!visited[i] && this.isGraphCyclic(adj_list, i, visited, working_stack)) {
                return true;
            }
        }
        return false;
    }


}


const no_of_vertex = 7; // number of vertex in the graph


// {  const adj = Array.from({length: V}, () => []);  } //  a predefined adjacency_list


let g = new Graph(no_of_vertex);

// adding edges to the graph

g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(2, 3);
g.addEdge(3, 3);

// method call
// created a new graph object from the graph class and call the method isCyclic on it (passing two arguments the adjacency_list and the no of vertex)
if (g.isCyclic(g.adjacencyList, no_of_vertex)) {
    console.log("contains cycle");
} else {
    console.log("No cycle");
}
