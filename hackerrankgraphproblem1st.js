class Graph {

    constructor(node) {
        this.node = node;

        this.adjacencyList = new Array(node + 1).fill(null)
            .map(() => []);
    }


    addEdge(v, w) {
        this.adjacencyList[v].push(w);
    }


    BFS(ids, val) {
        this.adjacencyList.shift();

        let visited = new Array(this.node).fill(false);

        let color_i_need_count = 0;

        let distance_counter = 0;


        for (let index = 0; index < this.node; index++) {
            if (!visited[index]) {

                let queue = [];

                visited[index] = true;

                queue.push(index);

                while (queue.length !== 0) {

                    let vertex = queue.shift();
                    if(this.adjacencyList[vertex] === undefined || this.adjacencyList[vertex] === null) return distance_counter;

                    for (let node of this.adjacencyList[vertex]) {
                        if (!visited[node]) {

                            visited[node] = true;

                            queue.push(node);

                            if (val === ids[node - 1] || color_i_need_count !== 0 ) {
                                // if the color_i_need is equal to the color of the node edge in the  adjacency list

                            if(val === ids[node - 1])  color_i_need_count++;

                                distance_counter++;

                                console.log(distance_counter);

                                // return distance_counter;
                                if (color_i_need_count === 2) return distance_counter;

                            }

                        }
                    }

                    if (color_i_need_count === 0) {

                        distance_counter = -1;

                        return distance_counter;

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
    return g.BFS(ids, val);
}

findShortest(5, [1, 1, 2, 3], [2, 3, 4, 5], [1, 2, 3, 3, 2], 2);