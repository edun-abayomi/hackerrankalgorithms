class Graph {
    constructor(vertex) {
        this.vertex = vertex;
        this.adjacencyList = new Array(vertex).fill(null)
            .map(() => []);
    }

    // Function to add an edge into the graph
    addEdge(v, w) {
        this.adjacencyList[v].push(w);
    }

//     /* when checking the start_node has been visited
//     also check the color of the start_node from the
//     ids array to see if it is the color_i_want (val)
//     when I see the color_i_want two times exit the loop
//     and return the distance counter or -1 if not color
//     was found
//      */

    /* if on node 4 check ids at index 4 (ids[4]) to see if it is the color_i_need (val)
         if on node 0 check ids at index 0 (ids[0]) to see if it is the color_i_need (val)
        if on node 8 check ids at index 8 (ids[0]) to see if it is the color_i_need (val)
       */

//
//
//     const color_i_need = val;
//     const color_arr = ids;
//
//     let color_i_need_count = 0;
//     // when the color_i_need_count is two return the counter
//
//     let distance_counter = 0;
//     /* counting the weight from the  color_i_need at the start to the color
//      I need at the end */
//
//         /* so I have to change the iterative loop to a for loop that iterates from an index 0 to array.length */
//     }
// }

    // Prints BFS traversal from all unvisited vertices
    BFS() {
        let visited = new Array(this.vertex).fill(false);

        for (let i = 0; i < this.vertex; ++i) {
            if (!visited[i]) {
                let queue = [];
                visited[i] = true;
                queue.push(i);

                while (queue.length !== 0) {
                    let s = queue.shift();
                    process.stdout.write(s + " ");
                    for (let n of this.adjacencyList[s]) {
                        if (!visited[n]) {
                            visited[n] = true;
                            queue.push(n);
                        }
                    }
                }
            }
        }
    }
}


function findShortest(g_nodes, g_from, g_to, ids, val) {

    let color_i_need = val;

    // nc is NODE COLOR
    const node_color = ids;

    let g = new Graph(4);

    g.addEdge(0, 1);
    g.addEdge(0, 2);
    g.addEdge(1, 2);
    g.addEdge(2, 0);
    g.addEdge(2, 3);
    g.addEdge(3, 3);

    console.log("Following is Breadth First Traversal from all unvisited vertices:");
    g.BFS();
    console.log(g.adjacencyList);
}


findShortest(10,[2,3,4,6],[5,4,2,6],[1,2,3,3,2,4,1,1,3,6],2);
