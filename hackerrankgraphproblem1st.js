function findShortest(graphNodes, graphFrom, graphTo, ids, val) {
    // Check start point by getting first index from ids matching val
    const startPoint = ids.findIndex(nodeColor => nodeColor === val) + 1
    // add startPoint to toVisit
    const toVisit = [startPoint]
    // init distances array 
    const distances = Array(graphNodes).fill(-1)
    // set distances[startPoint] to 0
    distances[startPoint-1] = 0

    // while there are nodes to visit
    while(toVisit.length > 0){
        // current is the first node of the toVisit list
        const current = toVisit.shift()

        // Calculate neighbors
        const currentNeigh = []
        graphFrom.forEach((node, i)=>{
            if(node === current){
                currentNeigh.push(graphTo[i])
            }
        })
        graphTo.forEach((node, i)=>{
            if(node === current){
                currentNeigh.push(graphFrom[i])
            }
        })

        // for each current neighbors
        for(let i = 0; i< currentNeigh.length; i++){
            // if neighbor hasn't been visited
            if(distances[currentNeigh[i]-1] === -1){
                // set distance of the neighbor to the current distance + 1
                distances[currentNeigh[i]-1] = distances[current-1] + 1

                // if neighbor color match val, break and return distance
                if(ids[currentNeigh[i]-1] === val){
                    return distances[currentNeigh[i]-1]
                }

                // else add neigh to ToVisit
                toVisit.push(currentNeigh[i])
            }
        }

    }

    return -1
}