export const useTraverseTree = () => {
  const addNewNode = (tree, parentId, newNodeData) => {
    if (tree.id === parentId) {
      tree.items.unshift(newNodeData);
      return tree;
    }

    tree.items = tree.items.map((item) =>
      addNewNode(item, parentId, newNodeData)
    );
    return tree;
  };
  return { addNewNode };
};
