// src/graphUtils.ts

export interface NodeDataShape {
  [key: string]: any;
}

export interface NodeType {
  id: string;
  data: NodeDataShape;
  // we don’t need type or position here for merging, only `id` and `data`
}

export interface EdgeType {
  source: string;
  target: string;
}

/**
  Returns a single object containing all ancestor‐node “data” fields,
  merged in order from root→down, so that closer ancestors override farther ones.
 
  @param nodeId   the id of the node whose ancestors we want
  @param nodes    array of the nodes, each with { id, data }
  @param edges    array of the edges, each with { source, target }
 */
export function getAncestorData(
  nodeId: string,
  nodes: NodeType[],
  edges: EdgeType[]
): NodeDataShape {
  const visited = new Set<string>();
  // We’ll collect each data objects from this node itself AND its ancestors.
  // Later we'll merge in reverse order so that "closest" ancestors override.
  const collected: NodeDataShape[] = [];

  function dfs(currentId: string) {
    if (visited.has(currentId)) {
      return;
    }
    visited.add(currentId);

    // Find the node object:
    const node = nodes.find((n) => n.id === currentId);
    if (node) {
      collected.push(node.data);
    }

    // Find all parents (edges where target === currentId):
    const parents = edges
      .filter((edge) => edge.target === currentId)
      .map((edge) => edge.source);

    for (const parentId of parents) {
      dfs(parentId);
    }
  }

  dfs(nodeId);

  // `collected` is [ thisNode.data, parent1.data, parent2.data, ..., root.data ]
  // Pushed in depth first search order, so reverse it and spread into assign:
  return Object.assign({}, ...collected.slice().reverse());
}
