// new problem
class Graph{
    constructor(total_number_of_vertex){
  /** the last and highest vertex  */   this.vertex = total_number_of_vertex;
  /** the plus one is because we start
   * counting from index of zero (0)
   * a map object provided by ES6 in order to implement the adjacency List
   * where the key of a map holds the vertex and values hold an array of an adjacent node.
   * */                                this.adjacencyList = new Array(total_number_of_vertex + 1).fill(null).map(() => []);
                                //     this.adjacencyList = new Map();
   // the adjacency list is a hashmap ( a simple array of arrays )
    }

    addVertex(vertex){
        /** check if the vertex already exists to prevent duplicates */
        if(!this.adjacencyList.has(vertex)){
            this.adjacencyList.set(vertex,[]); // add vertex as a key with an empty array for its neighbor
            return true; // indicate successful addition
        }
        return false;  /** Indicate vertex already exists */
    }


    addEdge(vertex1,vertex2){
        /** making sure both vertices exist in the graph*/
        if(!this.adjacencyList.has(vertex1)) {
            this.addVertex(vertex1);
        }

        if (!this.adjacencyList.has(vertex2)){
            this.addVertex(vertex2);
        }

        /** add the edge(for an undirected graph, add in both directions) */
        this.adjacencyList.get(vertex1).push(vertex2); // add vertex2 to vertex1's adjacency list
        this.adjacencyList.get(vertex2).push(vertex1); // add vertex1 to vertex2's adjacency list
    }

    printGraph(){
        /** get all the vertices */
        let get_keys = this.adjacencyList.keys();

        /** iterate over the vertices */
        for (let index of get_keys){
            /** get the corresponding adjacency List (related|connected nodes) for the vertex */

            let get_neighbors = this.adjacencyList.get(index);
            let conc = "";

            /** iterate over the adjacency List
             * 
             * concatenate the values into a string
             * */

            for(let index2 of get_neighbors){
                conc += index2 + " ";

                // print the vertex and its adjacency list
                console.log(index + " -> "  + conc);
            }

        }



    }
}

var g = new Graph(6);
var vertices  = ['A','B','C','D','E','F'];

// ADDING VERTICES
for(var index = 0; index < vertices.length;index++){
      g.addVertex(vertices[index]);
}

// adding edges
g.addEdge('A','B');
g.addEdge('A','D');
g.addEdge('A')