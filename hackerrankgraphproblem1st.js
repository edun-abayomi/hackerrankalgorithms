class Graph {
    constructor(node) {
        this.node = node;
        this.adjacencyList = new Array(node).fill(null)
            .map(() => []);
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
        this.adjacencyList[v].push(w);
    }

    /* if on node 4 check ids at index 4 (ids[4]) to see if it is the color_i_need (val)
     if on node 0 check ids at index 0 (ids[0]) to see if it is the color_i_need (val)
    if on node 8 check ids at index 8 (ids[0]) to see if it is the color_i_need (val)
   */
// }
    // Prints BFS traversal from all unvisited vertices
    BFS(ids, val) {
        let visited = new Array(this.node).fill(false);
        let color_i_need_count = 0;
//     // when the color_i_need_count is two return the counter
//
        let distance_counter = 0;
        // here the codes are being checked and
        // passed into a queue.
        for (let index = 0; index < this.node; index++) {
            if (!visited[index]) {
                let queue = [];
                visited[index] = true;
                queue.push(index);
                /* if on node 1          check ids at index 1 (ids[1]) to see if it is the color_i_need(val)
                 if on node 4 check ids at index 4 (ids[4]) to see if it is the color_i_need (val)
         if on node 0 check ids at index 0 (ids[0]) to see if it is the color_i_need (val)
        if on node 8 check ids at index 8 (ids[0]) to see if it is the color_i_need (val)
       */
                while (queue.length !== 0) {
                    let vertex = queue.shift();
                    // shift method removes from the first element of the array
                    // it is printing out and marking the node as
                    // visited in (this.adjacencyList[s]) below
                    // might have to reorder the for loop below to one with a numbered index
                    // marking the vertex as visited so that i don't get lost in the maze
                    for (let node of this.adjacencyList[vertex]) {
                        if (!visited[node]) {
                            visited[node] = true;
                            queue.push(node);
                            if (val === ids[node]) {
                                color_i_need_count++;
                                // when the color_i_need_count is 2 exit and return the distance counter
                                distance_counter++;
                                // if color_i_need_count is greater than one return distance counter
                                console.log(distance_counter);
                            } else {
                                distance_counter = -1;
                                console.log(distance_counter);
                                return distance_counter
                            }
                            if (color_i_need_count === 2) {
                                // that means matching colors have been found
                                return distance_counter;
                            } else if (color_i_need_count === 0) {
                                distance_counter = -1;
                                return distance_counter;
                            }
                        }
                    }
                }
                console.log(distance_counter);
                return distance_counter;
            }
        }
    }
}


function findShortest(g_nodes, g_from, g_to, ids, val) {
    let g = new Graph(g_nodes);
    let j = 0;
    for (let i = 0; i < g_from.length; i++) {
        g.addEdge(g_from[i], g_to[j]);
        j++;
    }
    g.BFS(ids, val);
}


findShortest(4, [0, 0, 1, 2, 2, 3], [1, 2, 2, 0, 3, 3], [1, 6, 3, 4], 2);
