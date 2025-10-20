/**
 * Graph API implementation (JavaScript)
 *
 * Features:
 * - Directed or undirected graphs
 * - Add/remove nodes and edges (optional weights)
 * - BFS, DFS, shortest path (unweighted)
 * - Connected components (for undirected)
 * - Cycle detection (directed and undirected)
 * - Serialization (to/from JSON)
 *
 * Usage:
 *   const g = new Graph({ directed: false });
 *   g.addNode('A');
 *   g.addEdge('A', 'B', 2);
 *   const path = g.shortestPathUnweighted('A', 'B');
 */

class Graph {
  constructor(options = {}) {
    this.directed = Boolean(options.directed);
    // adjacency: Map<node, Map<neighbor, weight>>
    this.adj = new Map();
  }

  // Node operations
  addNode(node) {
    if (!this.adj.has(node)) {
      this.adj.set(node, new Map());
    }
    return this;
  }

  hasNode(node) {
    return this.adj.has(node);
  }

  removeNode(node) {
    if (!this.adj.has(node)) return this;
    // remove incoming edges
    for (const [u, nbrs] of this.adj.entries()) {
      nbrs.delete(node);
    }
    // remove node entry
    this.adj.delete(node);
    return this;
  }

  nodes() {
    return Array.from(this.adj.keys());
  }

  size() {
    return this.adj.size;
  }

  // Edge operations (weight is optional, default 1)
  addEdge(u, v, weight = 1) {
    this.addNode(u);
    this.addNode(v);
    this.adj.get(u).set(v, weight);
    if (!this.directed) {
      this.adj.get(v).set(u, weight);
    }
    return this;
  }

  removeEdge(u, v) {
    if (this.adj.has(u)) this.adj.get(u).delete(v);
    if (!this.directed && this.adj.has(v)) this.adj.get(v).delete(u);
    return this;
  }

  neighbors(node) {
    if (!this.adj.has(node)) return [];
    return Array.from(this.adj.get(node).keys());
  }

  edges() {
    const list = [];
    for (const [u, nbrs] of this.adj.entries()) {
      for (const [v, w] of nbrs.entries()) {
        if (this.directed) {
          list.push({ from: u, to: v, weight: w });
        } else {
          // avoid duplicates for undirected
          const exists = list.some(e => (e.from === v && e.to === u));
          if (!exists) list.push({ from: u, to: v, weight: w });
        }
      }
    }
    return list;
  }

  // Breadth-first search. Returns array of visited nodes in order.
  bfs(start, visit = null) {
    if (!this.adj.has(start)) return [];
    const visited = new Set();
    const q = [start];
    const order = [];
    visited.add(start);
    while (q.length) {
      const u = q.shift();
      order.push(u);
      if (typeof visit === 'function') visit(u);
      for (const v of this.neighbors(u)) {
        if (!visited.has(v)) {
          visited.add(v);
          q.push(v);
        }
      }
    }
    return order;
  }

  // Depth-first search (iterative). Returns array of visited nodes in order.
  dfs(start, visit = null) {
    if (!this.adj.has(start)) return [];
    const visited = new Set();
    const stack = [start];
    const order = [];
    while (stack.length) {
      const u = stack.pop();
      if (visited.has(u)) continue;
      visited.add(u);
      order.push(u);
      if (typeof visit === 'function') visit(u);
      // push neighbors in reverse order to preserve natural order
      const nbrs = this.neighbors(u).slice().reverse();
      for (const v of nbrs) {
        if (!visited.has(v)) stack.push(v);
      }
    }
    return order;
  }

  // Shortest path for unweighted graphs: returns array of nodes (inclusive) or null if unreachable
  shortestPathUnweighted(start, goal) {
    if (!this.adj.has(start) || !this.adj.has(goal)) return null;
    if (start === goal) return [start];
    const parent = new Map();
    const visited = new Set([start]);
    const q = [start];
    let found = false;
    while (q.length) {
      const u = q.shift();
      for (const v of this.neighbors(u)) {
        if (!visited.has(v)) {
          visited.add(v);
          parent.set(v, u);
          if (v === goal) {
            found = true;
            break;
          }
          q.push(v);
        }
      }
      if (found) break;
    }
    if (!found) return null;
    const path = [];
    let cur = goal;
    while (cur !== undefined) {
      path.push(cur);
      if (cur === start) break;
      cur = parent.get(cur);
    }
    return path.reverse();
  }

  // Connected components (undirected). For directed graphs, this returns weakly connected components.
  connectedComponents() {
    const comps = [];
    const visited = new Set();
    for (const node of this.nodes()) {
      if (visited.has(node)) continue;
      const comp = [];
      const q = [node];
      visited.add(node);
      while (q.length) {
        const u = q.shift();
        comp.push(u);
        for (const v of this.neighbors(u)) {
          if (!visited.has(v)) {
            visited.add(v);
            q.push(v);
          }
        }
        if (this.directed) {
          // for weak connectivity, also consider incoming neighbors
          for (const [other, nbrs] of this.adj.entries()) {
            if (nbrs.has(u) && !visited.has(other)) {
              visited.add(other);
              q.push(other);
            }
          }
        }
      }
      comps.push(comp);
    }
    return comps;
  }

  // Cycle detection
  isCyclic() {
    if (this.directed) return this._isCyclicDirected();
    return this._isCyclicUndirected();
  }

  _isCyclicDirected() {
    const visited = new Map();
    const recStack = new Map();
    for (const node of this.nodes()) {
      visited.set(node, false);
      recStack.set(node, false);
    }

    const dfs = (u) => {
      visited.set(u, true);
      recStack.set(u, true);
      for (const v of this.neighbors(u)) {
        if (!visited.get(v) && dfs(v)) return true;
        if (recStack.get(v)) return true;
      }
      recStack.set(u, false);
      return false;
    };

    for (const node of this.nodes()) {
      if (!visited.get(node) && dfs(node)) return true;
    }
    return false;
  }

  _isCyclicUndirected() {
    const visited = new Set();
    const dfs = (u, parent) => {
      visited.add(u);
      for (const v of this.neighbors(u)) {
        if (!visited.has(v)) {
          if (dfs(v, u)) return true;
        } else if (v !== parent) {
          return true;
        }
      }
      return false;
    };
    for (const node of this.nodes()) {
      if (!visited.has(node) && dfs(node, null)) return true;
    }
    return false;
  }

  // Serialization
  toJSON() {
    const nodes = [];
    for (const [u, nbrs] of this.adj.entries()) {
      const arr = [];
      for (const [v, w] of nbrs.entries()) arr.push([v, w]);
      nodes.push([u, arr]);
    }
    return {
      directed: this.directed,
      adjacency: nodes
    };
  }

  static fromJSON(obj) {
    const g = new Graph({ directed: Boolean(obj.directed) });
    if (!obj || !Array.isArray(obj.adjacency)) return g;
    for (const [u, nbrs] of obj.adjacency) {
      g.addNode(u);
      for (const [v, w] of nbrs) {
        g.addEdge(u, v, w);
      }
    }
    return g;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Graph;
}