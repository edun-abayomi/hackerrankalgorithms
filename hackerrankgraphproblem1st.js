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

findShortest(4, [1,1,4], [2,3,2], [1, 2, 1, 1], 1);

//
// // __------------_______----------- Graph Implementation with functions-------___________________________________________
// // Define the structure for an adjacency list node
// function AdjListNode {
//     var dest;
//     var  next;
// }
// // Define the structure for an adjacency list
// function AdjList {
//     var  head;
// }
// // Define the structure for a graph
// const Graph {
//     var V; // vertex
//     var array; // adjacencyList
// }
// // Function to create a new adjacency list node
// function newAdjListNode(dest)
// {
//     var newNode
//     // = (struct AdjListNode*)malloc(
//     // sizeof(struct AdjListNode));
//     // newNode->dest = dest;
//     // newNode->next = NULL;
//     // return newNode;
// }
// // Function to create a graph of V vertices
// function createGraph(v)
// {
//     var graph
//     // = (struct Graph*)malloc(sizeof(struct Graph));
//     // graph->V = V;
//     // graph->array = (struct AdjList*)malloc(
//     // V * sizeof(struct AdjList));
//     for (var i = 0; i < V; ++i)
//     graph.array[i].head = NULL;
//     return graph;
// }
// // Function to add an edge to an undirected graph
// function  addEdge(graph, src, dest)
// {
//     // Add an edge from src to dest
//     var newNode = newAdjListNode(dest);
//     newNode.next = graph.array[src].head;
//     graph.array[src].head = newNode;
//
//     // Since graph is undirected, add an edge from dest to
//     // src also
//     newNode = newAdjListNode(src);
//     newNode.next = graph.array[dest].head;
//     graph.array[dest].head = newNode;
// }
// // Function to delete an edge from an undirected graph
// function deleteEdge(graph, src, dest)
// {
//     // var temp = graph->array[src].head;
//     var prev = NULL;
//
//     // Find and remove the node from the adjacency list of
//     // src
//     while (temp !== NULL && temp.dest !== dest) {
//     prev = temp;
//     temp = temp.next;
// }
//     if (temp !== NULL) {
//         if (prev !== NULL)
//             prev.next = temp.next;
//         else
//             graph.array[src].head = temp.next;
//
//     }
//
//     // Since graph is undirected, remove the src from dest's
//     // list
//     temp = graph.array[dest].head;
//     prev = NULL;
//     while (temp != NULL && temp->dest != src) {
//     prev = temp;
//     temp = temp->next;
// }
//     if (temp !== NULL) {
//         if (prev !== NULL)
//             prev.next = temp.next;
//         else
//             graph.array[dest].head = temp.next;
//
//     }
// }
// // Function to search an edge in the graph
// function searchEdge( graph, src, dest)
// {
//     var temp = graph.array[src].head;
//     while (temp !== NULL) {
//         if (temp.dest === dest)
//             return 1; // Found
//         temp = temp.next;
//     }
//     return 0; // Not Found
// }
// // A utility function used by DFS
// function DFSUtil( v,  visited,  graph)
// {
//     visited[v] = 1;
//     console.log("%d ", v);
//
//     let temp = graph.array[v].head;
//     while (temp) {
//         var adjVertex = temp.dest;
//         if (!visited[adjVertex])
//             DFSUtil(adjVertex, visited, graph);
//         temp = temp.next;
//     }
// }
// // Function to perform DFS on the graph
// function DFS(graph,startVertex)
// {
//     let visited = new Array(this.V).fill(false);
//
//     for (var i = 0; i < graph.V; i++)
//     visited[i] = 0;
//
//     DFSUtil(startVertex, visited, graph);
//
// }
// // Function to perform BFS on the graph
// function BFS( graph,  startVertex)
// {
//     var visited = graph.V * sizeof(int);
//     for (int i = 0; i < graph.V; i++)
//     visited[i] = 0;
//
//     int* queue = (int*)malloc(graph->V * sizeof(int));
//     int front = 0;
//     int rear = 0;
//
//     visited[startVertex] = 1;
//     queue[rear++] = startVertex;
//
//     while (front < rear) {
//         var currentVertex = queue[front++];
//         console.log("%d ", currentVertex);
//
//         var temp
//             = graph.array[currentVertex].head;
//         while (temp) {
//             int adjVertex = temp.dest;
//             if (!visited[adjVertex]) {
//                 visited[adjVertex] = 1;
//                 queue[rear++] = adjVertex;
//             }
//             temp = temp.next;
//         }
//     }
//
//
// }
// function main()
// {
//     // Create the graph given in above figure
//     var V = 5;
//     var graph = createGraph(V);
//     addEdge(graph, 0, 1);
//     addEdge(graph, 0, 4);
//     addEdge(graph, 1, 2);
//     addEdge(graph, 1, 3);
//     addEdge(graph, 1, 4);
//     addEdge(graph, 2, 3);
//     addEdge(graph, 3, 4);
//
// console.log("Following is Depth First Traversal (starting "
//     "from vertex 0)\n");
//     DFS(graph, 0);
//
//     console.log("\nFollowing is Breadth First Traversal "
//     "(starting from vertex 0)\n");
//     BFS(graph, 0);
//
//     console.log("\nSearching for edge 1-3: %s\n",
//         searchEdge(graph, 1, 3) ? "Found" : "Not Found");
//     deleteEdge(graph, 1, 3);
//
//     console.log("Searching for edge 1-3 after deletion: %s\n",
//         searchEdge(graph, 1, 3) ? "Found" : "Not Found");
//
//     return 0;
// }
