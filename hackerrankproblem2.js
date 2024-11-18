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


    isGraphCyclic(adj_list, current_node, visited, temp_stack) {
        if (!visited[current_node]) {
            // mark the current node as visited and part of recursion stack

            visited[current_node] = true;
            temp_stack[current_node] = true;

            // Recursive call for all the vertices adjacent to this vertex

            for (const node of adj_list[current_node]) {
                if (!visited[node] && this.isGraphCyclic(adj_list, node, visited, temp_stack)) {
                    return true;
                } else if (temp_stack[node]) {
                    return true;
                }
            }
        }

        // Remove the vertex from recursion stack
        temp_stack[current_node] = false;
        return false;
    }


    // function to detect cycle in a directed graph
    isCyclic(adj_list, vertex) {
        const visited = new Array(vertex).fill(false);
        const temp_stack = new Array(vertex).fill(false);

        // call the recursive helper function to detect cycle in different DFS trees

        for (let i = 0; i < vertex; i++) {
            if (!visited[i] && this.isGraphCyclic(adj_list, i, visited, temp_stack)) {
                return true;
            }
        }
        return false;
    }
}

function minimum_cost(no_of_cities, no_of_libraries, no_of_vertex, u_set, v_set) {
    no_of_vertex = 7; // number of vertex in the graph
// {  const adj = Array.from({length: V}, () => []);  } //  a predefined adjacency_list
    let g = new Graph(no_of_vertex);
// adding edges to the graph

    for (let i = 0; i < u_set.length; i++) {
        g.addEdge(u_set[i], v_set[i]);
    }
// method call
// created a new graph object from the graph class and call the method isCyclic on it (passing two arguments the adjacency_list and the no of vertex)

    /* if the graph is cyclic remove the last edge
    * if the graph is not cyclic perform the arithmetic operations        */
    no_of_cities = 0;
    no_of_libraries = 0;
    let minimum_cost = 0;

    if (g.isCyclic(g.adjacencyList, no_of_vertex)) {
        console.log("A cycle has been detected in this graph");
        console.log("removing last edge from graph...");
        g.adjacencyList.pop(); 
    } else {
        console.log("No cycle");
        console.log("running if_statements and arithmetic operations");

        if (no_of_cities < no_of_libraries) {
            // perform arithmetic operation
            minimum_cost = 0;
        } else if (no_of_cities > no_of_libraries) {
            // perform arithmetic operation
            minimum_cost = 0;
        }
    }
    return minimum_cost;

}