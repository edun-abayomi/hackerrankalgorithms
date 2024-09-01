/* hacker rank problem 2 */
class Graph {
    constructor(node){
        this.adjacencyList = new Array(node + 1).fill(null).map(() => []);
        this.node = node;
    }



    addVertex(vertex){
        this.adjacencyList.set(vertex,[]);
    }

    addEdge(vertex, edge){
        this.adjacencyList[vertex].push(edge);
    }


    bfs(startingNode){
        let visited = new Array(this.node).fill(false);
        let queue = [];

        visited[startingNode] = true;
        queue.push(startingNode);

        while(queue.length !== 0){
            let currentNode = queue.shift();
            console.log(currentNode);

            let neighbors = this.adjacencyList.get(currentNode);
            for (let i in neighbors){
                let neighbor = neighbors[i];
                if(!visited[neighbor]){
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }

    }
    calculate_distances(graph_input){




        // return distance_array
        
    }



}



