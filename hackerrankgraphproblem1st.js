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
    BFS(ids,val) {
        let visited = new Array(this.node).fill(false);

        // val is the color i am searching for
        let color_i_need = val;

        // the node_color_arr contains the color of each node from 1 to n
        let node_color_arr = ids;


        // here the codes are being checked and
        // passed into a queue.
        for (let i = 0; i < this.node; ++i) {
            if (!visited[i]) {
                let queue = [];
                visited[i] = true;
                queue.push(i);

                /* if on node 1 check ids at index 1 (ids[1]) to see if it is the color_i_need(val)

                 if on node 4 check ids at index 4 (ids[4]) to see if it is the color_i_need (val)

         if on node 0 check ids at index 0 (ids[0]) to see if it is the color_i_need (val)
        if on node 8 check ids at index 8 (ids[0]) to see if it is the color_i_need (val)
       */







                while (queue.length !== 0) {

                    let s = queue.shift();
                    // shift method removes from the first element of the array

                    // this method was written to print out some characters with
                    // the statement below process.stdout.write(s + " ");

                    process.stdout.write(s + " ");
                    // might have to reorder the for loop below to one with a numbered index
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

    let g = new Graph(g_nodes);

 let j = 0;
    for(let i = 0; i < g_from.length; i++){
           g.addEdge(g_from[i],g_to[j]);
        j++;
    }



    console.log("Following is Breadth First Traversal from all unvisited vertices:");
    g.BFS(ids,val);
    console.log(g.adjacencyList);
}


findShortest(4,[0,0,1,2,2,3],[1,2,2,0,3,3],[1,2,3,2],2);
