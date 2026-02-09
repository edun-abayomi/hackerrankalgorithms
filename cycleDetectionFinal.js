class Graph {
    constructor(vertices) {
        this.V = vertices; // Number of vertices
        this.adjList = Array(vertices).fill().map(() => []); // Adjacency list
    }

    addEdge(u, v) {
        // Add edge between u and v (undirected graph)
        this.adjList[u].push(v);
        this.adjList[v].push(u);
    }

    findCycles() {
        const visited = new Array(this.V).fill(false); // Track visited vertices
        const recStack = new Array(this.V).fill(false); // Track vertices in recursion stack
        const cycles = []; // Store detected cycles

        // Iterate over all vertices
        for (let node = 0; node < this.V; node++) {
            if (!visited[node]) {
                // Start DFS traversal from unvisited node
                this.dfs(node, visited, recStack, cycles, -1, [node]);
            }
        }

        return cycles;
    }

    dfs(node, visited, recStack, cycles, parent, path) {
        // Mark the current node as visited and add to the recursion stack
        visited[node] = true;
        recStack[node] = true;

        // Explore neighbors
        for (const neighbor of this.adjList[node]) {
            if (!visited[neighbor]) {
                // Recur for an unvisited neighbor
                this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor]);
            } else if (recStack[neighbor] && neighbor !== parent) {
                // Back-edge detected, cycle found!
                const cycleIndex = path.indexOf(neighbor);
                cycles.push(path.slice(cycleIndex)); // Add cycle to result
            }
        }

        // Remove the current node from the recursion stack
        recStack[node] = false;
    }
}

const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(1, 3);
g.addEdge(3, 4);
g.addEdge(4, 1);


// output = Cycles: [ [ 1, 2, 0 ], [ 1, 3, 4 ] ]

/* in the code, [...path, neighbor] is using a feature called spread syntax (or spread operator) in javascript
  the ... symbol is the spread operator, which "unpacks" the elements of the path array and creates a new
  array with those elements, followed by the neighbor element.
  here's an example to illustrate this:

  const path = [1,2,3];
  const neighbor = 4;
  const newPath = [...path,neighbor];
  console.log(newPath); // output: [1,2,3,4]

  in the context of the code, [...path,neighbor] creates a new array that includes all elements of the original
  path array, followed by the neighbor element. This new array is then passed as an argument to the recursive
  dfs() call.
  Using the spread operator is equivalent to using the concat() method

  const newPath = path.concat([neighbor]);
  However, the spread operator is often more concise and readable.
  So, in the code, [...path, neighbor] is creating a new array that represents the updated path, including the
  current neighbor, and passing it to the recursive call.
*
*  */


/* In the code, parent is set  to -1 when calling the dfs() function for the first time:
This is because the first node in the DFS traversal doesn't have a parent node. By convention, we use -1 to indicate
that there is no  parent node.
Think of it like this: every node in the graph has a parent node, except for the starting node (also called the root node).
By setting parent to -1, we're indicating that the starting node doesn't have a parent. Later, when we make recursive
calls to dfs(), we pass the current node as the parent argument:
this.dfs(neighbor, visited, recStack, cycles, node, [...path, neighbor]);
This way, each node knows its parent node,and we can use this information to detect cycles.
when we check for cycles, we ignore the parent node:
} else if (recStack[neighbor] && neighbor !== parent) {
// Back edge detected, cycle found!
}

if we didn't set parent to -1 initially, we'd need to add a special case to handle the starting node, which would complicate
the code a bit.
*
*   */

/* The map function above is used to create an array of empty arrays.

Array(vertices): Create an array with vertices number of elements, all initiated to undefined.
Example Array(3) => [undefined, undefined, undefined]

fill(): Fill the array with a value (in this case, undefined by default)
Example: [undefined, undefined, undefined] (no change, since its already undefined).

map(() => []): Transforms each element of the array into an empty array[].
  map function creates a new array by applying the provided callback function to each element.
  () => [] is an arrow function that returns an empty array [] for each element.

  So , Array(vertices).fill().map(() => []) creates an array of vertices number of empty arrays:
  Example: vertices = 3 => [[],[],[]]
  This is equivalent to
  let adjList = [];
  for (let i = 0; i < vertices; i++) {
        adjList.push([]);
        }

        using map is a concise way to create an array of arrays, which is useful for representing an
        adjacency list in a graph data structure.
*
*
*   */


/*() => [] is an arrow function that takes no arguments(hence the empty parenthesis ()) and returns
an empty array [].

Here's a breakdown:
   (): The input parameters of the arrow function (in this case,none)
   =>: The arrow function syntax
   []: The return value of the arrow function(an empty array)

   it is equivalent to writing :

   function() {
   return [];
   }

   or with an explicit return statement:

   () => {
   return [];
   }

   The concise version () => [] is a common pattern when you want to return a value immediately, without
   needing a function body.
   In the context of Array(vertices).fill().map(() => []), it's used to create an array of empty arrays.
*
*  */

