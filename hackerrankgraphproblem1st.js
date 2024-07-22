
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

bfs(start_node,val,ids) {
    const queue = [start_node];

    /* when checking the start_node has been visited
    also check the color of the start_node from the
    ids array to see if it is the color_i_want (val)
    when I see the color_i_want two times exit the loop
    and return the distance counter or -1 if not color
    was found
     */

    const result = [];

    const color_i_need = val;
    const color_arr = ids;

    let color_i_need_count = 0;
    // when the color_i_need_count is two return the counter

    let distance_counter = 0;
    /* counting the weight from the  color_i_need at the start to the color
     I need at the end */
    
    const visited = {};
    visited[start_node] = true;

    while (queue.length !== 0) {
        let currentVertex = queue.shift();
        /* The shift() method removes the first item of an array.
        The shift() method changes the original array.
         The shift() method returns the shifted element.
         */

        result.push(currentVertex);

        /* The push() method adds new items to the end of an array.
         The push() method changes the length of the array.
         */

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

    let color_i_need = val;

    // nc is NODE COLOR
    const node_color = ids;

    // i need some way to represent the node color on the graph nodes
    // val contains the node color of all the nodes

    let graph = new Graph();
    // creating a graph data structure with all the nodes i was given

    for(let i = 0;i < g_nodes; i++){
//
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
    console.log(graph.adjacencyList);
}


findShortest(10,[2,3,4,6],[5,4,2,6],[1,2,3,3,2,4,1,1,3,6],2);
